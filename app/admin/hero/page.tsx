"use client";
import { toast } from "sonner";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import { useRouter } from "next/navigation";

export default function HeroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    hero_name: "",
    hero_tagline: "",
    hero_description: "",
    hero_image_url: "",
    hero_cta_text: "",
    hero_cta_link: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/portfolio");
      const result = await response.json();
      setData({
        hero_name: result.hero_name || "",
        hero_tagline: result.hero_tagline || "",
        hero_description: result.hero_description || "",
        hero_image_url: result.hero_image_url || "",
        hero_cta_text: result.hero_cta_text || "",
        hero_cta_link: result.hero_cta_link || "",
      });
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
      const response = await fetch("/api/admin/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");

      toast.success("Hero section updated successfully!");
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
        <h1 id="hero-heading" className="text-3xl font-bold mb-2">Hero Section</h1>
        <p id="hero-description" className="text-muted-foreground">
          Edit your homepage hero section
        </p>
      </div>

      <Card className="p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-labelledby="hero-heading"
          aria-describedby="hero-description"
        >
          <div className="space-y-2">
            <Label htmlFor="hero_name">Name</Label>
            <Input
              id="hero_name"
              name="hero_name"
              value={data.hero_name}
              onChange={(e) =>
                setData({ ...data, hero_name: e.target.value })
              }
              required
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero_tagline">Tagline</Label>
            <Input
              id="hero_tagline"
              name="hero_tagline"
              value={data.hero_tagline}
              onChange={(e) =>
                setData({ ...data, hero_tagline: e.target.value })
              }
              required
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero_description">Description</Label>
            <Textarea
              id="hero_description"
              name="hero_description"
              value={data.hero_description}
              onChange={(e) =>
                setData({ ...data, hero_description: e.target.value })
              }
              rows={4}
            />
          </div>

          <ImageUpload
            label="Hero Image"
            currentImage={data.hero_image_url}
            onImageChange={(url) =>
              setData({ ...data, hero_image_url: url })
            }
          />

          <div className="space-y-2">
            <Label htmlFor="hero_cta_text">Call to Action Text</Label>
            <Input
              id="hero_cta_text"
              name="hero_cta_text"
              value={data.hero_cta_text || ""}
              onChange={(e) =>
                setData({ ...data, hero_cta_text: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero_cta_link">Call to Action Link</Label>
            <Input
              id="hero_cta_link"
              name="hero_cta_link"
              type="url"
              value={data.hero_cta_link || ""}
              onChange={(e) =>
                setData({ ...data, hero_cta_link: e.target.value })
              }
              placeholder="https://example.com"
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
              aria-label={saving ? "Saving hero section changes" : "Save hero section changes"}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
