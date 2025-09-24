import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
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
  login: (email: string, password: string) => Promise<{ error: any }>;
  signup: (email: string, password: string, userData: any) => Promise<{ error: any }>;
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
        .single();

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

  const updateUserWithProfile = async (currentUser: User | null) => {
    if (!currentUser) {
      setUser(null);
      setProfile(null);
      return;
    }

    const userProfile = await fetchProfile(currentUser.id);
    setProfile(userProfile);
    
    // Add role to user object
    const userWithRole = {
      ...currentUser,
      role: userProfile?.role || 'student'
    };
    setUser(userWithRole);
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        
        if (session?.user) {
          await updateUserWithProfile(session.user);
        } else {
          setUser(null);
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      if (session?.user) {
        updateUserWithProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have been logged in successfully."
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return { error };
    }
  };

  const signup = async (email: string, password: string, userData: any) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
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
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Signup Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return { error };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        toast({
          title: "Logged Out",
          description: "You have been logged out successfully."
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAuthenticated = !!session;

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