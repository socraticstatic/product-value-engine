-- Tighten RLS policies on saved_claims
-- Previously: anyone could read, insert, and delete any row
-- Now: public read, but insert/delete restricted to authenticated users

-- Add user_id column to track ownership
ALTER TABLE public.saved_claims ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Add updated_at column
ALTER TABLE public.saved_claims ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Add index on user_id for filtered queries
CREATE INDEX IF NOT EXISTS idx_saved_claims_user_id ON public.saved_claims(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_claims_competitor ON public.saved_claims(competitor);

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Anyone can save claims" ON public.saved_claims;
DROP POLICY IF EXISTS "Anyone can delete saved claims" ON public.saved_claims;

-- Keep public read access (claims are not sensitive)
-- The "Anyone can view saved claims" SELECT policy remains

-- Insert: only authenticated users can create claims
CREATE POLICY "Authenticated users can save claims"
ON public.saved_claims
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Delete: only the owner can delete their own claims
CREATE POLICY "Users can delete their own claims"
ON public.saved_claims
FOR DELETE
USING (auth.uid() = user_id);

-- Update: only the owner can update their own claims
CREATE POLICY "Users can update their own claims"
ON public.saved_claims
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
