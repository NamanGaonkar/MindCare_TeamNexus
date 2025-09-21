
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Video, User, Clock } from "lucide-react";

// Placeholder data for certified counselors
const counselors = [
  {
    id: 1,
    name: "Dr. Anjali Sharma",
    specialties: ["Anxiety", "Stress Management", "CBT"],
    availability: "Next available: Tomorrow at 10:00 AM",
    image: "/placeholder-user.jpg", // Placeholder image path
  },
  {
    id: 2,
    name: "Mr. Rohan Verma",
    specialties: ["Depression", "Relationships", "Mindfulness"],
    availability: "Next available: Friday at 2:30 PM",
    image: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Ms. Priya Desai",
    specialties: ["Academic Pressure", "Burnout", "Trauma"],
    availability: "Next available: Monday at 9:00 AM",
    image: "/placeholder-user.jpg",
  },
];

const BookingSystem = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              📅 Secure Your Session
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book a Confidential Session
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a certified counselor who fits your needs. All sessions are private, secure, 
              and tailored to your well-being.
            </p>
          </div>

          {/* Counselor Listings */}
          <div className="space-y-8">
            {counselors.map((counselor) => (
              <Card key={counselor.id} className="shadow-soft border-border/50 overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
                <div className="md:flex">
                  {/* Counselor Profile Section */}
                  <div className="md:w-1/3 bg-muted/30 p-6 flex flex-col items-center justify-center text-center">
                     <div className="w-24 h-24 rounded-full bg-gradient-primary mb-4 flex items-center justify-center ring-4 ring-primary/20">
                      <User className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{counselor.name}</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {counselor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Booking Section */}
                  <div className="md:w-2/3 p-6 flex flex-col justify-center">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl">Next Available Appointment</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-2 text-muted-foreground mb-6">
                        <Clock className="h-5 w-5" />
                        <span>{counselor.availability}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* These buttons are placeholders for the backend team to implement booking logic */}
                        <Button size="lg" className="w-full sm:w-auto therapy-gradient hover:shadow-glow transition-all">
                          <Calendar className="h-4 w-4 mr-2" />
                          View Full Schedule
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                          <Video className="h-4 w-4 mr-2" />
                          Request Video Call
                        </Button>
                      </div>
                       <p className="text-xs text-muted-foreground mt-6">
                        Your booking is confidential and protected.
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;
