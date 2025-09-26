"use client";
import Button from "@/app/components/ui/button";
import { useSetParams } from "@/app/hooks/useSetParams";
import SignInButton from "../SignInButton";
import { UseAuthForm } from "../useAuthForm";

export default function AuthForm() {
  const { navigate, searchParams } = useSetParams();
  const pathname = searchParams.get("from") || "";
  const { formData, handleChange, isLoading, errors, handleRegister } =
    UseAuthForm();

  return (
    <div className="glass-card md:p-8 p-4 rounded-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold gradient-text">Register</h1>
        <p className="mt-2 text-sm text-white/60">
          Create an account to get started
        </p>
      </div>

      {/* Error message */}
      {errors.general && (
        <div className="mb-6 p-3 bg-red-900/30 border border-red-700 rounded-lg text-center">
          <p className="text-red-400 text-sm">{errors.general}</p>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleRegister}>
        <div>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="form-input"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
          />

          {errors.username && (
            <p className="text-red-400 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <label htmlFor="username" className="form-label">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="form-input"
            placeholder="Please fill in your name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="form-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className="form-input"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            className="h-4 w-4 rounded bg-white/5 border-white/20 text-primary-500 focus:ring-primary-500"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />

          <label
            htmlFor="agreeToTerms"
            className="ml-2 block text-sm text-white/70"
          >
            I agree to the
            <a
              href="/terms"
              className="text-primary-400 hover:text-primary-300"
            >
              Terms of Service
            </a>
            and
            <a
              href="/privacy"
              className="text-primary-400 hover:text-primary-300"
            >
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-400 text-xs">{errors.agreeToTerms}</p>
        )}

        <div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          >
            Create Account
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-darker text-white/60">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-6">
          <SignInButton />
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-white/60">
          Already have an account?
          <button
            type="button"
            className="text-primary-400 hover:text-primary-300 font-medium"
            onClick={() =>
              navigate("/auth/register", {
                state: { from: pathname },
              })
            }
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
