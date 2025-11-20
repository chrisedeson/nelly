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
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface RecentWork {
  id: number;
  title: string;
  description: string;
  image_url: string;
  work_url?: string;
  category: string;
  order_index: number;
}

export default function RecentWorkPage() {
  const [recentWork, setRecentWork] = useState<RecentWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingWork, setEditingWork] = useState<RecentWork | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchRecentWork();
  }, []);

  const fetchRecentWork = async () => {
    try {
      const response = await fetch("/api/admin/recent-work");
      const data = await response.json();
      setRecentWork(data);
    } catch (error) {
      console.error("Error fetching recent work:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(`/api/admin/recent-work/${id}`, { method: "DELETE" });
      fetchRecentWork();
    } catch (error) {
      console.error("Error deleting recent work:", error);
    }
  };

  const openEditDialog = (work?: RecentWork) => {
    setEditingWork(
      work || {
        id: 0,
        title: "",
        description: "",
        image_url: "",
        work_url: "",
        category: "",
        order_index: recentWork.length + 1,
      }
    );
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Recent Work</h1>
          <p className="text-muted-foreground">
            Manage your recent work highlights
          </p>
        </div>
        <Button onClick={() => openEditDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Work Item
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentWork.map((work) => (
            <Card key={work.id} className="p-4">
              {work.image_url && (
                <img
                  src={work.image_url}
                  alt={work.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="font-semibold mb-2">{work.title}</h3>
              <p className="text-xs text-primary mb-2">{work.category}</p>
              <div
                className="text-sm text-muted-foreground mb-4 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: work.description }}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Order: {work.order_index}
                </span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(work)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(work.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <WorkDialog
        work={editingWork}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingWork(null);
        }}
        onSave={() => {
          fetchRecentWork();
          setIsDialogOpen(false);
          setEditingWork(null);
        }}
      />
    </div>
  );
}

function WorkDialog({
  work,
  isOpen,
  onClose,
  onSave,
}: {
  work: RecentWork | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const [data, setData] = useState<RecentWork | null>(work);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setData(work);
  }, [work]);

  if (!data) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = data.id
        ? `/api/admin/recent-work/${data.id}`
        : "/api/admin/recent-work";
      const method = data.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");

      onSave();
    } catch (error) {
      console.error("Error saving work:", error);
      alert("Failed to save work item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{data.id ? "Edit Work" : "Add Work"}</DialogTitle>
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
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
              placeholder="e.g., Project Management, Design..."
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
            label="Work Image"
            currentImage={data.image_url}
            onImageChange={(url) => setData({ ...data, image_url: url })}
          />

          <div className="space-y-2">
            <Label htmlFor="work_url">URL (optional)</Label>
            <Input
              id="work_url"
              value={data.work_url || ""}
              onChange={(e) => setData({ ...data, work_url: e.target.value })}
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
