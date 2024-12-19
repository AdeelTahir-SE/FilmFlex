"use client"
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from '@/hooks/use-toast'
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"
import { Camera } from 'lucide-react'

export default function EnhancedProfile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profilePicture: '',
    reservedSeats: [],
  })
  const [newPassword, setNewPassword] = useState('')
  const [newName, setNewName] = useState('')
  const [newProfilePicture, setNewProfilePicture] = useState(null)
  const [previewImage, setPreviewImage] = useState('') // Added preview image state
  const fileInputRef = useRef(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/user')
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const data = await response.json()
        setUserData(data)
        setNewName(data.name)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load user data. Please try again.",
          variant: "destructive",
        })
      }
    }
    fetchUserData()
  }, [toast])

  const handlePasswordChange = async () => {
    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }
    try {
      toast({
        title: "Success",
        description: "Password changed successfully.",
      })
      setNewPassword('')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleNameChange = async () => {
    if (newName.trim() === '') {
      toast({
        title: "Error",
        description: "Name cannot be empty.",
        variant: "destructive",
      })
      return
    }
    try {
      setUserData(prev => ({ ...prev, name: newName }))
      toast({
        title: "Success",
        description: "Name changed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change name. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleProfilePictureUpload = async () => {
    alert(newProfilePicture)
    if (!newProfilePicture) {
      toast({
        title: "Error",
        description: "Please select an image to upload.",
        variant: "destructive",
      })
      return
    }
    try {
      const imageUrl = URL.createObjectURL(newProfilePicture)
      console.log(newProfilePicture)
      console.log(imageUrl);
      setUserData(prev => ({ ...prev, profilePicture: imageUrl }))
      toast({
        title: "Success",
        description: "Profile picture uploaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload profile picture. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewProfilePicture(file)
      const previewUrl = URL.createObjectURL(file)
      setPreviewImage(previewUrl) // Set the preview image
    }
  }

  return (
    <div className="container mx-auto min-w-full bg-black pt-4  ">
              <StarsBackground />

      <ShootingStars />
      <Card className="bg-black text-red-800 max-w-lg mx-auto absolute top-24 left-0 right-0  p-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-32 h-32 cursor-pointer" onClick={handleImageClick}>
              {/* Show preview image if available */}
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
            <Button className="mt-4 bg-red-800 hover:cursor-pointer" onClick={handleProfilePictureUpload}>
              Upload Profile Picture
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Change Name"
            />
            <Button onClick={handleNameChange} className="w-full bg-red-800">
              Change Name
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
            />
            <Button onClick={handlePasswordChange} className="w-full bg-red-800">
              Change Password
            </Button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Reserved Seats</h2>
            {userData.reservedSeats.length > 0 ? (
              <ul className="list-disc pl-5">
                {userData.reservedSeats.map((seat, index) => (
                  <li key={index} className="mb-1">{seat}</li>
                ))}
              </ul>
            ) : (
              <p>No seats reserved yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

   
    </div>
  )
}
