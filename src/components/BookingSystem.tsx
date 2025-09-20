
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Video, Phone } from "lucide-react";

const IndianHelplines = () => (
  <div className="mt-8">
    <h3 className="text-lg font-semibold mb-4">Mental Health Helplines (India)</h3>
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li><strong>Vandrevala Foundation:</strong> 9999666555 (24/7)</li>
      <li><strong>KIRAN Mental Health Helpline:</strong> 1800-599-0019 (24/7)</li>
      <li><strong>iCALL Psychosocial Helpline:</strong> 022-25521111 (Mon-Sat, 10 AM - 8 PM)</li>
    </ul>
  </div>
);

const BookingSystem = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];

  return (
    <div id="booking" className="py-20 bg-background/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
            Book a Confidential Session
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Schedule a private session with a professional counsellor. Your privacy is our priority.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="bg-background/50">
            <CardHeader>
              <CardTitle>Schedule Your Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">1. Select a Date</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2. Select a Time Slot</h3>
                  <Select onValueChange={setTime} value={time}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-gradient-primary hover:opacity-90" size="lg" disabled={!date || !time}>
                  Confirm Your Booking
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  You will receive a confirmation email with session details.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="bg-background/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Session Options</CardTitle>
                <div className="flex space-x-2">
                    <Video className="h-5 w-5 text-primary" />
                    <Phone className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose the format that works best for you. We offer secure video calls or phone sessions based on your comfort and privacy needs.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Need Immediate Help?</CardTitle>
                <Bell className="h-5 w-5 text-destructive" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you are in crisis or need immediate support, please reach out to one of the helplines.
                </p>
                <IndianHelplines />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;
