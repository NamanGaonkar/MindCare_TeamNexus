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
  const [initializing, setInitializing] = useState(true);

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

    // Check if this is the admin email
    const isAdmin = currentUser.email === 'namanrgaonkar@gmail.com';
    if (isAdmin) {
      await updateUserRole(currentUser.id, 'admin');
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

  const updateUserRole = async (userId: string, role: 'admin' | 'student') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('user_id', userId);
      
      if (error) {
        console.error('Error updating user role:', error);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
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
        
        if (initializing) setInitializing(false);
        if (loading) setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      if (session?.user) {
        updateUserWithProfile(session.user);
      } else if (initializing) {
        setInitializing(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (initializing) setLoading(false);
  }, [initializing]);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      setLoading(false);
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
      setLoading(false);
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

      setLoading(false);
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
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setLoading(false);
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