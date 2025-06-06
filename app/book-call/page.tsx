'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Clock, Loader2, ArrowRight, Video } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const timezones = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Australia/Sydney'
];

export default function BookCallPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');

  const handleBookCall = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time for your call.');
      return;
    }

    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/book-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          timezone: selectedTimezone
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book call');
      }

      toast.success('Call booked successfully! Redirecting to dashboard...');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error booking call:', error);
      toast.error('Failed to book call. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get tomorrow's date as minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 pt-20">
      <div className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-gradient-to-br from-primary to-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <Video className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-4">Book Your Strategy Call</h1>
            <p className="text-muted-foreground">
              Let's discuss your project details and plan the development roadmap together.
            </p>
          </div>

          <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Your Call
              </CardTitle>
              <CardDescription>
                Choose a convenient time for a 30-minute strategy session with our team.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  min={minDate}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Select Time</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className="text-sm"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedDate && selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/10 border border-primary/20 rounded-lg p-4"
                >
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-primary" />
                    <span>
                      Your call is scheduled for{' '}
                      <strong>
                        {new Date(selectedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </strong>
                      {' '}at <strong>{selectedTime}</strong> ({selectedTimezone.replace('_', ' ')})
                    </span>
                  </div>
                </motion.div>
              )}

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium mb-2">What to expect:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Review your project requirements in detail</li>
                  <li>• Discuss technical approach and timeline</li>
                  <li>• Answer any questions you have</li>
                  <li>• Plan next steps for development</li>
                </ul>
              </div>

              <Button
                onClick={handleBookCall}
                disabled={isLoading || !selectedDate || !selectedTime}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking Call...
                  </>
                ) : (
                  <>
                    Book Strategy Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}