import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  role: 'student' | 'admin';
  institute: string | null;
  roll_number: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: (User & { role?: 'student' | 'admin' }) | null;
  profile: Profile | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signup: (email: string, password: string, userData: any) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<(User & { role?: 'student' | 'admin' }) | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as Profile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  const createOrUpdateProfile = async (currentUser: User) => {
    try {
      // Check if user is admin based on metadata or hardcoded email
      const isAdmin = currentUser.email === 'namanrgaonkar@gmail.com' || 
                     currentUser.user_metadata?.isAdmin === true;
      
      const profileData = {
        user_id: currentUser.id,
        email: currentUser.email,
        full_name: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || 'User',
        role: isAdmin ? 'admin' : 'student',
        institute: currentUser.user_metadata?.institute || null,
        roll_number: currentUser.user_metadata?.roll_number || null
      };

      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating/updating profile:', error);
        return null;
      }

      return data as Profile;
    } catch (error) {
      console.error('Error in createOrUpdateProfile:', error);
      return null;
    }
  };

  const updateUserWithProfile = async (currentUser: User | null) => {
    if (!currentUser) {
      setUser(null);
      setProfile(null);
      return;
    }

    try {
      let userProfile = await fetchProfile(currentUser.id);
      
      // If profile doesn't exist or needs updating, create/update it
      if (!userProfile) {
        userProfile = await createOrUpdateProfile(currentUser);
      } else {
        // Check if admin user needs role update
        const isAdmin = currentUser.email === 'namanrgaonkar@gmail.com' || 
                       currentUser.user_metadata?.isAdmin === true;
        if (isAdmin && userProfile.role !== 'admin') {
          userProfile = await createOrUpdateProfile(currentUser);
        }
      }

      setProfile(userProfile);
      
      // Add role to user object
      const userWithRole = {
        ...currentUser,
        role: userProfile?.role || 'student'
      };
      setUser(userWithRole);
    } catch (error) {
      console.error('Error updating user with profile:', error);
      setUser({
        ...currentUser,
        role: 'student'
      });
      setProfile(null);
    }
  };

  useEffect(() => {
    let mounted = true;

    const getInitialSession = async () => {
      try {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (mounted) {
          setSession(session);
          if (session?.user) {
            await updateUserWithProfile(session.user);
          }
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (mounted) {
          setSession(session);
          
          if (session?.user) {
            await updateUserWithProfile(session.user);
          } else {
            setUser(null);
            setProfile(null);
          }
          
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      if (data.user) {
        await updateUserWithProfile(data.user);
        toast({
          title: "Welcome back!",
          description: "You have been logged in successfully."
        });
      }

      return { error: null };
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, userData: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName,
            institute: userData.institute,
            roll_number: userData.rollNumber
          }
        }
      });

      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
      });

      return { error: null };
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: "Logout Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        setUser(null);
        setProfile(null);
        setSession(null);
        toast({
          title: "Logged Out",
          description: "You have been logged out successfully."
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!session && !!user;

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      profile,
      session,
      login,
      signup,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};