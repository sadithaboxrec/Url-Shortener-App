import { useState, type FormEvent } from "react";
import axios from "axios";
import { ArrowRight, Eye, EyeOff } from "@/components/ui/Icons";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const destination = (location.state as { from?: string } | null)?.from || "/dashboard";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login({ email: email.trim(), password });
      navigate(destination, { replace: true });
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        setError(requestError.response?.data?.detail || "We couldn't log you in. Check your email and password.");
      } else {
        setError("We couldn't log you in. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (!isLoading && isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="w-full">
      <div className="mb-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-violet-600">Welcome back</p>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Log in to Shortly</h2>
        <p className="mt-3 text-slate-500">Manage your links and see how they’re performing.</p>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input id="email" type="email" label="Email address" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
        <div className="relative">
          <Input id="password" type={showPassword ? "text" : "password"} label="Password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" required className="pr-12" />
          <button type="button" className="absolute bottom-1 right-1 grid size-10 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        <Button type="submit" loading={submitting} className="w-full">Log in <ArrowRight size={17} /></Button>
      </form>
      <p className="mt-7 text-center text-sm text-slate-500">New to Shortly? <Link to="/register" className="font-bold text-violet-700 hover:text-violet-800">Create a free account</Link></p>
    </div>
  );
}
