/*
  # Fix admin user setup and ensure proper role assignment

  1. Updates
    - Ensure admin user gets proper role assignment
    - Fix any existing profile issues
    - Update RLS policies for admin access

  2. Security
    - Maintains existing RLS policies
    - Ensures admin has proper access to all tables
*/

-- Update the admin role assignment function
CREATE OR REPLACE FUNCTION public.ensure_admin_role()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this is the admin email
  IF NEW.email = 'namanrgaonkar@gmail.com' THEN
    -- Update or insert profile with admin role
    INSERT INTO public.profiles (user_id, email, full_name, role)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Admin User'),
      'admin'
    )
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      role = 'admin',
      email = NEW.email,
      full_name = COALESCE(NEW.raw_user_meta_data ->> 'full_name', profiles.full_name, 'Admin User'),
      updated_at = NOW();
  ELSE
    -- Regular user profile creation
    INSERT INTO public.profiles (user_id, email, full_name, role, institute, roll_number)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'User'),
      'student',
      NEW.raw_user_meta_data ->> 'institute',
      NEW.raw_user_meta_data ->> 'roll_number'
    )
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      email = NEW.email,
      full_name = COALESCE(NEW.raw_user_meta_data ->> 'full_name', profiles.full_name),
      institute = COALESCE(NEW.raw_user_meta_data ->> 'institute', profiles.institute),
      roll_number = COALESCE(NEW.raw_user_meta_data ->> 'roll_number', profiles.roll_number),
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.ensure_admin_role();

-- Update existing admin profile if it exists
DO $$
BEGIN
  -- First, try to update existing profile
  UPDATE public.profiles 
  SET role = 'admin', updated_at = NOW()
  WHERE email = 'namanrgaonkar@gmail.com';
  
  -- If no rows were updated, check if user exists in auth.users and create profile
  IF NOT FOUND THEN
    INSERT INTO public.profiles (user_id, email, full_name, role)
    SELECT id, email, COALESCE(raw_user_meta_data ->> 'full_name', 'Admin User'), 'admin'
    FROM auth.users 
    WHERE email = 'namanrgaonkar@gmail.com'
    ON CONFLICT (user_id) DO UPDATE SET
      role = 'admin',
      updated_at = NOW();
  END IF;
END $$;

-- Ensure admin has access to all tables by updating RLS policies
-- Add admin access to counselors table
DROP POLICY IF EXISTS "Admins can manage counselors" ON public.counselors;
CREATE POLICY "Admins can manage counselors" ON public.counselors 
FOR ALL USING (
  auth.uid() IN (
    SELECT user_id FROM public.profiles WHERE role = 'admin'
  )
);

-- Add admin access to posts table  
DROP POLICY IF EXISTS "Admins can manage all posts" ON public.posts;
CREATE POLICY "Admins can manage all posts" ON public.posts 
FOR ALL USING (
  auth.uid() IN (
    SELECT user_id FROM public.profiles WHERE role = 'admin'
  )
);

-- Add admin access to resources table
DROP POLICY IF EXISTS "Admins can manage resources" ON public.resources;
CREATE POLICY "Admins can manage resources" ON public.resources 
FOR ALL USING (
  auth.uid() IN (
    SELECT user_id FROM public.profiles WHERE role = 'admin'
  )
);

-- Add admin access to bookings table
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
CREATE POLICY "Admins can view all bookings" ON public.bookings 
FOR SELECT USING (
  auth.uid() = user_id OR 
  auth.uid() IN (
    SELECT user_id FROM public.profiles WHERE role = 'admin'
  )
);

-- Ensure profiles table allows admin to view all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles 
FOR SELECT USING (
  true -- Everyone can view profiles, but we'll add admin-specific policies if needed
);