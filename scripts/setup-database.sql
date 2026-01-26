-- Create sub_locations table
CREATE TABLE IF NOT EXISTS sub_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  area_code TEXT NOT NULL,
  region TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  from_location_id UUID REFERENCES sub_locations(id),
  to_location_id UUID REFERENCES sub_locations(id),
  room_type TEXT NOT NULL,
  additional_items TEXT,
  estimated_price DECIMAL(10, 2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create analytics table for tracking views and inquiries
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sub_location_id UUID REFERENCES sub_locations(id),
  quote_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(sub_location_id, month, year)
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_quotes_from_location ON quotes(from_location_id);
CREATE INDEX IF NOT EXISTS idx_quotes_to_location ON quotes(to_location_id);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_sub_location ON analytics(sub_location_id);
CREATE INDEX IF NOT EXISTS idx_analytics_month_year ON analytics(month, year);

-- Insert default sub-locations for Alexandria
INSERT INTO sub_locations (name, area_code, region) VALUES
('سموحة', 'smoha', 'شرقية'),
('سيدي جابر', 'sidi-jaber', 'وسط'),
('ميامي', 'miami', 'شمالية'),
('محطة الرمل', 'raml-station', 'وسط'),
('كرموز', 'karmouz', 'غربية'),
('الدخيلة', 'dekheila', 'غربية'),
('العجمي', 'agami', 'غربية'),
('مارينا', 'marina', 'شمالية'),
('الشاطبي', 'shati', 'وسط'),
('الحضرة', 'hadra', 'شرقية'),
('سباق الحمر', 'sport-city', 'شرقية'),
('الرانيسي', 'ranisy', 'شرقية')
ON CONFLICT DO NOTHING;
