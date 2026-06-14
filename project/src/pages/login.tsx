// pages/Login.tsx

import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#111315]">

      {/* Center Container */}
      <div className="flex min-h-screen items-center justify-center px-6">

        {/* Login Card */}
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
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-[#60758A]">
              Sign in to continue
            </p>

          </div>

          {/* Form */}
          <form className="mt-10 space-y-5">

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
                placeholder="Enter your password"
                className="h-12 w-full rounded-2xl border border-[#60758A]/15 bg-[#F8FAFB] px-4 text-sm text-[#111315] outline-none transition focus:border-[#60758A]/40"
              />

            </div>

            {/* Button */}
            <button
              type="submit"
              className="h-12 w-full rounded-2xl bg-[#111315] text-sm font-medium text-white transition hover:bg-[#1B1D21]"
            >
              Sign in
            </button>

          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-[#60758A]">

            Don&apos;t have an account?{" "}

            <Link
              to="/signup"
              className="font-medium text-[#111315] hover:underline"
            >
              Create account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;