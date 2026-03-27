import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ============================================
// LEVEL 5: API Integration, File Upload & Production Patterns
// ============================================

// -------- Part A: API Submit --------

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

function APIFormDemo() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  async function onSubmit(data) {
    if (loading) return;
    setLoading(true);
    setResult(null);

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (Math.random() > 0.3) {
        setResult({ success: true, data });
      } else {
        throw new Error("Server error: could not save user");
      }
    } catch (err) {
      setResult({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Part A — API Integration + Loading State
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Submits to a simulated API. Shows loading state, disables button, handles
        errors. ~30% chance of simulated failure.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit to API"
          )}
        </button>

        {result?.success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            Saved: {JSON.stringify(result.data)}
          </div>
        )}
        {result && !result.success && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {result.error}
          </div>
        )}
      </form>
    </div>
  );
}

// -------- Part B: File Upload --------

function FileUploadDemo() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setUploaded(false);

    if (selected.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selected);
    } else {
      setPreview(null);
    }
  }

  async function handleUpload() {
    if (!file) return;
    setUploading(true);

    // In real app: await fetch("/api/upload", { method: "POST", body: formData })
    const formData = new FormData();
    formData.append("file", file);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setUploading(false);
    setUploaded(true);
    console.log("Uploaded:", file.name, file.size, "bytes");
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Part B — File Upload with Preview
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Select a file → preview (if image) → upload. Uses{" "}
        <code className="bg-gray-100 px-1 rounded text-sm">FormData</code> for
        multipart handling.
      </p>

      {/* Drop zone style file input */}
      <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx"
          className="hidden"
        />
        <div className="text-gray-500">
          <p className="text-lg">Click to select a file</p>
          <p className="text-sm mt-1">Images, PDF, or documents</p>
        </div>
      </label>

      {file && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start gap-4">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
              />
            )}
            <div className="flex-1">
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>

              {uploaded && (
                <p className="text-green-600 text-sm mt-2 font-medium">
                  Upload complete!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------- Part C: Production Registration --------

const registrationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function ProductionFormDemo() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(registrationSchema) });

  async function onSubmit(data) {
    if (loading) return;
    setLoading(true);
    setResult(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResult({ success: true });
      reset();
    } catch (err) {
      setResult({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Part C — Production Registration Form
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Zod cross-field validation (password match), loading state, form reset on
        success. Production-ready pattern.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {result?.success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            Account created successfully!
          </div>
        )}
        {result && !result.success && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {result.error}
          </div>
        )}
      </form>
    </div>
  );
}

export default function Level5_APIFileUpload() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Level 5 — API Integration, File Upload & Production Patterns
      </h2>
      <p className="text-gray-500 mb-6">
        Full-stack form patterns: API calls, file uploads, production-ready UX
      </p>

      <div className="space-y-6">
        <APIFormDemo />
        <FileUploadDemo />
        <ProductionFormDemo />
      </div>
    </div>
  );
}
