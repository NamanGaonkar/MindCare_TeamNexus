import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, MapPin, Phone, Video, Shield } from "lucide-react";

const BookingSystem = () => {
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const counselors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      speciality: "Anxiety & Depression",
      experience: "8 years",
      rating: 4.9,
      avatar: "SJ",
      available: true,
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      speciality: "Academic Stress",
      experience: "6 years",
      rating: 4.8,
      avatar: "MC",
      available: true,
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      speciality: "Social Anxiety",
      experience: "10 years",
      rating: 4.9,
      avatar: "ER",
      available: false,
    },
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const sessionTypes = [
    {
      type: "Video Call",
      icon: Video,
      description: "Private video session from your room",
      duration: "50 minutes",
      price: "Free for students",
    },
    {
      type: "Phone Call",
      icon: Phone,
      description: "Audio-only session for privacy",
      duration: "50 minutes", 
      price: "Free for students",
    },
    {
      type: "In-Person",
      icon: MapPin,
      description: "Meet at the counseling center",
      duration: "50 minutes",
      price: "Free for students",
    },
  ];

  return (
    <section id="booking" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              📅 Confidential Booking
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Book a Session with a Counselor
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Schedule a confidential session with our qualified mental health professionals. 
              All sessions are free for enrolled students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Booking Form */}
            <Card className="shadow-soft border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Schedule Your Session</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Session Type */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Choose Session Type</label>
                  <div className="grid gap-3">
                    {sessionTypes.map((session, index) => (
                      <Card key={index} className="cursor-pointer hover:bg-muted/30 transition-colors border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <session.icon className="h-5 w-5 text-primary mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{session.type}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {session.duration}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {session.description}
                              </p>
                              <p className="text-sm font-medium text-success mt-2">
                                {session.price}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Counselor Selection */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Select Counselor</label>
                  <Select value={selectedCounselor} onValueChange={setSelectedCounselor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a counselor" />
                    </SelectTrigger>
                    <SelectContent>
                      {counselors.map((counselor) => (
                        <SelectItem key={counselor.id} value={counselor.id} disabled={!counselor.available}>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                              {counselor.avatar}
                            </div>
                            <div>
                              <div className="font-medium">{counselor.name}</div>
                              <div className="text-xs text-muted-foreground">{counselor.speciality}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Date</label>
                    <Select value={selectedDate} onValueChange={setSelectedDate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="day-after">Day After Tomorrow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-3 block">Time</label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Book Button */}
                <Button className="w-full bg-gradient-wellness hover:opacity-90 transition-opacity">
                  Book Confidential Session
                </Button>

                {/* Privacy Notice */}
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium text-primary">100% Confidential</p>
                      <p className="text-muted-foreground mt-1">
                        Your privacy is protected. Sessions are not recorded and information is kept strictly confidential.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Counselor Profiles */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Available Counselors</h3>
              {counselors.map((counselor) => (
                <Card key={counselor.id} className={`shadow-soft border-border/50 ${!counselor.available ? 'opacity-60' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {counselor.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{counselor.name}</h4>
                          <Badge variant={counselor.available ? "default" : "secondary"}>
                            {counselor.available ? "Available" : "Busy"}
                          </Badge>
                        </div>
                        <p className="text-primary font-medium text-sm">{counselor.speciality}</p>
                        <p className="text-muted-foreground text-sm">{counselor.experience} experience</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center space-x-1">
                            <span className="text-xs">⭐</span>
                            <span className="text-sm font-medium">{counselor.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">200+ sessions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <Card className="mt-8 bg-destructive/5 border-destructive/20">
            <CardContent className="p-6">
              <div className="text-center">
                <h4 className="font-semibold text-destructive mb-2">Need Immediate Help?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're in crisis or having thoughts of self-harm, don't wait for an appointment.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="destructive" size="sm">
                    Crisis Hotline: 988
                  </Button>
                  <Button variant="outline" size="sm">
                    Campus Emergency: (555) 123-4567
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;