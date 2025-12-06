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
  description: "",
  bankName: "",
  accountNo: "",
  ifscCode: "",
  upiId: "",
  upiQrCode: "",
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
        setProfile({ ...defaultProfile, ...data });
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

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Upload failed");
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubmitting(true);
    try {
      const url = await uploadImage(file);
      setProfile((prev) => ({ ...prev, photo: url }));
      toast({ title: "Photo uploaded" });
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    }
    setSubmitting(false);
  };

  const handleUpiQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubmitting(true);
    try {
      const url = await uploadImage(file);
      setProfile((prev) => ({ ...prev, upiQrCode: url }));
      toast({ title: "QR Code uploaded" });
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
    handleUpiQrUpload,
    handleSubmit,
  };
}