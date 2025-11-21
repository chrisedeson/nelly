"use client";
import { toast } from "sonner";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  label: string;
  currentImage?: string | null;
  onImageChange: (url: string) => void;
  accept?: string;
}

export function ImageUpload({
  label,
  currentImage,
  onImageChange,
  accept = "image/*",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || "");
  const inputId = `image-upload-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setPreview(data.url);
      onImageChange(data.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onImageChange("");
    toast.success("Image removed");
  };

  return (
    <div className="space-y-2" role="group" aria-labelledby={`${inputId}-label`}>
      <Label id={`${inputId}-label`} htmlFor={inputId}>{label}</Label>
      {preview ? (
        <div className="relative inline-block">
          <Image
            src={preview}
            alt={`${label} preview`}
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2"
            onClick={handleRemove}
            aria-label={`Remove ${label.toLowerCase()}`}
          >
            <X className="h-4 w-4" aria-hidden="true" focusable="false" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Input
            id={inputId}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
            className="max-w-xs"
            aria-label={`Upload ${label.toLowerCase()}`}
            aria-describedby={uploading ? `${inputId}-status` : undefined}
          />
          {uploading && (
            <span
              id={`${inputId}-status`}
              className="text-sm text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              Uploading...
            </span>
          )}
        </div>
      )}
    </div>
  );
}
