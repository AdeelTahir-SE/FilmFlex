"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Camera } from "lucide-react";

export default function EnhancedProfile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    reservedSeats: [],
  });
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState({ name: false, password: false, image: false });
  const [error, setError] = useState({ name: "", password: "", image: "" });
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) throw new Error("Failed to fetch user data");
        const res = await response.json();
        const data = res.user;
        setUserData({
          name: data.name,
          email: data.email,
          profilePicture: data.profilePicUrl || "",
          reservedSeats: data.reservedSeats || [],
        });
        setNewName(data.name);
        setPreviewImage(data.profilePicUrl || "");
      } catch {
        toast({
          title: "Error",
          description: "Failed to load user data. Please try again.",
          variant: "destructive",
        });
      }
    }
    fetchUserData();
  }, []);

  const handleAttributeChange = async (attribute, info) => {
    setLoading((prev) => ({ ...prev, [attribute]: true }));
    setError((prev) => ({ ...prev, [attribute]: "" }));

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attribute, info }),
      });

      if (!response.ok) throw new Error("Failed to update attribute");

      setUserData((prev) => ({
        ...prev,
        [attribute]: attribute === "name" ? info : prev[attribute],
      }));

      toast({
        title: "Success",
        description: `${attribute.charAt(0).toUpperCase() + attribute.slice(1)} updated successfully.`,
      });

      if (attribute === "name") setNewName(info);
      if (attribute === "password") setNewPassword(info);
    } catch {
      setError((prev) => ({
        ...prev,
        [attribute]: `Failed to update ${attribute}. Please try again.`,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [attribute]: false }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading((prev) => ({ ...prev, image: true }));
      setError((prev) => ({ ...prev, image: "" }));
      setPreviewImage(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("profile_picture", file);

      try {
        const response = await fetch("/api/profilepic", { method: "POST", body: formData });
        const data = await response.json();
        if (response.ok) {
          setUserData((prev) => ({ ...prev, profilePicture: data.url }));
          toast({ title: "Success", description: "Profile picture uploaded successfully." });
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } catch {
        setError((prev) => ({ ...prev, image: "Failed to upload profile picture. Please try again." }));
      } finally {
        setLoading((prev) => ({ ...prev, image: false }));
      }
    }
  };

  return (
    <div className="container mx-auto min-w-full bg-black pt-4">
      <StarsBackground />
      <ShootingStars />
      <Card className="bg-black text-red-800 max-w-lg mx-auto absolute top-24 left-0 right-0 p-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-32 h-32 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <AvatarImage src={previewImage || userData.profilePicture} alt="Profile" />
              <AvatarFallback>
                <Camera className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
            />
            {error.image && <p className="text-red-500 text-sm">{error.image}</p>}
          </div>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-red-800"
            disabled={loading.image}
          >
            {loading.image ? "Uploading..." : "Upload Image"}
          </Button>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Change Name"
              disabled={loading.name}
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
            <Button
              onClick={() => handleAttributeChange("name", newName)}
              className="w-full bg-red-800"
              disabled={loading.name}
            >
              {loading.name ? "Updating..." : "Change Name"}
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Change Password"
              disabled={loading.password}
            />
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
            <Button
              onClick={() => handleAttributeChange("password", newPassword)}
              className="w-full bg-red-800"
              disabled={loading.password}
            >
              {loading.password ? "Updating..." : "Change Password"}
            </Button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Reserved Seats</h2>
            {userData.reservedSeats.length > 0 ? (
              <ul className="list-disc pl-5">
                {userData.reservedSeats.map((seat, index) => (
                  <li key={index} className="mb-1">
                    {seat}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No seats reserved yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
