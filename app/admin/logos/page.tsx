"use client";
import { toast } from "sonner";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface CompanyLogo {
  id: number;
  company_name: string;
  logo_url: string;
  order_index: number;
}

export default function LogosPage() {
  const [logos, setLogos] = useState<CompanyLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLogo, setEditingLogo] = useState<CompanyLogo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const response = await fetch("/api/admin/logos");
      const data = await response.json();
      setLogos(data);
    } catch (error) {
      console.error("Error fetching logos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this logo?")) return;

    try {
      await fetch(`/api/admin/logos/${id}`, { method: "DELETE" });
      fetchLogos();
    } catch (error) {
      console.error("Error deleting logo:", error);
    }
  };

  const openEditDialog = (logo?: CompanyLogo) => {
    setEditingLogo(
      logo || {
        id: 0,
        company_name: "",
        logo_url: "",
        order_index: logos.length + 1,
      }
    );
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Company Logos</h1>
          <p className="text-muted-foreground">
            Add logos of companies you've worked with
          </p>
        </div>
        <Button onClick={() => openEditDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Logo
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {logos.map((logo) => (
            <Card key={logo.id} className="p-4">
              <div className="aspect-square mb-4 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={logo.logo_url}
                  alt={logo.company_name}
                  className="max-w-full max-h-full object-contain p-4"
                />
              </div>
              <h3 className="font-semibold text-center mb-2">
                {logo.company_name}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Order: {logo.order_index}
                </span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(logo)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(logo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <LogoDialog
        logo={editingLogo}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingLogo(null);
        }}
        onSave={() => {
          fetchLogos();
          setIsDialogOpen(false);
          setEditingLogo(null);
        }}
      />
    </div>
  );
}

function LogoDialog({
  logo,
  isOpen,
  onClose,
  onSave,
}: {
  logo: CompanyLogo | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const [data, setData] = useState<CompanyLogo | null>(logo);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setData(logo);
  }, [logo]);

  if (!data) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = data.id ? `/api/admin/logos/${data.id}` : "/api/admin/logos";
      const method = data.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");

      onSave();
    } catch (error) {
      console.error("Error saving logo:", error);
      toast.error("Failed to save logo");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.id ? "Edit Logo" : "Add Logo"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name</Label>
            <Input
              id="company_name"
              value={data.company_name}
              onChange={(e) =>
                setData({ ...data, company_name: e.target.value })
              }
              required
            />
          </div>

          <ImageUpload
            label="Company Logo"
            currentImage={data.logo_url}
            onImageChange={(url) => setData({ ...data, logo_url: url })}
          />

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
