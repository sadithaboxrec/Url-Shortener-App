import { LogOut, Mail, ShieldCheck, UserRound } from "@/components/ui/Icons";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() { await logout(); navigate("/"); }

  return (
    <main className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">Account</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Settings</h1><p className="mt-2 text-slate-500">Your profile and current session details.</p>
        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6 sm:p-8"><div className="flex items-center gap-4"><span className="grid size-14 place-items-center rounded-2xl bg-violet-100 text-xl font-black text-violet-700">{user?.name?.charAt(0).toUpperCase() || user?.email.charAt(0).toUpperCase()}</span><div><h2 className="text-xl font-extrabold text-slate-950">Profile details</h2><p className="mt-1 text-sm text-slate-500">These details come from your Shortly account.</p></div></div></div>
          <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
            <Detail icon={UserRound} label="Name" value={user?.name || "Not provided"} />
            <Detail icon={Mail} label="Email address" value={user?.email || "—"} />
          </div>
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-sm text-slate-500 sm:px-8">Profile editing isn’t available in the current API yet. Your account details remain read-only here.</div>
        </section>
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><ShieldCheck size={21} /></span><div><h2 className="font-extrabold text-slate-950">Active session</h2><p className="mt-1 max-w-lg text-sm leading-6 text-slate-500">You’re securely signed in on this browser. Signing out removes the session cookie from this device.</p></div></div><Button type="button" variant="secondary" onClick={handleLogout} className="shrink-0"><LogOut size={17} /> Sign out</Button></div></section>
      </div>
    </main>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof UserRound; label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2 text-sm font-semibold text-slate-500"><Icon size={16} /> {label}</div><p className="mt-2 break-all font-bold text-slate-900">{value}</p></div>;
}
