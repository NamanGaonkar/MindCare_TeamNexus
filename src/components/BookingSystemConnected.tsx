import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Counselor {
  id: string;
  name: string;
  specialization: string[];
  bio: string | null;
  is_available: boolean;
  available_slots: any;
  experience_years: number | null;
}

interface BookingFormData {
  session_type: 'online' | 'in-person';
  notes: string;
}

const BookingSystemConnected = () => {
  const { user, loading: authLoading } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedCounselor, setSelectedCounselor] = useState<string>('');
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    session_type: 'online',
    notes: ''
  });

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  useEffect(() => {
    if (!authLoading) {
      fetchCounselors();
    }
  }, [authLoading]);

  const fetchCounselors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('counselors')
        .select('*')
        .eq('is_available', true);

      if (error) {
        console.error('Error fetching counselors:', error);
        toast.error('Failed to load counselors');
        return;
      }

      setCounselors(data?.map(counselor => ({
        ...counselor,
        available_slots: Array.isArray(counselor.available_slots) ? counselor.available_slots : []
      })) || []);
    } catch (error) {
      console.error('Error fetching counselors:', error);
      toast.error('Failed to load counselors');
    } finally {
      setLoading(false);
    }
  };

  const getAvailableTimesForCounselor = (counselorId: string) => {
    const counselor = counselors.find(c => c.id === counselorId);
    if (!counselor) return timeSlots;
    
    // Handle available_slots being either array or null/undefined
    let slots = counselor.available_slots;
    if (Array.isArray(slots) && slots.length > 0) {
      return slots;
    }
    return timeSlots;
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please log in to book a session');
      return;
    }

    if (!selectedDate || !selectedTime || !selectedCounselor) {
      toast.error('Please select a counselor, date, and time');
      return;
    }

    setBookingLoading(true);

    try {
      // Create booking date-time
      const bookingDateTime = new Date(selectedDate);
      const [time, period] = selectedTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : 
                           period === 'AM' && hours === 12 ? 0 : hours;
      
      bookingDateTime.setHours(adjustedHours, minutes, 0, 0);

      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          counselor_id: selectedCounselor,
          session_date: bookingDateTime.toISOString(),
          session_type: bookingForm.session_type,
          notes: bookingForm.notes || null,
          status: 'scheduled'
        });

      if (error) {
        console.error('Error creating booking:', error);
        toast.error('Failed to create booking');
        return;
      }

      const counselor = counselors.find(c => c.id === selectedCounselor);
      toast.success(`Session booked with ${counselor?.name} for ${selectedDate.toDateString()} at ${selectedTime}`);
      
      // Reset form
      setSelectedDate(new Date());
      setSelectedTime(null);
      setSelectedCounselor('');
      setBookingForm({ session_type: 'online', notes: '' });

    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading booking system...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md text-center bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Login Required</p>
            <p className="text-muted-foreground">Please log in to book a counseling session</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              📅 Secure Your Session
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book a Confidential Session
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a time that works for you. All sessions are private, secure, and conducted by certified professionals.
            </p>
          </div>

          <Card className="shadow-elegant border-border/50 bg-background/80 backdrop-blur-sm mb-6">
            <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-start">
              <div>
                <CardTitle className="mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  1. Select a Counselor
                </CardTitle>
                <Select value={selectedCounselor} onValueChange={setSelectedCounselor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a counselor" />
                  </SelectTrigger>
                  <SelectContent>
                    {counselors.map((counselor) => (
                      <SelectItem key={counselor.id} value={counselor.id}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{counselor.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {counselor.specialization?.join(', ')} • {counselor.experience_years || 0}+ years
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedCounselor && (
                  <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                    {(() => {
                      const counselor = counselors.find(c => c.id === selectedCounselor);
                      return counselor ? (
                        <div>
                          <p className="text-sm font-medium">{counselor.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {counselor.bio || 'Experienced counselor ready to help you.'}
                          </p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              <div>
                <CardTitle className="mb-4 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  2. Select a Date
                </CardTitle>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border bg-background/50 backdrop-blur-sm"
                  disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                />
              </div>
            </CardContent>
          </Card>

          {selectedCounselor && (
            <Card className="shadow-elegant border-border/50 bg-background/80 backdrop-blur-sm mb-6">
              <CardContent className="p-8">
                <CardTitle className="mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  3. Select a Time
                </CardTitle>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getAvailableTimesForCounselor(selectedCounselor).map((slot) => (
                    <Button 
                      key={slot}
                      variant={selectedTime === slot ? "default" : "outline"}
                      onClick={() => setSelectedTime(slot)}
                      className="h-12"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {selectedDate && selectedTime && selectedCounselor && (
            <Card className="shadow-elegant border-border/50 bg-background/80 backdrop-blur-sm mb-6">
              <CardContent className="p-8">
                <CardTitle className="mb-4">4. Session Details</CardTitle>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Session Type</label>
                    <Select 
                      value={bookingForm.session_type} 
                      onValueChange={(value: 'online' | 'in-person') => 
                        setBookingForm(prev => ({ ...prev, session_type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online Session</SelectItem>
                        <SelectItem value="in-person">In-Person Session</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Additional Notes (Optional)</label>
                    <Textarea
                      placeholder="Any specific topics you'd like to discuss or special requirements..."
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-center">
            <Button 
              size="lg" 
              onClick={handleBooking} 
              disabled={!selectedDate || !selectedTime || !selectedCounselor || bookingLoading}
              className="px-8 py-3 bg-gradient-primary hover:opacity-90"
            >
              {bookingLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {selectedDate && selectedTime && selectedCounselor ? 
                `Confirm Booking for ${selectedTime}` : 
                'Complete Your Selection to Book'}
            </Button>
            
            {selectedDate && selectedTime && selectedCounselor && (
              <div className="mt-4 p-4 bg-muted/30 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-muted-foreground">
                  You have selected <strong>{counselors.find(c => c.id === selectedCounselor)?.name}</strong> on{' '}
                  <strong>{selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</strong> at <strong>{selectedTime}</strong>
                  {bookingForm.session_type && (
                    <span> via <strong>{bookingForm.session_type === 'online' ? 'Online' : 'In-Person'}</strong> session</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSystemConnected;