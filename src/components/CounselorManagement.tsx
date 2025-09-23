import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, UserCheck, Clock, Mail, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Counselor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string;
  availability: string[];
  isActive: boolean;
}

const CounselorManagement = () => {
  const [counselors, setCounselors] = useState<Counselor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@mindcare.com',
      phone: '+1 (555) 123-4567',
      specialization: 'Anxiety & Depression',
      experience: '8 years',
      availability: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'],
      isActive: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@mindcare.com',
      phone: '+1 (555) 234-5678',
      specialization: 'Academic Stress & ADHD',
      experience: '5 years',
      availability: ['11:00 AM', '02:00 PM', '04:00 PM'],
      isActive: true
    }
  ]);

  const [newCounselor, setNewCounselor] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    availability: [] as string[]
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const addCounselor = () => {
    if (!newCounselor.name || !newCounselor.email || !newCounselor.specialization) {
      toast.error('Please fill in all required fields');
      return;
    }

    const counselor: Counselor = {
      id: Date.now().toString(),
      ...newCounselor,
      isActive: true
    };

    setCounselors([...counselors, counselor]);
    setNewCounselor({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      experience: '',
      availability: []
    });
    setIsDialogOpen(false);
    toast.success('Counselor added successfully');
  };

  const removeCounselor = (id: string) => {
    setCounselors(counselors.filter(c => c.id !== id));
    toast.success('Counselor removed successfully');
  };

  const toggleCounselorStatus = (id: string) => {
    setCounselors(counselors.map(c => 
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ));
    toast.success('Counselor status updated');
  };

  const toggleAvailability = (timeSlot: string) => {
    setNewCounselor(prev => ({
      ...prev,
      availability: prev.availability.includes(timeSlot)
        ? prev.availability.filter(slot => slot !== timeSlot)
        : [...prev.availability, timeSlot]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Counselor Management</h3>
          <p className="text-muted-foreground text-sm">Manage counselors and their availability</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Counselor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Counselor</DialogTitle>
              <DialogDescription>
                Enter counselor details and set their availability
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newCounselor.name}
                    onChange={(e) => setNewCounselor(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Dr. Jane Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newCounselor.email}
                    onChange={(e) => setNewCounselor(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="jane.smith@mindcare.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newCounselor.phone}
                    onChange={(e) => setNewCounselor(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={newCounselor.experience}
                    onChange={(e) => setNewCounselor(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="5 years"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="specialization">Specialization *</Label>
                <Textarea
                  id="specialization"
                  value={newCounselor.specialization}
                  onChange={(e) => setNewCounselor(prev => ({ ...prev, specialization: e.target.value }))}
                  placeholder="Anxiety, Depression, Academic Stress..."
                  rows={2}
                />
              </div>
              <div>
                <Label>Available Time Slots</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={newCounselor.availability.includes(slot) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleAvailability(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addCounselor}>Add Counselor</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {counselors.map((counselor) => (
          <Card key={counselor.id} className="shadow-soft border-border/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{counselor.name}</h4>
                    <Badge variant={counselor.isActive ? "default" : "secondary"}>
                      {counselor.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {counselor.email}
                    </div>
                    {counselor.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {counselor.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-3 w-3" />
                      {counselor.specialization}
                    </div>
                    {counselor.experience && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {counselor.experience} experience
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Available Times:</p>
                    <div className="flex flex-wrap gap-1">
                      {counselor.availability.map((slot) => (
                        <Badge key={slot} variant="outline" className="text-xs">
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCounselorStatus(counselor.id)}
                  >
                    {counselor.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeCounselor(counselor.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CounselorManagement;