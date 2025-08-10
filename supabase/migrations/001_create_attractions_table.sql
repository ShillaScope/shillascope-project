-- Create attractions table for caching TourAPI data
CREATE TABLE IF NOT EXISTS attractions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content_type_id TEXT NOT NULL,
  area_code TEXT NOT NULL,
  sigungu_code TEXT NOT NULL,
  first_image TEXT,
  first_image2 TEXT,
  map_x TEXT NOT NULL,
  map_y TEXT NOT NULL,
  addr1 TEXT NOT NULL,
  addr2 TEXT,
  tel TEXT,
  overview TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_hash TEXT NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_attractions_area_code ON attractions(area_code);
CREATE INDEX IF NOT EXISTS idx_attractions_content_type ON attractions(content_type_id);
CREATE INDEX IF NOT EXISTS idx_attractions_title ON attractions USING gin(to_tsvector('simple', title));
CREATE INDEX IF NOT EXISTS idx_attractions_updated_at ON attractions(updated_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_attractions_updated_at 
    BEFORE UPDATE ON attractions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();