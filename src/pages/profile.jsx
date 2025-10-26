import { useAuthStore } from "@/store/useAuthStore"
import { CameraIcon, Mail, User } from "lucide-react"
import { useState } from "react"

const Profile = () => {
    const { authUser, isUpdatingProfile, Updateprofile } = useAuthStore()
    const [selectedimage,setSelectedimage] = useState(null)
    const handleImage = async (e) => {
          const file = e.target.files[0];
          if(!file) return;

          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
              const base64Image = reader.result;
              console.log(base64Image);
              setSelectedimage(base64Image);
              await Updateprofile(base64Image);
              
          }
    }
    return (
        <div className="min-h-screen pt-20 bg-primary ">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-[#02050a98] rounded-xl p-6 sm:p-8 space-y-8">
                    {/* Header */}
                    <div className="flex flex-col items-center justify-center gap-1 text-center">
                        <h1 className="text-2xl sm:text-3xl text-[#E2E8F0] font-semibold tracking-wide">
                            Profile
                        </h1>
                        <h2 className="text-[15px] sm:text-[17px] text-white tracking-wider">
                            Your Profile Information
                        </h2>
                    </div>

                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={selectedimage || authUser?.pic || "/avatar.png"}
                                alt="profile"
                                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white"
                            />
                            <label
                                htmlFor="avatar"
                                className={`absolute bottom-1 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer ${isUpdatingProfile && "animate-pulse"
                                    }`}
                            >
                                <CameraIcon className="text-blue-700 w-5 h-5" />
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                                className="hidden"
                                id="avatar"
                                disabled={isUpdatingProfile}
                            />
                        </div>
                        <p className="text-zinc-300 text-sm text-center px-3">
                            {isUpdatingProfile
                                ? "Updating..."
                                : "Click the camera icon to update your photo"}
                        </p>
                    </div>

                    {/* Info Section */}
                    <div className="space-y-6">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <div className="text-[#d4f4fa] tracking-wider text-sm sm:text-[17px] flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Full Name
                            </div>
                            <p className="px-2 md:px-4 py-2.5 bg-[#141313fa] rounded-lg border text-blue-100 break-all">
                                {authUser?.fullname}
                            </p>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <div className="text-[#d4f4fa]  tracking-wider text-sm sm:text-[17px] flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email address
                            </div>
                            <p className=" px-2 md:px-4 py-2.5 bg-[#141313fa] rounded-lg border text-blue-100 break-all">
                                {authUser?.email}
                            </p>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="mt-6 sm:mx-4 bg-[#141313fa] rounded-xl p-4 sm:p-6">
                        <h2 className="text-lg font-medium mb-2 md:mb-4 text-white text-center sm:text-left">
                            Account Information
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex  items-center justify-between py-2 border-b border-gray-200 gap-1 sm:gap-0 text-center sm:text-left">
                                <span className="text-amber-50">Member Since</span>
                                <span className="text-amber-200">
                                    {authUser.createdAt?.split("T")[0]}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-200 gap-1 sm:gap-0 text-center sm:text-left">
                                <span className="text-amber-50">Account Status</span>
                                <span className="text-green-600">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile