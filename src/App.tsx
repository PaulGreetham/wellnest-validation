import { useState } from 'react'
import { supabase } from './lib/supabase'
import type { UserSubmission, VendorSubmission } from './lib/supabase'
import Swal from 'sweetalert2'
import { Analytics } from '@vercel/analytics/react'
import './App.scss'

interface UserFormData {
  email: string;
  location: string;
  usage: string;
}

interface VendorFormData {
  businessName: string;
  email: string;
  location: string;
  usesSimilar: string;
  otherProviders: string;
}

function App() {
  const [activeModal, setActiveModal] = useState<'user' | 'vendor' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userForm, setUserForm] = useState<UserFormData>({
    email: '',
    location: '',
    usage: 'not sure'
  })
  const [vendorForm, setVendorForm] = useState<VendorFormData>({
    businessName: '',
    email: '',
    location: '',
    usesSimilar: 'no',
    otherProviders: ''
  })

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submission: UserSubmission = {
        email: userForm.email,
        location: userForm.location,
        usage_frequency: userForm.usage
      }

      const { error } = await supabase
        .from('user_submissions')
        .insert([submission])

      if (error) {
        console.error('Error submitting user form:', error)
        await Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong. Please try again.',
          confirmButtonColor: '#16a34a'
        })
      } else {
        console.log('User form submitted successfully:', submission)
        
        // Show success message with SweetAlert2
        await Swal.fire({
          icon: 'success',
          title: 'Thank you!',
          text: 'You will hear from us when we have exciting news!',
          confirmButtonColor: '#16a34a',
          timer: 3000,
          timerProgressBar: true
        })
        
        // Reset form and close modal
        setUserForm({ email: '', location: '', usage: 'not sure' })
        setActiveModal(null)
      }
    } catch (error) {
      console.error('Error submitting user form:', error)
      await Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong. Please try again.',
        confirmButtonColor: '#16a34a'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submission: VendorSubmission = {
        business_name: vendorForm.businessName,
        email: vendorForm.email,
        location: vendorForm.location,
        uses_similar: vendorForm.usesSimilar,
        other_providers: vendorForm.usesSimilar === 'yes' ? vendorForm.otherProviders : undefined
      }

      const { error } = await supabase
        .from('vendor_submissions')
        .insert([submission])

      if (error) {
        console.error('Error submitting vendor form:', error)
        await Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong. Please try again.',
          confirmButtonColor: '#16a34a'
        })
      } else {
        console.log('Vendor form submitted successfully:', submission)
        
        // Show success message with SweetAlert2
        await Swal.fire({
          icon: 'success',
          title: 'Thank you!',
          text: 'You will hear from us when we have exciting news!',
          confirmButtonColor: '#16a34a',
          timer: 3000,
          timerProgressBar: true
        })
        
        // Reset form and close modal
        setVendorForm({ businessName: '', email: '', location: '', usesSimilar: 'no', otherProviders: '' })
        setActiveModal(null)
      }
    } catch (error) {
      console.error('Error submitting vendor form:', error)
      await Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong. Please try again.',
        confirmButtonColor: '#16a34a'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setActiveModal(null)
  }
  
  return (
    <div className="landing-page">
      <div className="content">
        <h1>
          <span className="heading-light">Welcome to</span> <span className="wellnest-marker">WellNest</span>
        </h1>
        <p>WellNest is your one-stop online marketplace for all things wellness—think of us as the Treatwell for the wellness industry.</p>
        <p>For users, get access to curated recommendations tailored to your wellness goals. For vendors, get access to a platform that will help you grow your business.</p>
        <p>Sign up below to receive exclusive early-access when we launch.</p>
        
        <div className="industries-section">
          <h3>Mindful Categories</h3>
          <div className="industries-grid">
            <div className="industry-item">
              <i className="industry-icon fi fi-rr-flower"></i>
              <div className="industry-text">
                <span className="industry-label">Classes </span>
                <span className="industry-details">(Yoga, Meditation, Fitness + more)</span>
              </div>
            </div>
            <div className="industry-item">
              <i className="industry-icon fi fi-rr-heart"></i>
              <div className="industry-text">
                <span className="industry-label">Therapy Services </span>
                <span className="industry-details">(Psychologists, Counsellors, Coaches + more)</span>
              </div>
            </div>
            <div className="industry-item">
              <i className="industry-icon fi fi-rr-sparkles"></i>
              <div className="industry-text">
                <span className="industry-label">Personal Care </span>
                <span className="industry-details">(Care Products, Hair, Nails + more)</span>
              </div>
            </div>
            <div className="industry-item">
              <i className="industry-icon fi fi-rr-leaf"></i>
              <div className="industry-text">
                <span className="industry-label">Mindful Food & Drink </span>
                <span className="industry-details">(Health, Vegan, Gluten-Free + more)</span>
              </div>
            </div>
            <div className="industry-item">
              <i className="industry-icon fi fi-rr-mountain"></i>
              <div className="industry-text">
                <span className="industry-label">Wellness Tourism </span>
                <span className="industry-details">(Spa, Retreats, Wellness Holidays + more)</span>
              </div>
            </div>
            <div className="industry-item">
              <i className="industry-icon fi fi-rr-stethoscope"></i>
              <div className="industry-text">
                <span className="industry-label">Alternative Medicine </span>
                <span className="industry-details">(Acupuncture, Chiropractic, Naturopathy + more)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="button-container">
          <button className="btn btn-user" onClick={() => setActiveModal('user')}>
            User Sign Up
          </button>
          <button className="btn btn-vendor" onClick={() => setActiveModal('vendor')}>
            Vendor Sign Up
          </button>
        </div>
      </div>

      <div className="hero-image">
        <img src="/9116229.jpg" alt="Wellnest Platform" />
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
                <label htmlFor="user-location">Location</label>
                <input
                  type="text"
                  id="user-location"
                  value={userForm.location}
                  onChange={(e) => setUserForm({...userForm, location: e.target.value})}
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
                <label htmlFor="vendor-location">Location</label>
                <input
                  type="text"
                  id="vendor-location"
                  value={vendorForm.location}
                  onChange={(e) => setVendorForm({...vendorForm, location: e.target.value})}
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
      
      <Analytics />
    </div>
  )
}

export default App
