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

export default function SeoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    page_title: "",
    meta_description: "",
    og_image_url: "",
    keywords: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/seo");
      const result = await response.json();
      if (result) {
        setData(result);
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
      const response = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");

      toast.success("SEO settings updated successfully!");
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
        <h1 id="seo-heading" className="text-3xl font-bold mb-2">SEO Settings</h1>
        <p id="seo-description" className="text-muted-foreground">
          Configure your site's SEO and meta tags
        </p>
      </div>

      <Card className="p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-labelledby="seo-heading"
          aria-describedby="seo-description"
        >
          <div className="space-y-2">
            <Label htmlFor="page_title">Page Title</Label>
            <Input
              id="page_title"
              name="page_title"
              value={data.page_title}
              onChange={(e) =>
                setData({ ...data, page_title: e.target.value })
              }
              placeholder="Your Name - Project Manager Portfolio"
              required
              aria-required="true"
            />
            <p className="text-xs text-muted-foreground">
              Appears in browser tabs and search results
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              name="meta_description"
              value={data.meta_description}
              onChange={(e) =>
                setData({ ...data, meta_description: e.target.value })
              }
              placeholder="Brief description of your portfolio..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Max 160 characters for optimal search results
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords (comma-separated)</Label>
            <Input
              id="keywords"
              name="keywords"
              value={data.keywords}
              onChange={(e) => setData({ ...data, keywords: e.target.value })}
              placeholder="project management, agile, scrum..."
            />
          </div>

          <ImageUpload
            label="Open Graph Image (for social media sharing)"
            currentImage={data.og_image_url}
            onImageChange={(url) => setData({ ...data, og_image_url: url })}
          />
          <p className="text-xs text-muted-foreground -mt-2">
            Recommended size: 1200x630px
          </p>

          <div className="flex justify-between">
            <Button type="button" variant="outline" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Preview homepage in new tab">
                Preview
              </a>
            </Button>
            <Button
              type="submit"
              disabled={saving}
              aria-label={saving ? "Saving SEO settings changes" : "Save SEO settings changes"}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
