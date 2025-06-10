-- Migration: Add location fields to existing tables
-- Run this in your Supabase SQL editor

-- Add location column to user_submissions table
ALTER TABLE public.user_submissions 
ADD COLUMN location TEXT NOT NULL DEFAULT '';

-- Add location column to vendor_submissions table  
ALTER TABLE public.vendor_submissions 
ADD COLUMN location TEXT NOT NULL DEFAULT '';

-- Remove the default after adding the column (so future inserts require location)
ALTER TABLE public.user_submissions 
ALTER COLUMN location DROP DEFAULT;

ALTER TABLE public.vendor_submissions 
ALTER COLUMN location DROP DEFAULT;

-- Add indexes for better performance on location fields
CREATE INDEX idx_user_submissions_location ON public.user_submissions(location);
CREATE INDEX idx_vendor_submissions_location ON public.vendor_submissions(location);

-- Verify the changes
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'user_submissions' 
ORDER BY ordinal_position;

SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'vendor_submissions' 
ORDER BY ordinal_position; 