import { useState, type FormEvent } from "react";
import axios from "axios";
import { ArrowRight, Check, Eye, EyeOff } from "@/components/ui/Icons";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { registerUser } from "@/api/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";

export default function Register() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2) { setError("Please enter at least 2 characters for your name."); return; }
    if (password.length < 8) { setError("Your password must be at least 8 characters."); return; }
    setSubmitting(true);
    setError("");
    try {
      await registerUser({ name: name.trim(), email: email.trim(), password });
      await login({ email: email.trim(), password });
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        const detail = requestError.response?.data?.detail;
        setError(typeof detail === "string" ? detail : "We couldn't create your account. Please check your details.");
      } else {
        setError("We couldn't create your account. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (!isLoading && isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="w-full">
      <div className="mb-7">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-violet-600">Free forever</p>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Create your account</h2>
        <p className="mt-3 text-slate-500">Save every link and track every click.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input id="name" label="Your name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Alex Morgan" autoComplete="name" required minLength={2} />
        <Input id="email" type="email" label="Email address" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
        <div className="relative">
          <Input id="password" type={showPassword ? "text" : "password"} label="Password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" autoComplete="new-password" minLength={8} required className="pr-12" />
          <button type="button" className="absolute bottom-1 right-1 grid size-10 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500"><Check size={15} className="text-emerald-600" /> At least 8 characters</div>
        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        <Button type="submit" loading={submitting} className="w-full">Create free account <ArrowRight size={17} /></Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-bold text-violet-700 hover:text-violet-800">Log in</Link></p>
    </div>
  );
}
