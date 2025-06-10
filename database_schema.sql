-- Create user_submissions table
CREATE TABLE public.user_submissions (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    location TEXT NOT NULL,
    usage_frequency TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vendor_submissions table
CREATE TABLE public.vendor_submissions (
    id BIGSERIAL PRIMARY KEY,
    business_name TEXT NOT NULL,
    email TEXT NOT NULL,
    location TEXT NOT NULL,
    uses_similar TEXT NOT NULL,
    other_providers TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public insert (for form submissions)
CREATE POLICY "Allow public insert on user_submissions" ON public.user_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on vendor_submissions" ON public.vendor_submissions
    FOR INSERT WITH CHECK (true);

-- Optional: Add indexes for better performance
CREATE INDEX idx_user_submissions_email ON public.user_submissions(email);
CREATE INDEX idx_vendor_submissions_email ON public.vendor_submissions(email);
CREATE INDEX idx_user_submissions_location ON public.user_submissions(location);
CREATE INDEX idx_vendor_submissions_location ON public.vendor_submissions(location);
CREATE INDEX idx_user_submissions_created_at ON public.user_submissions(created_at);
CREATE INDEX idx_vendor_submissions_created_at ON public.vendor_submissions(created_at); 