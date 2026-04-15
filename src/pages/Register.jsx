import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const [form, setForm]       = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    const err = register(form.name, form.email, form.password);
    if (err) {
      setError(err);
    } else {
      navigate("/");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 transition-colors duration-200">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
            Dashify
          </span>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-1">
            Create account
          </h1>
          <p className="text-sm text-gray-400 dark:text-slate-500 mb-6">
            Start your free dashboard today
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "name",     label: "Full Name",       type: "text",     placeholder: "John Doe"         },
              { key: "email",    label: "Email",           type: "email",    placeholder: "john@example.com" },
              { key: "password", label: "Password",        type: "password", placeholder: "Min. 6 characters" },
              { key: "confirm",  label: "Confirm Password",type: "password", placeholder: "Repeat password"  },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  required
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/40 transition"
                />
              </div>
            ))}

            {error && (
              <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 dark:text-slate-500 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}