import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const[formData, setFormData] = useState({
        fullName: "",
        email:"",
        password:"",
    })

    const {signup, isSigningUp} = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("Full name is required");
    if (!formData.email.trim())
      return toast.error("Email is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  }
    const handleSubmit = (e) => {
        e.preventDefault()

        const success = validateForm()

        if(success === true) signup(formData)
    }
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-blue-100 via-white to-purple-100">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white rounded-xl shadow-2xl p-8 border border-blue-200">
          <div className="flex flex-col items-center space-y-2">
            <MessageSquare className="size-12 text-blue-600 mb-2 drop-shadow-lg" />
            <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
              Create Account
            </h1>
            <p className="text-lg text-purple-500 font-medium">
              Get started with your free account.
            </p>
          </div>
          {/* Form fields go here */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="relative">
              <label className="block mb-2 text-blue-700 font-semibold">
                Full Name
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-blue-400" />
              </div>
              <input
                type="text"
                className="pl-10 py-2 px-4 w-full rounded-lg border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-blue-900 bg-blue-50 placeholder-blue-300"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <label className="block mb-2 text-blue-700 font-semibold">
                Email
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-blue-400" />
              </div>
              <input
                type="email"
                className="pl-10 py-2 px-4 w-full rounded-lg border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-blue-900 bg-blue-50 placeholder-blue-300"
                placeholder="youremail@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <label className="block mb-2 text-purple-700 font-semibold">
                Password
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-purple-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="pl-10 py-2 px-4 w-full rounded-lg border border-purple-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-purple-900 bg-purple-50 placeholder-purple-400"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
            <button
            type="submit"
            className='btn btn-primary w-full'
            disabled={isSigningUp}>
                {isSigningUp ? (
                    <>
                    <Loader2 className="size-5 animate-spin"/>
                    Loading...
                    </>    
            ) : (
                "Create Account"
            )
                }
                </button>                    

          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
            Already have an account? {""}
            <Link to="/login" className='link link-primary'>
            Sign In
            </Link></p>

          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center justify-center bg-white rounded-xl shadow-2xl m-8 p-8 border border-blue-200">
        <AuthImagePattern
          title="Join us"
          subtitle="Connect with others and communicate freely"
        />
      </div>
    </div>
  );
}

export default SignUpPage