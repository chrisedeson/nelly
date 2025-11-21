"use client";
import { toast } from "sonner";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    image_url: "",
    years_experience: 0,
    projects_completed: 0,
    skills: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/about");
      const result = await response.json();
      if (result) {
        setData({
          title: result.title || "",
          description: result.description || "",
          image_url: result.image_url || "",
          years_experience: result.years_experience || 0,
          projects_completed: result.projects_completed || 0,
          skills: result.skills || "",
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
      const response = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");

      toast.success("About section updated successfully!");
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
        <h1 id="about-heading" className="text-3xl font-bold mb-2">About Section</h1>
        <p id="about-description" className="text-muted-foreground">Edit your about section content</p>
      </div>

      <Card className="p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-labelledby="about-heading"
          aria-describedby="about-description"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              required
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              content={data.description}
              onChange={(content) =>
                setData({ ...data, description: content })
              }
            />
          </div>

          <ImageUpload
            label="About Image"
            currentImage={data.image_url}
            onImageChange={(url) => setData({ ...data, image_url: url })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="years_experience">Years of Experience</Label>
              <Input
                id="years_experience"
                name="years_experience"
                type="number"
                value={data.years_experience}
                onChange={(e) =>
                  setData({
                    ...data,
                    years_experience: parseInt(e.target.value) || 0,
                  })
                }
                required
                aria-required="true"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projects_completed">Projects Completed</Label>
              <Input
                id="projects_completed"
                name="projects_completed"
                type="number"
                value={data.projects_completed}
                onChange={(e) =>
                  setData({
                    ...data,
                    projects_completed: parseInt(e.target.value) || 0,
                  })
                }
                required
                aria-required="true"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input
              id="skills"
              name="skills"
              value={data.skills}
              onChange={(e) => setData({ ...data, skills: e.target.value })}
              placeholder="Project Management, Agile, Scrum..."
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
              aria-label={saving ? "Saving about section changes" : "Save about section changes"}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
