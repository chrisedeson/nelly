"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface SocialLink {
  id: number;
  platform_name: string;
  platform_url: string;
  icon_name: string;
  order_index: number;
}

export default function SocialPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch("/api/admin/social");
      const data = await response.json();
      setSocialLinks(data);
    } catch (error) {
      console.error("Error fetching social links:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this social link?")) return;

    try {
      await fetch(`/api/admin/social/${id}`, { method: "DELETE" });
      fetchSocialLinks();
    } catch (error) {
      console.error("Error deleting social link:", error);
    }
  };

  const openEditDialog = (link?: SocialLink) => {
    setEditingLink(
      link || {
        id: 0,
        platform_name: "",
        platform_url: "",
        icon_name: "",
        order_index: socialLinks.length + 1,
      }
    );
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Social Links</h1>
          <p className="text-muted-foreground">Manage your social media profiles</p>
        </div>
        <Button onClick={() => openEditDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Social Link
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialLinks.map((link) => (
            <Card key={link.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{link.platform_name}</h3>
                <span className="text-xs text-muted-foreground">
                  Order: {link.order_index}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2 truncate">
                {link.platform_url}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Icon: {link.icon_name}
              </p>
              <div className="flex justify-end space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditDialog(link)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(link.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <SocialDialog
        link={editingLink}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingLink(null);
        }}
        onSave={() => {
          fetchSocialLinks();
          setIsDialogOpen(false);
          setEditingLink(null);
        }}
      />
    </div>
  );
}

function SocialDialog({
  link,
  isOpen,
  onClose,
  onSave,
}: {
  link: SocialLink | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const [data, setData] = useState<SocialLink | null>(link);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setData(link);
  }, [link]);

  if (!data) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = data.id ? `/api/admin/social/${data.id}` : "/api/admin/social";
      const method = data.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");

      onSave();
    } catch (error) {
      console.error("Error saving social link:", error);
      alert("Failed to save social link");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {data.id ? "Edit Social Link" : "Add Social Link"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform_name">Platform Name</Label>
            <Input
              id="platform_name"
              value={data.platform_name}
              onChange={(e) =>
                setData({ ...data, platform_name: e.target.value })
              }
              placeholder="e.g., LinkedIn, Twitter, GitHub..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform_url">URL</Label>
            <Input
              id="platform_url"
              value={data.platform_url}
              onChange={(e) =>
                setData({ ...data, platform_url: e.target.value })
              }
              placeholder="https://..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon_name">
              Icon Name (Lucide icon name)
            </Label>
            <Input
              id="icon_name"
              value={data.icon_name}
              onChange={(e) =>
                setData({ ...data, icon_name: e.target.value })
              }
              placeholder="e.g., Linkedin, Twitter, Github..."
              required
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
