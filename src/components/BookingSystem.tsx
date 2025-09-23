
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  availability: string[];
}

const counselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Anxiety & Depression',
    availability: ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM"]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Academic Stress & ADHD',
    availability: ["11:00 AM", "02:00 PM", "04:00 PM"]
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Social Anxiety & Relationships',
    availability: ["09:00 AM", "11:00 AM", "03:00 PM", "04:00 PM"]
  }
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
];

const BookingSystem = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedCounselor, setSelectedCounselor] = useState<string>('');

  const getAvailableTimesForCounselor = (counselorId: string) => {
    const counselor = counselors.find(c => c.id === counselorId);
    return counselor ? counselor.availability : [];
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedCounselor) {
      const counselor = counselors.find(c => c.id === selectedCounselor);
      alert(`Session booked with ${counselor?.name} for ${selectedDate.toDateString()} at ${selectedTime}`);
    } else {
      alert("Please select a counselor, date and time.");
    }
  };

  return (
    <section className="py-20 bg-muted/30">
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

            <Card className="shadow-soft border-border/50">
              <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <CardTitle className="mb-4">1. Select a Counselor</CardTitle>
                  <Select value={selectedCounselor} onValueChange={setSelectedCounselor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a counselor" />
                    </SelectTrigger>
                    <SelectContent>
                      {counselors.map((counselor) => (
                        <SelectItem key={counselor.id} value={counselor.id}>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{counselor.name}</span>
                            <span className="text-xs text-muted-foreground">{counselor.specialization}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <CardTitle className="mb-4">2. Select a Date</CardTitle>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border bg-background"
                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
                </div>
              </CardContent>
            </Card>

            {selectedCounselor && (
              <Card className="shadow-soft border-border/50 mt-6">
                <CardContent className="p-8">
                  <CardTitle className="mb-4">3. Select a Time</CardTitle>
                  <div className="grid grid-cols-2 gap-3">
                    {getAvailableTimesForCounselor(selectedCounselor).map((slot) => (
                      <Button 
                        key={slot}
                        variant={selectedTime === slot ? "default" : "outline"}
                        onClick={() => setSelectedTime(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

          <div className="mt-8 text-center">
            <Button size="lg" onClick={handleBooking} disabled={!selectedDate || !selectedTime || !selectedCounselor}>
                {selectedDate && selectedTime && selectedCounselor ? 
                  `Confirm Booking for ${selectedTime}` : 
                  'Complete Your Selection to Book'}
            </Button>
            {selectedDate && selectedTime && selectedCounselor && (
                <p className="text-sm text-muted-foreground mt-4">
                  You have selected {counselors.find(c => c.id === selectedCounselor)?.name} on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime}.
                </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;
