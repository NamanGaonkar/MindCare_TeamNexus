import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Video, Phone, User, Users, Briefcase } from "lucide-react";

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
  const [counselingType, setCounselingType] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];

  const counselingTypes = [
    { value: "individual", label: "Individual Counseling", icon: User },
    { value: "group", label: "Group Session", icon: Users },
    { value: "career", label: "Career & Academic Advice", icon: Briefcase },
  ];

  const isBookingDisabled = !date || !time || !counselingType;

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
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">1. Select Counseling Type</h3>
                <Select onValueChange={setCounselingType} value={counselingType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a counseling type" />
                  </SelectTrigger>
                  <SelectContent>
                    {counselingTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          <type.icon className="h-4 w-4 mr-2" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">2. Select a Date & Time</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
                  <div className="flex flex-col space-y-2">
                    {timeSlots.map((slot) => (
                        <Button 
                            key={slot} 
                            variant={time === slot ? "default" : "outline"} 
                            onClick={() => setTime(slot)} 
                            className="w-full justify-center"
                        >
                            {slot}
                        </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Additional Notes (Optional)</h3>
                <Textarea 
                  placeholder="Share any specific concerns or questions you have for the counsellor."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <Button className="w-full bg-gradient-primary hover:opacity-90" size="lg" disabled={isBookingDisabled}>
                Confirm Your Booking
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                You will receive a confirmation email with session details.
              </p>
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
