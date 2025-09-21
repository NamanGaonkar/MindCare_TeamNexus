
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
];

const BookingSystem = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      alert(`Session booked for ${selectedDate.toDateString()} at ${selectedTime}`);
      // Here you would typically handle the booking logic,
      // like sending data to a backend.
    } else {
      alert("Please select a date and time.");
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
                <CardTitle className="mb-4">1. Select a Date</CardTitle>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border bg-background"
                  disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                />
              </div>
              
              <div>
                <CardTitle className="mb-4">2. Select a Time</CardTitle>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <Button 
                      key={slot}
                      variant={selectedTime === slot ? "default" : "outline"}
                      onClick={() => setSelectedTime(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Button size="lg" onClick={handleBooking} disabled={!selectedDate || !selectedTime}>
                {selectedDate && selectedTime ? `Confirm Booking for ${selectedTime}` : 'Book Your Session'}
            </Button>
            {selectedDate && selectedTime && (
                <p className="text-sm text-muted-foreground mt-4">
You have selected {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime}.
                </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;
