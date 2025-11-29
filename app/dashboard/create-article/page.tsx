"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { StageOne } from "@/components/forms/StageOne";
import { StageTwo } from "@/components/forms/StageTwo";
import { StageThree } from "@/components/forms/StageThree";
import { ConfirmationDialog } from "@/components/forms/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

// Form validation schema
const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  author: z.string().min(2, "Author name is required"),
  category: z.string().min(1, "Please select a category"),
  preference: z.string().min(1, "Please select a category"),
  shortDescription: z.string().min(10, "Description must be at least 10 characters").max(200, "Description too long"),
  images: z.array(z.object({
    url: z.string(),
    deleteUrl: z.string()
  })).optional(),
  content: z.string().min(50, "Article content must be at least 50 characters"),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const newsCategories = [
  "Politics",
  "Dharm",
  "Bharat",
  "Global",
  "History",
];

const preferences = [
  "Top Picks",
  "Editors Choice",
  "Specials",
  "none"
]

export default function CreateArticlePage() {
  const [currentStage, setCurrentStage] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "",
      preference:"",
      shortDescription: "",
      images: [],
      content: "",
    },
    mode: "onChange"
  });

  const { trigger, formState: { errors, isValid }, setValue, watch } = form;
  const formData = watch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof ArticleFormData, value);
  };

  const handleSelectChange = (value: string) => {
    setValue("category", value);
  };

    const handlePreferenceChange = (value: string) => {
    setValue("preference", value);
  };

  // Handle image upload with ImgBB API
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;

    setUploading(true);

    const uploadedImages: { url: string; deleteUrl: string }[] = [];
    for (const file of Array.from(files)) {
      try {
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
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setValue("images", [...(formData.images || []), ...uploadedImages]);
    setUploading(false);
    
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = async (idx: number) => {
    const currentImages = formData.images || [];
    const image = currentImages[idx];
    
    if (image?.deleteUrl) {
      try {
        await fetch("/api/delete-imgbb", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deleteUrl: image.deleteUrl }),
        });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
    
    setValue("images", currentImages.filter((_, i) => i !== idx));
  };

  // Handle next stage
  const handleNext = async () => {
    let fieldsToValidate: (keyof ArticleFormData)[] = [];
    
    if (currentStage === 1) {
      fieldsToValidate = ["title", "author", "category", "shortDescription"];
    } else if (currentStage === 2) {
      fieldsToValidate = ["content"];
    }
    
    const isStageValid = await trigger(fieldsToValidate);
    
    if (isStageValid) {
      setCurrentStage(prev => prev + 1);
    }
  };

  // Handle previous stage
  const handlePrevious = () => {
    setCurrentStage(prev => prev - 1);
  };

  // Main form submission handler - ONLY called when user clicks publish
  const handlePublish = async () => {
    setLoading(true);
    try {
      const body = {
          title: formData.title,
          author: formData.author,
          category: formData.category,
          preference:formData.preference,
          description: formData.shortDescription,
          content: formData.content,
          images: formData.images || [],
          publishDate: new Date().toISOString(),
        }

      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      
      if (response.ok) {
        const result = await response.json();
        setShowConfirmation(true);
        
        // Reset form
        form.reset();
        setCurrentStage(1);
      } else {
        throw new Error("Failed to create article");
      }
      
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("Error creating article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stages = [
    { number: 1, title: "Article Details", description: "Basic information about the article" },
    { number: 2, title: "Content", description: "Write your article content" },
    { number: 3, title: "Review", description: "Review and submit your article" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">      
      <div className="container mx-auto !px-4 !pt-5 !pb-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create News Article</h1>
            <p className="text-gray-600">Share breaking news with your readers</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {stages.map((stage, index) => (
                <div key={stage.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    currentStage >= stage.number 
                      ? 'bg-orange-500 border-orange-500 text-white' 
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {currentStage > stage.number ? (
                      <Check size={20} />
                    ) : (
                      <span className="font-semibold">{stage.number}</span>
                    )}
                  </div>
                  <div className="ml-3 text-left hidden md:block">
                    <div className={`font-medium ${
                      currentStage >= stage.number ? 'text-orange-600' : 'text-gray-500'
                    }`}>
                      {stage.title}
                    </div>
                    <div className="text-sm text-gray-500">{stage.description}</div>
                  </div>
                  {index < stages.length - 1 && (
                    <div className={`hidden md:block w-24 h-0.5 mx-4 ${
                      currentStage > stage.number ? 'bg-orange-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content - Removed onSubmit from form tag */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-5">
              
              {currentStage === 1 && (
                <StageOne 
                  form={form}
                  errors={errors}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                  handleImageUpload={handleImageUpload}
                  handleRemoveImage={handleRemoveImage}
                  uploading={uploading}
                  fileInputRef={fileInputRef}
                  categories={newsCategories}
                  preferences={preferences}
                  handlePreferencSelect={handlePreferenceChange}
                />
              )}
              
              {currentStage === 2 && (
                <StageTwo 
                  form={form} 
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
              )}
              
              {currentStage === 3 && (
                <StageThree formData={formData} />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pb-4">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStage === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Previous
              </Button>

              {currentStage < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handlePublish}
                  disabled={loading}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Publishing..." : "Publish Article"}
                  <Check size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog 
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        articleTitle={formData.title || ""}
      />
    </div>
  );
}
