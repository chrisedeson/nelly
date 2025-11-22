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
import { Plus, Pencil, Trash2, Sparkles } from "lucide-react";
import { getToolLogo, getToolCategory } from "@/lib/toolLogos";

interface CompanyLogo {
  id: number;
  company_name: string;
  logo_url: string;
  order_index: number;
}

function LogoImage({ logo }: { logo: CompanyLogo }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate a consistent gradient based on company name
  const getGradientColors = (name: string) => {
    const gradients = [
      ['#667eea', '#764ba2'], // Purple
      ['#f093fb', '#f5576c'], // Pink
      ['#4facfe', '#00f2fe'], // Blue
      ['#43e97b', '#38f9d7'], // Green
      ['#fa709a', '#fee140'], // Orange
      ['#30cfd0', '#330867'], // Teal
      ['#a8edea', '#fed6e3'], // Pastel
      ['#ff9a9e', '#fecfef'], // Rose
      ['#ffecd2', '#fcb69f'], // Peach
      ['#ff6e7f', '#bfe9ff'], // Sunset
    ];

    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };

  const [color1, color2] = getGradientColors(logo.company_name);

  return (
    <div className="aspect-square mb-4 flex items-center justify-center rounded-lg overflow-hidden relative">
      {/* Animated gradient fallback */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          backgroundImage: `linear-gradient(135deg, ${color1}, ${color2})`,
          backgroundSize: '200% 200%',
        }}
      >
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-2xl opacity-80">
              {logo.company_name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Actual image */}
      {!imageError && (
        <img
          src={logo.logo_url}
          alt={logo.company_name}
          className={`relative z-10 max-w-full max-h-full object-contain p-4 bg-white dark:bg-gray-900 rounded-lg transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}

      {/* Show gradient with company initial when image fails */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-4xl drop-shadow-lg">
            {logo.company_name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
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
        order_index: logos.length > 0 ? logos.length + 1 : 1,
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
        <div role="status" aria-live="polite">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {logos.map((logo) => (
            <Card key={logo.id} className="p-4">
              <LogoImage logo={logo} />
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
                    aria-label={`Edit ${logo.company_name} logo`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(logo.id)}
                    aria-label={`Delete ${logo.company_name} logo`}
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
  const [data, setData] = useState<CompanyLogo>({
    id: 0,
    company_name: "",
    logo_url: "",
    order_index: 1,
  });
  const [saving, setSaving] = useState(false);
  const [suggestedLogo, setSuggestedLogo] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    if (logo) {
      setData({
        id: logo.id || 0,
        company_name: logo.company_name || "",
        logo_url: logo.logo_url || "",
        order_index: logo.order_index || 1,
      });
      if (logo.company_name) {
        const logoUrl = getToolLogo(logo.company_name);
        const cat = getToolCategory(logo.company_name);
        setSuggestedLogo(logoUrl);
        setCategory(cat);
      }
    }
  }, [logo]);

  const handleCompanyNameChange = (name: string) => {
    setData({ ...data, company_name: name });

    // Auto-detect logo and category
    const logoUrl = getToolLogo(name);
    const cat = getToolCategory(name);
    setSuggestedLogo(logoUrl);
    setCategory(cat);
  };

  const handleAutoFill = () => {
    if (suggestedLogo) {
      setData({ ...data, logo_url: suggestedLogo });
      toast.success("Logo URL auto-filled from Clearbit!");
    } else {
      toast.error("No logo found for this company");
    }
  };

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

      toast.success("Logo saved successfully!");
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{data.id ? "Edit Logo" : "Add Logo"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="company_name">Company/Tool Name</Label>
              {category && category !== "Other" && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {category}
                </span>
              )}
            </div>
            <Input
              id="company_name"
              name="company_name"
              value={data.company_name}
              onChange={(e) => handleCompanyNameChange(e.target.value)}
              placeholder="e.g., Figma, Jira, Stripe, Dropbox..."
              required
              aria-required="true"
            />
            {suggestedLogo && !data.logo_url && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
                <img
                  src={suggestedLogo}
                  alt="Suggested logo"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100">Logo detected!</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Click to use this logo from Clearbit</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAutoFill}
                  className="shrink-0"
                  aria-label="Auto-fill logo from Clearbit"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  Use This
                </Button>
              </div>
            )}
          </div>

          <ImageUpload
            label="Company Logo"
            currentImage={data.logo_url}
            onImageChange={(url) => setData({ ...data, logo_url: url })}
          />

          {!data.logo_url && (
            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              <p className="font-medium mb-1">💡 Pro tip:</p>
              <p>Type a company or tool name above to automatically fetch its logo from Clearbit. You can also manually upload a logo if auto-detection doesn't work.</p>
            </div>
          )}

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

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              aria-label={saving ? "Saving company logo" : "Save company logo"}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
