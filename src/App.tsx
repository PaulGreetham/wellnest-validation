import { useState } from 'react'
import { supabase } from './lib/supabase'
import type { UserSubmission, VendorSubmission } from './lib/supabase'
import './App.scss'

interface UserFormData {
  email: string;
  usage: string;
}

interface VendorFormData {
  businessName: string;
  email: string;
  usesSimilar: string;
  otherProviders: string;
}

function App() {
  const [activeModal, setActiveModal] = useState<'user' | 'vendor' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [userForm, setUserForm] = useState<UserFormData>({
    email: '',
    usage: 'not sure'
  })
  const [vendorForm, setVendorForm] = useState<VendorFormData>({
    businessName: '',
    email: '',
    usesSimilar: 'no',
    otherProviders: ''
  })

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const submission: UserSubmission = {
        email: userForm.email,
        usage_frequency: userForm.usage
      }

      const { error } = await supabase
        .from('user_submissions')
        .insert([submission])

      if (error) {
        console.error('Error submitting user form:', error)
        setSubmitMessage('Error submitting form. Please try again.')
      } else {
        console.log('User form submitted successfully:', submission)
        setSubmitMessage('Thank you! Your submission has been recorded.')
        // Reset form
        setUserForm({ email: '', usage: 'not sure' })
        // Close modal after a delay
        setTimeout(() => {
          setActiveModal(null)
          setSubmitMessage(null)
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting user form:', error)
      setSubmitMessage('Error submitting form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const submission: VendorSubmission = {
        business_name: vendorForm.businessName,
        email: vendorForm.email,
        uses_similar: vendorForm.usesSimilar,
        other_providers: vendorForm.usesSimilar === 'yes' ? vendorForm.otherProviders : undefined
      }

      const { error } = await supabase
        .from('vendor_submissions')
        .insert([submission])

      if (error) {
        console.error('Error submitting vendor form:', error)
        setSubmitMessage('Error submitting form. Please try again.')
      } else {
        console.log('Vendor form submitted successfully:', submission)
        setSubmitMessage('Thank you! Your submission has been recorded.')
        // Reset form
        setVendorForm({ businessName: '', email: '', usesSimilar: 'no', otherProviders: '' })
        // Close modal after a delay
        setTimeout(() => {
          setActiveModal(null)
          setSubmitMessage(null)
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting vendor form:', error)
      setSubmitMessage('Error submitting form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setSubmitMessage(null)
  }

  return (
    <div className="landing-page">
      <div className="logo-container">
        {/* Logo space - you can add your logo here */}
        <div className="logo-placeholder">LOGO</div>
      </div>
      
      <div className="content">
        <h1>Welcome to Wellnest</h1>
        <h2>Validation Platform</h2>
        <p>Choose your path to get started with our platform. Whether you're a user looking to access our services or a vendor wanting to partner with us, we've got you covered.</p>
        
        <div className="button-container">
          <button className="btn btn-user" onClick={() => setActiveModal('user')}>
            User
          </button>
          <button className="btn btn-vendor" onClick={() => setActiveModal('vendor')}>
            Vendor
          </button>
        </div>
      </div>

      {/* User Modal */}
      {activeModal === 'user' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>User Registration</h3>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleUserSubmit} className="modal-form">
              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
                  {submitMessage}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="user-email">Email Address</label>
                <input
                  type="email"
                  id="user-email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label>How many times per month would you use an app like this?</label>
                <div className="pill-options">
                  {['not sure', '1-2 times', '3-5 times', '6+ times'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`pill ${userForm.usage === option ? 'active' : ''}`}
                      onClick={() => setUserForm({...userForm, usage: option})}
                      disabled={isSubmitting}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Vendor Modal */}
      {activeModal === 'vendor' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Vendor Registration</h3>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleVendorSubmit} className="modal-form">
              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
                  {submitMessage}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="business-name">Business Name</label>
                <input
                  type="text"
                  id="business-name"
                  value={vendorForm.businessName}
                  onChange={(e) => setVendorForm({...vendorForm, businessName: e.target.value})}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="vendor-email">Email Address</label>
                <input
                  type="email"
                  id="vendor-email"
                  value={vendorForm.email}
                  onChange={(e) => setVendorForm({...vendorForm, email: e.target.value})}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label>Do you use similar products like this?</label>
                <div className="pill-options">
                  {['no', 'yes'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`pill ${vendorForm.usesSimilar === option ? 'active' : ''}`}
                      onClick={() => setVendorForm({...vendorForm, usesSimilar: option, otherProviders: option === 'no' ? '' : vendorForm.otherProviders})}
                      disabled={isSubmitting}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {vendorForm.usesSimilar === 'yes' && (
                <div className="form-group">
                  <label htmlFor="other-providers">Name of other provider(s)</label>
                  <input
                    type="text"
                    id="other-providers"
                    value={vendorForm.otherProviders}
                    onChange={(e) => setVendorForm({...vendorForm, otherProviders: e.target.value})}
                    placeholder="Enter provider names..."
                    disabled={isSubmitting}
                  />
                </div>
              )}
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
