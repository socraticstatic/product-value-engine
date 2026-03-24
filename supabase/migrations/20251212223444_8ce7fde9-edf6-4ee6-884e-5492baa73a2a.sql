-- Create a table to store saved claim analyses
CREATE TABLE public.saved_claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  claim TEXT NOT NULL,
  competitor TEXT,
  product_category TEXT,
  claim_analysis TEXT,
  not_apples_to_apples TEXT[],
  att_advantage TEXT,
  suggested_response TEXT,
  questions_to_ask TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.saved_claims ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view saved claims)
CREATE POLICY "Anyone can view saved claims" 
ON public.saved_claims 
FOR SELECT 
USING (true);

-- Create policy for public insert access (anyone can save a claim)
CREATE POLICY "Anyone can save claims" 
ON public.saved_claims 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_saved_claims_created_at ON public.saved_claims(created_at DESC);