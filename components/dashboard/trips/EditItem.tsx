import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import "./AddItem.css"; // Assuming you have some styles for this component
interface EditItemProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleEditItem: () => void;
  formData: {
    title: string;
    category: string;
    description: string;
    images: { url: string; deleteUrl: string }[];
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  imgbbApiKey: string;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (value: string) => void;
  categories: string[];
  loading: boolean;
}

const EditItem: React.FC<EditItemProps> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  handleEditItem,
  formData,
  setFormData,
  imgbbApiKey,
  handleInputChange,
  handleSelectChange,
  categories,
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;

    setUploading(true);

    const uploadedImages: { url: string; deleteUrl: string }[] = [];
    for (const file of Array.from(files)) {
      const formDataImg = new FormData();
      formDataImg.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formDataImg,
        }
      );
      const data = await res.json();
      if (data.success) {
        uploadedImages.push({
          url: data.data.url,
          deleteUrl: data.data.delete_url,
        });
      }
    }

    setFormData((prev: any) => ({
      ...prev,
      images: [...(prev.images || []), ...uploadedImages],
    }));

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = async (idx: number) => {
    const image = formData.images[idx];
    if (image?.deleteUrl) {
      await fetch(image.deleteUrl, { method: "GET" });
    }
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== idx),
    }));
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-md responsive-portfolio-modal">
        <DialogHeader>
          <DialogTitle>Edit Portfolio Item</DialogTitle>
          <DialogDescription>
            Update the details of your portfolio item.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Project Title</Label>
            <Input
              id="edit-title"
              name="title"
              placeholder="Enter project title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger id="edit-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              name="description"
              placeholder="Describe this project"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Images</Label>
            {/* Images Gallery */}
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.images?.map(
                (img: { url: string; deleteUrl: string }, idx: number) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 rounded overflow-hidden border"
                  >
                    <Image
                      src={img.url}
                      alt={`Portfolio preview ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white"
                      onClick={() => handleRemoveImage(idx)}
                      title="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )
              )}
            </div>
            {/* Plus button for adding images */}
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageChange}
                disabled={uploading}
                className="hidden"
                id="edit-image-input"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2"
              >
                <Plus size={18} />
                Add Image
              </Button>
              {uploading && (
                <span className="ml-2 text-xs text-blue-500">Uploading...</span>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleEditItem}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditItem;
