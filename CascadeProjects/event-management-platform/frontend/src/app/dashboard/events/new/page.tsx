"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { eventAPI } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    maxParticipants: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.title || !formData.description || !formData.location || !formData.date || !formData.maxParticipants) {
      setError("All fields are required");
      return;
    }

    const maxParticipants = parseInt(formData.maxParticipants);
    if (isNaN(maxParticipants) || maxParticipants <= 0) {
      setError("Max participants must be a positive number");
      return;
    }

    setLoading(true);

    try {
      await eventAPI.create({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date: formData.date,
        maxParticipants,
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Back Button */}
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => router.push("/dashboard")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Button>

      {/* Create Event Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-gradient">
            Create New Event
          </CardTitle>
          <CardDescription>
            Fill in the details to create your event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Event Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter event title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your event..."
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Event location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">
                Date & Time
              </Label>
              <Input
                id="date"
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Max Participants */}
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">
                Maximum Participants
              </Label>
              <Input
                id="maxParticipants"
                name="maxParticipants"
                type="number"
                min="1"
                placeholder="Enter maximum number of participants"
                value={formData.maxParticipants}
                onChange={handleChange}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-md p-3">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Event"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
