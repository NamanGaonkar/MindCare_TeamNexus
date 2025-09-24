-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  institute TEXT,
  roll_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create counselors table
CREATE TABLE public.counselors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialization TEXT[],
  available_slots JSONB DEFAULT '[]',
  is_available BOOLEAN DEFAULT true,
  bio TEXT,
  experience_years INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  counselor_id UUID REFERENCES public.counselors(id) ON DELETE CASCADE NOT NULL,
  session_date TIMESTAMP WITH TIME ZONE NOT NULL,
  session_type TEXT DEFAULT 'online' CHECK (session_type IN ('online', 'in-person')),
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community posts table
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  is_pinned BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create post replies table
CREATE TABLE public.post_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('article', 'video', 'guide', 'tool')),
  category TEXT NOT NULL,
  content_url TEXT,
  thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counselors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for counselors
CREATE POLICY "Everyone can view available counselors" ON public.counselors FOR SELECT USING (is_available = true OR auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Only admins can manage counselors" ON public.counselors FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin'));

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all bookings" ON public.bookings FOR SELECT USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for posts
CREATE POLICY "Everyone can view posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON public.posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all posts" ON public.posts FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin'));

-- RLS Policies for post replies
CREATE POLICY "Everyone can view replies" ON public.post_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create replies" ON public.post_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own replies" ON public.post_replies FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for resources
CREATE POLICY "Everyone can view resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Admins can manage resources" ON public.resources FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE role = 'admin'));

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Anonymous User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_counselors_updated_at BEFORE UPDATE ON public.counselors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample counselors
INSERT INTO public.counselors (name, specialization, bio, experience_years, available_slots) VALUES
('Dr. Sarah Johnson', ARRAY['Anxiety', 'Depression', 'Academic Stress'], 'Licensed clinical psychologist specializing in student mental health', 8, '[{"day": "Monday", "slots": ["09:00", "10:00", "14:00", "15:00"]}, {"day": "Wednesday", "slots": ["09:00", "11:00", "13:00", "16:00"]}, {"day": "Friday", "slots": ["10:00", "14:00", "15:00"]}]'),
('Dr. Michael Chen', ARRAY['Social Anxiety', 'Relationship Issues', 'Life Transitions'], 'Counseling psychologist with expertise in young adult development', 6, '[{"day": "Tuesday", "slots": ["09:00", "10:00", "11:00", "14:00"]}, {"day": "Thursday", "slots": ["09:00", "13:00", "14:00", "16:00"]}]'),
('Dr. Emily Rodriguez', ARRAY['Eating Disorders', 'Body Image', 'Self-Esteem'], 'Specialized therapist for body image and eating concerns', 10, '[{"day": "Monday", "slots": ["11:00", "13:00", "16:00"]}, {"day": "Wednesday", "slots": ["10:00", "15:00", "16:00"]}, {"day": "Friday", "slots": ["09:00", "11:00", "13:00"]}]'),
('Dr. James Wilson', ARRAY['ADHD', 'Learning Disabilities', 'Study Skills'], 'Educational psychologist focusing on academic support', 7, '[{"day": "Tuesday", "slots": ["10:00", "13:00", "15:00"]}, {"day": "Thursday", "slots": ["11:00", "14:00", "15:00"]}]');

-- Insert sample resources
INSERT INTO public.resources (title, description, type, category, content_url, is_featured) VALUES
('Managing Test Anxiety', 'Comprehensive guide to overcoming exam stress and performance anxiety', 'article', 'Academic Support', 'https://example.com/test-anxiety-guide', true),
('Mindfulness for Students', 'Introduction to mindfulness practices for college students', 'video', 'Wellness', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', false),
('Sleep Hygiene Tips', 'Essential tips for better sleep and improved mental health', 'guide', 'Wellness', 'https://example.com/sleep-guide', true),
('Building Social Connections', 'Strategies for making friends and building relationships in college', 'article', 'Social Support', 'https://example.com/social-connections', false);