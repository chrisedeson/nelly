"use client";
import { toast } from "sonner";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Testimonial {
  id: number;
  client_name: string;
  client_position: string;
  client_company: string;
  testimonial_text: string;
  client_image_url?: string;
  rating: number;
  order_index: number;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials");
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const openEditDialog = (testimonial?: Testimonial) => {
    setEditingTestimonial(
      testimonial || {
        id: 0,
        client_name: "",
        client_position: "",
        client_company: "",
        testimonial_text: "",
        client_image_url: "",
        rating: 5,
        order_index: testimonials.length + 1,
      }
    );
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials</p>
        </div>
        <Button onClick={() => openEditDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {loading ? (
        <div role="status" aria-live="polite">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-4">
              <div className="flex items-start space-x-4 mb-4">
                {testimonial.client_image_url && (
                  <img
                    src={testimonial.client_image_url}
                    alt={testimonial.client_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{testimonial.client_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.client_position} at{" "}
                    {testimonial.client_company}
                  </p>
                </div>
              </div>
              <p className="text-sm mb-4 line-clamp-3">
                {testimonial.testimonial_text}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Order: {testimonial.order_index} | Rating:{" "}
                  {testimonial.rating}/5
                </span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(testimonial)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <TestimonialDialog
        testimonial={editingTestimonial}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingTestimonial(null);
        }}
        onSave={() => {
          fetchTestimonials();
          setIsDialogOpen(false);
          setEditingTestimonial(null);
        }}
      />
    </div>
  );
}

function TestimonialDialog({
  testimonial,
  isOpen,
  onClose,
  onSave,
}: {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const [data, setData] = useState<Testimonial>({
    id: 0,
    client_name: "",
    client_position: "",
    client_company: "",
    testimonial_text: "",
    client_image_url: "",
    rating: 5,
    order_index: 1,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setData({
        id: testimonial.id || 0,
        client_name: testimonial.client_name || "",
        client_position: testimonial.client_position || "",
        client_company: testimonial.client_company || "",
        testimonial_text: testimonial.testimonial_text || "",
        client_image_url: testimonial.client_image_url || "",
        rating: testimonial.rating || 5,
        order_index: testimonial.order_index || 1,
      });
    }
  }, [testimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = data.id
        ? `/api/admin/testimonials/${data.id}`
        : "/api/admin/testimonials";
      const method = data.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");

      onSave();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast.error("Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {data.id ? "Edit Testimonial" : "Add Testimonial"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client_name">Client Name</Label>
            <Input
              id="client_name"
              name="client_name"
              value={data.client_name}
              onChange={(e) =>
                setData({ ...data, client_name: e.target.value })
              }
              required
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_position">Client Position (optional)</Label>
            <Input
              id="client_position"
              name="client_position"
              value={data.client_position}
              onChange={(e) =>
                setData({ ...data, client_position: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_company">Client Company (optional)</Label>
            <Input
              id="client_company"
              name="client_company"
              value={data.client_company}
              onChange={(e) =>
                setData({ ...data, client_company: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="testimonial_text">Testimonial Text</Label>
            <Textarea
              id="testimonial_text"
              name="testimonial_text"
              value={data.testimonial_text}
              onChange={(e) =>
                setData({ ...data, testimonial_text: e.target.value })
              }
              rows={4}
              required
              aria-required="true"
            />
          </div>

          <ImageUpload
            label="Client Image (optional)"
            currentImage={data.client_image_url}
            onImageChange={(url) =>
              setData({ ...data, client_image_url: url })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-5, optional)</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                value={data.rating}
                onChange={(e) =>
                  setData({ ...data, rating: parseInt(e.target.value) || 5 })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order_index">Display Order</Label>
              <Input
                id="order_index"
                name="order_index"
                type="number"
                min="0"
                value={data.order_index}
                onChange={(e) =>
                  setData({ ...data, order_index: parseInt(e.target.value) || 0 })
                }
                required
                aria-required="true"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              aria-label={saving ? "Saving testimonial" : "Save testimonial"}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
