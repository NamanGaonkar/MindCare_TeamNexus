import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

const PeerHelperApplication = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-soft border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Become a Peer Helper
              </CardTitle>
              <p className="text-muted-foreground pt-2">
                Join our team of trained student volunteers and make a positive impact on the mental health of our community.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What is a Peer Helper?</h3>
                <p className="text-sm text-muted-foreground">
                  Peer Helpers are compassionate and empathetic students who are trained to provide a listening ear, share resources, and help moderate the community forum. You are not a counselor, but a first point of contact for students seeking support.
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div>
                  <Label htmlFor="email">Student Email</Label>
                  <Input id="email" type="email" placeholder="Enter your student email" />
                </div>
                <div>
                  <Label htmlFor="reason">Why do you want to be a Peer Helper?</Label>
                  <Textarea 
                    id="reason" 
                    placeholder="Share your motivation, relevant experiences, and what you hope to contribute (200 words max)" 
                    rows={5} 
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                    I understand that this role requires a commitment to training and a dedication to upholding the community guidelines. I agree to maintain confidentiality and act with integrity.
                  </Label>
                </div>

                <div className="flex justify-end pt-4 space-x-2">
                  <Link to="/community">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button>Submit Application</Button>
                </div>
              </form>

            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PeerHelperApplication;
