import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil } from "lucide-react";

export function ProfileForm({
  profile,
  editMode,
  setEditMode,
  submitting,
  loading,
  handleChange,
  handlePhoneChange,
  handleAddPhone,
  handleRemovePhone,
  handlePhotoUpload,
  handleSubmit,
}: any) {
  if (loading) {
    return (
      <Card className="max-w-xl mx-auto mt-8">
        <CardContent className="space-y-4 pt-8">
          <Skeleton className="h-32 w-32 rounded-full mx-auto" />
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-1/3 mx-auto" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto mt-8 relative">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Profile</CardTitle>
        {!editMode && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setEditMode(true)}
            aria-label="Edit Profile"
          >
            <Pencil className="h-5 w-5" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img
                src={profile.photo || "/placeholder-profile.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
              />
              {editMode && (
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={submitting}
                  className="absolute left-0 right-0 bottom-0 mx-auto mt-2"
                  style={{ width: "80%" }}
                />
              )}
            </div>
            <h2 className="text-2xl font-bold mt-2">{profile.name}</h2>
            <p className="text-gray-600 text-center">{profile.bio}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div>
              <Label>WhatsApp</Label>
              <Input
                name="whatsapp"
                value={profile.whatsapp}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Bio</Label>
              <Textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={profile.description}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div>
              <Label>Working Hours</Label>
              <Input
                name="workingHours"
                value={profile.workingHours}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Phone Numbers</Label>
              {profile.phoneNumbers.map((phone: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 mb-1">
                  <Input
                    value={phone}
                    onChange={(e) => handlePhoneChange(idx, e.target.value)}
                    disabled={!editMode}
                  />
                  {editMode && (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemovePhone(idx)}
                        disabled={profile.phoneNumbers.length === 1}
                      >
                        -
                      </Button>
                      {idx === profile.phoneNumbers.length - 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={handleAddPhone}
                        >
                          +
                        </Button>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <div className="flex justify-end gap-2 mt-4">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditMode(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
