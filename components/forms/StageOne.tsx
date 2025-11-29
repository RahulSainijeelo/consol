// components/forms/StageOne.tsx
import { UseFormReturn, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import Image from "next/image";

interface StageOneProps {
  form: any;
  errors: any;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (value: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (idx: number) => void;
  uploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  categories: string[];
  handlePreferencSelect?: any; // Make optional
  preferences?: string[];                                           // Make optional
}

export function StageOne({ 
  form, 
  errors, 
  formData, 
  handleInputChange,
  handleSelectChange,
  handleImageUpload,
  handleRemoveImage,
  uploading,
  fileInputRef,
  categories,
  handlePreferencSelect, // Optional
  preferences = []       // Optional with default
}: StageOneProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Article Details</h2>
      
      {/* Title */}
      <div>
        <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Article Title *
        </Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter a compelling headline..."
          className="w-full"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Author and Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
            Author *
          </Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Author name"
            className="w-full"
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </Label>
          <Select value={formData.category} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>
        {handlePreferencSelect && (
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Article Location
            </Label>
            <Select value={formData.preference || ""} onValueChange={handlePreferencSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Preference" />
              </SelectTrigger>
              <SelectContent>
                {preferences.map((preference) => (
                  <SelectItem key={preference} value={preference}>
                    {preference}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.preference && (
              <p className="mt-1 text-sm text-red-600">{errors.preference.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Featured Images */}
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          Article Images
        </Label>
        <div className="flex flex-wrap gap-2 mb-4">
          {formData.images?.map((img: any, idx: number) => (
            <div
              key={idx}
              className="relative w-24 h-24 rounded overflow-hidden border hover:border-red-300 transition-colors"
            >
              <Image
                src={img.url.url||img.url}
                alt={`Article image ${idx + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 rounded-full p-1 text-white transition-colors"
                onClick={() => handleRemoveImage(idx)}
                title="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Image Button */}
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
            id="add-image-input"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Add Images
          </Button>
          {uploading && (
            <span className="ml-2 text-xs text-blue-500">Uploading images...</span>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          You can upload multiple images. First image will be used as featured image.
        </p>
      </div>

      {/* Short Description */}
      <div>
        <Label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
          Short Description *
        </Label>
        <Textarea
          id="shortDescription"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleInputChange}
          placeholder="Write a brief description that will appear in article previews..."
          className="w-full h-24 resize-none"
          maxLength={200}
        />
        <div className="flex justify-between mt-1">
          <div>
            {errors.shortDescription && (
              <p className="text-sm text-red-600">{errors.shortDescription.message}</p>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {formData.shortDescription?.length || 0}/200
          </p>
        </div>
      </div>
    </div>
  );
}
