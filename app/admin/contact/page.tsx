"use client";
import { toast } from "sonner";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    email: "",
    phone: "",
    location: "",
    availability_status: "",
    receiver_email: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/contact");
      const result = await response.json();
      if (result) {
        setData({
          email: result.email || "",
          phone: result.phone || "",
          location: result.location || "",
          availability_status: result.availability_status || "",
          receiver_email: result.receiver_email || "",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");

      toast.success("Contact info updated successfully!");
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="text-center py-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 id="contact-heading" className="text-3xl font-bold mb-2">Contact Information</h1>
        <p id="contact-description" className="text-muted-foreground">
          Edit your contact details
        </p>
      </div>

      <Card className="p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-labelledby="contact-heading"
          aria-describedby="contact-description"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              placeholder="City, Country"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability_status">Availability Status</Label>
            <Input
              id="availability_status"
              name="availability_status"
              value={data.availability_status}
              onChange={(e) =>
                setData({ ...data, availability_status: e.target.value })
              }
              placeholder="e.g., Available for new projects"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receiver_email">Email Address to Receive Contact Form Submissions</Label>
            <Input
              id="receiver_email"
              name="receiver_email"
              type="email"
              value={data.receiver_email}
              onChange={(e) =>
                setData({ ...data, receiver_email: e.target.value })
              }
              required
              aria-required="true"
              placeholder="your-email@example.com"
            />
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Preview homepage in new tab">
                Preview
              </a>
            </Button>
            <Button
              type="submit"
              disabled={saving}
              aria-label={saving ? "Saving contact information changes" : "Save contact information changes"}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
