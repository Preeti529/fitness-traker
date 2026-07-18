





import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
//import { useAppContext } from "../context/AppContext";

import { useAppContext } from "../context/AppContext";
//import { Toaster } from "react-hot-toast";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
//const { login } = useAppContext();
const LoginPage = () => {

  const [state, setState] = useState<"login" | "signup">("login")
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const { login, signup } = useAppContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  if (state === "signup" && password.length < 6) {
    toast.error("Password must be at least 6 characters")
    return
  }

  setIsSubmitting(true)
  
  try {
    if (state === "login") {
      //await login({ email, password })
      //   //  REAL LOGIN
     await login({ email, password })
     //await login({ identifier: email, password })
navigate("/dashboard")
      alert("Login successful ✅")
      navigate("/dashboard") //  REDIRECT
    } else {
      await signup({ username, email, password }) //  REAL SIGNUP
      alert("Signup successful ✅")

      setState("login")
      setUsername("")
      setEmail("")
      setPassword("")
    }

  } catch (error) {
    console.log(error)
    alert("Something went wrong ❌")
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <>
    <Toaster />
    <main className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >

        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          {state === 'login' ? "Sign In" : "Sign up"}
        </h2>

        <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {state === 'login'
            ? 'Please enter email and password to login'
            : 'Please enter your details to create an account'}
        </p>

        {/* Username */}
        {state !== 'login' && (
          <div className="relative mt-4">
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Username
            </label>

            <div className="relative mt-2">
              <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Enter a username"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div className="relative mt-4">
          <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
            Email
          </label>

          <div className="relative mt-2">
            <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="relative mt-4">
          <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
            Password
          </label>

          <div className="relative mt-2">
            <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button" // IMPORTANT (prevents submit)
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full mt-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50"
        >
          {isSubmitting 
            ? state === "login" 
              ? "Logging in..." 
              : "Creating account..." 
            : state === "login" 
              ? "Login" 
              : "Sign up"}
        </button>

        {/* Toggle */}
        {state === 'login' ? (
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Don't have an account?
            <button 
              type="button" // ✅ IMPORTANT
              onClick={() => setState('signup')}
              className="ml-1 text-green-600 hover:underline"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?
            <button
              type="button" // ✅ IMPORTANT
              onClick={() => setState('login')}
              className="ml-1 text-green-600 hover:underline"
            >
              Login
            </button>
          </p>
        )}

      </form>
    </main>
    </>
  )
}

export default LoginPage


