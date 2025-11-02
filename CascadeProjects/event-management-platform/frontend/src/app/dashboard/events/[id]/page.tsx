"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { eventAPI, Event } from "@/lib/api";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchEvent(params.id as string);
    }
  }, [params.id]);

  const fetchEvent = async (id: string) => {
    try {
      setLoading(true);
      const data = await eventAPI.getById(id);
      setEvent(data);
    } catch (err: any) {
      setError("Failed to load event");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="text-muted-foreground">Loading event...</div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Button>
        <Card className="border-2 border-dashed border-destructive/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-destructive text-lg">{error || "Event not found"}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const spotsRemaining = event.maxParticipants - event.currentParticipants;
  const isFull = spotsRemaining <= 0;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => router.push("/dashboard")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Button>

      {/* Event Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-gradient">
            {event.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About this event</h3>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>

          {/* Event Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg p-4 border">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-medium">
                    {new Date(event.date).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border md:col-span-2">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Attendance</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="font-medium">
                      {event.currentParticipants} / {event.maxParticipants} participants
                    </p>
                    {isFull ? (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full border border-red-500/30">
                        Event Full
                      </span>
                    ) : (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
                        {spotsRemaining} spots left
                      </span>
                    )}
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-3 w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${(event.currentParticipants / event.maxParticipants) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
