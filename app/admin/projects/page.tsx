"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  project_url?: string;
  technologies: string;
  order_index: number;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const openEditDialog = (project?: Project) => {
    setEditingProject(
      project || {
        id: 0,
        title: "",
        description: "",
        image_url: "",
        project_url: "",
        technologies: "",
        order_index: projects.length + 1,
      }
    );
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => openEditDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="p-4">
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="font-semibold mb-2">{project.title}</h3>
              <div
                className="text-sm text-muted-foreground mb-4 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Order: {project.order_index}
                </span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(project)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ProjectDialog
        project={editingProject}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingProject(null);
        }}
        onSave={() => {
          fetchProjects();
          setIsDialogOpen(false);
          setEditingProject(null);
        }}
      />
    </div>
  );
}

function ProjectDialog({
  project,
  isOpen,
  onClose,
  onSave,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const [data, setData] = useState<Project | null>(project);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setData(project);
  }, [project]);

  if (!data) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = data.id
        ? `/api/admin/projects/${data.id}`
        : "/api/admin/projects";
      const method = data.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");

      onSave();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {data.id ? "Edit Project" : "Add Project"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <RichTextEditor
              content={data.description}
              onChange={(content) => setData({ ...data, description: content })}
            />
          </div>

          <ImageUpload
            label="Project Image"
            currentImage={data.image_url}
            onImageChange={(url) => setData({ ...data, image_url: url })}
          />

          <div className="space-y-2">
            <Label htmlFor="project_url">Project URL (optional)</Label>
            <Input
              id="project_url"
              value={data.project_url || ""}
              onChange={(e) =>
                setData({ ...data, project_url: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input
              id="technologies"
              value={data.technologies}
              onChange={(e) =>
                setData({ ...data, technologies: e.target.value })
              }
              placeholder="React, TypeScript, Node.js..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order_index">Display Order</Label>
            <Input
              id="order_index"
              type="number"
              value={data.order_index}
              onChange={(e) =>
                setData({ ...data, order_index: parseInt(e.target.value) })
              }
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
