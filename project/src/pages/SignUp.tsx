// pages/Signup.tsx

import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#111315]">

      {/* Center Container */}
      <div className="flex min-h-screen items-center justify-center px-6">

        {/* Signup Card */}
        <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-sm">

          {/* Brand */}
          <Link
            to="/"
            className="text-[16px] font-semibold tracking-tight text-[#111315]"
          >
            Mantis
          </Link>

          {/* Heading */}
          <div className="mt-10">

            <h1 className="text-3xl font-semibold tracking-tight text-[#111315]">
              Create account
            </h1>

            <p className="mt-2 text-sm text-[#60758A]">
              Get started with Mantis
            </p>

          </div>

          {/* Form */}
          <form className="mt-10 space-y-5">

            {/* Full Name */}
            <div>

              <label className="mb-2 block text-sm font-medium text-[#111315]">
                Full name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="h-12 w-full rounded-2xl border border-[#60758A]/15 bg-[#F8FAFB] px-4 text-sm text-[#111315] outline-none transition focus:border-[#60758A]/40"
              />

            </div>

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm font-medium text-[#111315]">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="h-12 w-full rounded-2xl border border-[#60758A]/15 bg-[#F8FAFB] px-4 text-sm text-[#111315] outline-none transition focus:border-[#60758A]/40"
              />

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-sm font-medium text-[#111315]">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="h-12 w-full rounded-2xl border border-[#60758A]/15 bg-[#F8FAFB] px-4 text-sm text-[#111315] outline-none transition focus:border-[#60758A]/40"
              />

            </div>

            {/* Button */}
            <button
              type="submit"
              className="h-12 w-full rounded-2xl bg-[#111315] text-sm font-medium text-white transition hover:bg-[#1B1D21]"
            >
              Create account
            </button>

          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-[#60758A]">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-medium text-[#111315] hover:underline"
            >
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;