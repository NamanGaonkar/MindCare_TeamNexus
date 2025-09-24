/*
  # Create admin user profile

  1. Updates
    - Update the profile for namanrgaonkar@gmail.com to have admin role
    - This will be executed when the user signs up or logs in

  2. Security
    - Uses existing RLS policies
*/

-- Function to ensure admin user gets admin role
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
      updated_at = NOW();
  ELSE
    -- Regular user profile creation
    INSERT INTO public.profiles (user_id, email, full_name, role)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Anonymous User'),
      'student'
    )
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      email = NEW.email,
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop the old trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create new trigger with admin role handling
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.ensure_admin_role();

-- Update existing profile if the admin user already exists
DO $$
BEGIN
  UPDATE public.profiles 
  SET role = 'admin', updated_at = NOW()
  WHERE email = 'namanrgaonkar@gmail.com';
END $$;