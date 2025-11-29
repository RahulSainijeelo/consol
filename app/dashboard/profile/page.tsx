"use client";
import { useProfile } from "./useProfile";
import { ProfileForm } from "./ProfileForm";

const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY!;

export default function Profile() {
  const {
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
  } = useProfile(imgbbApiKey);

  return (
    <ProfileForm
      profile={profile}
      setProfile={setProfile}
      editMode={editMode}
      setEditMode={setEditMode}
      loading={loading}
      submitting={submitting}
      handleChange={handleChange}
      handlePhoneChange={handlePhoneChange}
      handleAddPhone={handleAddPhone}
      handleRemovePhone={handleRemovePhone}
      handlePhotoUpload={handlePhotoUpload}
      handleSubmit={handleSubmit}
    />
  );
}
