"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { eventAPI, Event } from "@/lib/api";
import { Calendar, MapPin, Users } from "lucide-react";

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchQuery, locationFilter, events]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventAPI.getAll();
      setEvents(data);
      setFilteredEvents(data);
    } catch (err: any) {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="text-muted-foreground">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
          Discover Events
        </h1>
        <p className="text-muted-foreground text-lg">Find and explore upcoming events in your area</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <Input
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Input
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="flex-1 sm:max-w-xs"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-md p-3">
          {error}
        </div>
      )}

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg mb-4">No events found</p>
            <Link href="/dashboard/events/new">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Create Your First Event
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/dashboard/events/${event.id}`}>
              <Card className="hover:border-primary/50 transition-all cursor-pointer h-full group hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    <span>
                      {event.currentParticipants} / {event.maxParticipants} participants
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
