"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createEvent } from "@/actions/listing.actions.js";
import { uploadImage } from "@/actions/upload.actions.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

export default function EventForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "", // Event Name
    description: "", // Event Details
    startDate: "", // Use startDate
    endDate: "", // Add endDate
    location: "", // Add location
    category: "", // Add category
    organizer: "", // Add organizer
    imageUrl: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        toast.error("Image must be less than 1MB.");
        return;
      }
      if (
        !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
          file.type
        )
      ) {
        toast.error("Invalid file type. Only JPG, PNG, WEBP, GIF allowed.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, imageUrl: "" }));
      setError("");
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!imageFile) {
      setError("Please upload an image for the event (e.g., Poster).");
      return;
    }
    if (!formData.title || !formData.description || !formData.startDate) {
      setError("Please fill in all required text fields.");
      return;
    }
    try {
      const date = new Date(formData.startDate);
      if (isNaN(date.getTime())) throw new Error("Invalid Start Date");
      if (date < new Date().setHours(0, 0, 0, 0)) {
        setError("Start date cannot be in the past.");
        return;
      }
    } catch (err) {
      setError("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }

    setIsUploading(true);
    const imageFormData = new FormData();
    imageFormData.append("file", imageFile);
    let uploadedImageUrl = "";
    try {
      const uploadResult = await uploadImage(imageFormData);
      if (uploadResult.success && uploadResult.imageUrl) {
        uploadedImageUrl = uploadResult.imageUrl;
        toast.info("Image uploaded successfully.");
      } else {
        throw new Error(uploadResult.message || "Image upload failed.");
      }
    } catch (uploadError) {
      setError(`Image upload failed: ${uploadError.message}`);
      setIsUploading(false);
      return;
    }
    setIsUploading(false);

    startTransition(async () => {
      const eventData = {
        title: formData.title,
        description: formData.description,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate
          ? new Date(formData.endDate)
          : new Date(formData.startDate),
        location: formData.location,
        category: formData.category,
        organizer: formData.organizer,
        images: [uploadedImageUrl],
      };

      try {
        const result = await createEvent(eventData);
        if (result.success) {
          toast.success(result.message || "Event submitted!");
          setFormData({
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            location: "",
            category: "",
            organizer: "",
            imageUrl: "",
          });
          setImageFile(null);
          setImagePreview(null);
          setError("");
        } else {
          setError(result.message || "Event submission failed.");
          toast.error(result.message || "Failed to submit event.");
        }
      } catch (err) {
        setError("An unexpected error occurred during event submission.");
        toast.error("An unexpected error occurred.");
      }
    });
  };

  const isSubmitting = isUploading || isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Image Upload Input */}
      <div className="space-y-2">
        <Label htmlFor="image-event">
          Event Poster/Image (Required, &lt;1MB)
        </Label>
        <Input
          id="image-event"
          name="image"
          type="file"
          accept="image/jpeg, image/png, image/webp, image/gif"
          onChange={handleImageChange}
          required
          className="dark:bg-zinc-700 dark:text-gray-50 dark:border-zinc-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        {imagePreview && (
          <div className="mt-2 relative w-full h-60 border rounded-md overflow-hidden dark:border-zinc-600">
            <Image
              src={imagePreview}
              alt="Image preview"
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}
      </div>

      {/* Event Name */}
      <div className="space-y-2">
        <Label htmlFor="title">Event Name</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Annual Tech Fest 2024"
          required
          disabled={isSubmitting}
          className="dark:bg-zinc-700 dark:text-gray-50 dark:border-zinc-600"
        />
      </div>

      {/* Start Date */}
      <div className="space-y-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          id="startDate"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="dark:bg-zinc-700 dark:text-gray-50 dark:border-zinc-600 dark:[color-scheme:dark]"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* End Date */}
      <div className="space-y-2">
        <Label htmlFor="endDate">End Date (Optional)</Label>
        <Input
          id="endDate"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          disabled={isSubmitting}
          className="dark:bg-zinc-700 dark:text-gray-50 dark:border-zinc-600 dark:[color-scheme:dark]"
          min={formData.startDate || new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., Main Auditorium, NSUT Campus"
          required
          disabled={isSubmitting}
          className="dark:bg-zinc-700 dark:text-gray-50 dark:border-zinc-600"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g., Academic, Cultural, Sports..."
          required
          disabled={isSubmitting}
          className="dark:bg-zinc-700 dark:text-gray-50 dark:border-zinc-600"
        />
      </div>

      {/* Organizer */}
      <div className="space-y-2">
        <Label htmlFor="organizer">Organizer</Label>
        <Input
          id="organizer"
          name="organizer"
          value={formData.organizer}
          onChange={handleChange}
          placeholder="e.g., Computer Society, XYZ Club"
          required
          disabled={isSubmitting}
          className="dark:bg-zinc-700 dark:text-gray-50 dark:border-zinc-600"
        />
      </div>

      {/* Event Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Event Details</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Full details including schedule, purpose, guests, ticket info, contact..."
          required
          rows={5}
          disabled={isSubmitting}
          className="dark:bg-zinc-700 dark:text-gray-50 dark:border-zinc-600"
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading Image...
          </>
        ) : isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Data...
          </>
        ) : (
          "Submit Event for Approval"
        )}
      </Button>
    </form>
  );
}
