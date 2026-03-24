-- Create policy for public delete access (anyone can delete a saved claim)
CREATE POLICY "Anyone can delete saved claims" 
ON public.saved_claims 
FOR DELETE 
USING (true);