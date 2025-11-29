"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { StageOne } from "@/components/forms/StageOne";
import { StageTwo } from "@/components/forms/StageTwo";
import { StageThree } from "@/components/forms/StageThree";
import { ConfirmationDialog } from "@/components/forms/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

// Form validation schema (same as create)
const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  author: z.string().min(2, "Author name is required"),
  category: z.string().min(1, "Please select a category"),
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

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const [currentStage, setCurrentStage] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "",
      shortDescription: "",
      images: [],
      content: "",
    },
    mode: "onChange"
  });

  const { trigger, formState: { errors, isValid }, setValue, watch } = form;
  const formData = watch();

  // Load article data on mount
  useEffect(() => {
    const loadArticle = async () => {
      if (!articleId) return;

      try {
        const response = await fetch(`/api/articles/${articleId}`);
        if (!response.ok) {
          throw new Error("Article not found");
        }

        const article = await response.json();
        setValue("title", article.title);
        setValue("author", article.author);
        setValue("category", article.category);
        setValue("shortDescription", article.description);
        setValue("content", article.content);

        if (article.images && article.images.length > 0) {
          const imageObjects = article.images.map((url: string) => ({
            url,
            deleteUrl: ""
          }));
          setValue("images", imageObjects);
        }

      } catch (error) {
        console.error("Error loading article:", error);
        toast({
          title: "Error",
          description: "Failed to load article. Redirecting to articles list.",
          variant: "destructive",
        });
        // router.push("/dashboard/articles");
      } finally {
        setInitialLoading(false);
      }
    };

    loadArticle();
  }, [articleId, setValue, router]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof ArticleFormData, value);
  };

  // Handle select changes
  const handleSelectChange = (value: string) => {
    setValue("category", value);
  };

  // Handle image upload with ImgBB API (same as create)
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

  // Handle image removal (same as create)
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

  // Main form submission handler - UPDATE article
  const handleUpdate = async () => {
    setLoading(true);

    try {

      const response = await fetch(`/api/articles`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: articleId,
          title: formData.title,
          author: formData.author,
          category: formData.category,
          description: formData.shortDescription,
          content: formData.content,
          images: formData.images?.map(img => img.url) || [],
          updatedAt: new Date().toISOString(),
        })
      });

      if (response.ok) {
        const result = await response.json();

        toast({
          title: "Success!",
          description: "Article has been updated successfully",
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);

      } else {
        throw new Error("Failed to update article");
      }

    } catch (error) {
      console.error("Error updating article:", error);
      toast({
        title: "Error",
        description: "Error updating article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stages = [
    { number: 1, title: "Article Details", description: "Basic information about the article" },
    { number: 2, title: "Content", description: "Edit your article content" },
    { number: 3, title: "Review", description: "Review and update your article" }
  ];

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 !pt-5 pb-12">
        <div className="max-w-4xl mx-auto">

          {/* Back Button */}
          <Link
            href="/dashboard/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-1"
          >
            <ArrowLeft size={16} />
            Back to Articles
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Article</h1>
            <p className="text-gray-600">Update your article content</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              {stages.map((stage, index) => (
                <div key={stage.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStage >= stage.number
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
                    <div className={`font-medium ${currentStage >= stage.number ? 'text-orange-600' : 'text-gray-500'
                      }`}>
                      {stage.title}
                    </div>
                    <div className="text-sm text-gray-500">{stage.description}</div>
                  </div>
                  {index < stages.length - 1 && (
                    <div className={`hidden md:block w-24 h-0.5 mx-4 ${currentStage > stage.number ? 'bg-orange-500' : 'bg-gray-300'
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content - Same components as create */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">

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
                  onClick={handleUpdate}
                  disabled={loading}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Updating..." : "Update Article"}
                  <Check size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
