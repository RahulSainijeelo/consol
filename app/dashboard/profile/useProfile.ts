import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

const defaultProfile = {
  name: "",
  bio: "",
  photo: "",
  phoneNumbers: [""],
  email: "",
  address: "",
  whatsapp: "",
  experience: "",
  workingHours: "",
};

export function useProfile(imgbbApiKey: string) {
  const [profile, setProfile] = useState({ ...defaultProfile });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProfile(data);
      } catch {
        setProfile({ ...defaultProfile });
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneChange = (idx: number, value: string) => {
    setProfile((prev) => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.map((p, i) => (i === idx ? value : p)),
    }));
  };

  const handleAddPhone = () => {
    setProfile((prev) => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, ""],
    }));
  };

  const handleRemovePhone = (idx: number) => {
    setProfile((prev) => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== idx),
    }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setSubmitting(true);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setProfile((prev) => ({ ...prev, photo: data.data.url }));
        toast({ title: "Photo uploaded" });
      } else {
        toast({ title: "Upload failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    }
    setSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Profile updated" });
      setEditMode(false);
    } catch {
      toast({ title: "Update failed", variant: "destructive" });
    }
    setSubmitting(false);
  };

  return {
    profile,
    setProfile,
    editMode,
    setEditMode,
    loading,
    submitting,
    handleChange,
    handlePhoneChange,
    handleAddPhone,
    handleRemovePhone,
    handlePhotoUpload,
    handleSubmit,
  };
}