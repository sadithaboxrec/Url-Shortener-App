import { ArrowRight, Check, Clock3 } from "@/components/ui/Icons";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Pricing() {
  const { isAuthenticated } = useAuth();
  return (
    <main className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center"><span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-bold text-violet-700">Simple by design</span><h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">Short links. <span className="text-violet-600">Zero cost.</span></h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">Everything currently available in Shortly is free. No card, no trial clock, no surprise checkout.</p></div>
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-2">
          <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-300 sm:p-10"><div className="absolute -right-16 -top-16 size-52 rounded-full bg-violet-500/25 blur-3xl" /><span className="relative rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">AVAILABLE NOW</span><h2 className="relative mt-7 text-2xl font-extrabold">Free</h2><p className="relative mt-3 text-6xl font-black">$0</p><p className="relative mt-2 text-slate-400">Free for everyone.</p><div className="relative mt-8 space-y-4">{["Create short links instantly", "Save links to your account", "See click counts and rankings", "Generate QR codes", "Use on desktop and mobile"].map((feature) => <div key={feature} className="flex items-center gap-3 text-slate-200"><span className="grid size-6 place-items-center rounded-full bg-violet-500/20 text-violet-300"><Check size={14} /></span>{feature}</div>)}</div><Link to={isAuthenticated ? "/dashboard" : "/register"} className="relative mt-9 flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-bold transition hover:bg-violet-400">{isAuthenticated ? "Go to dashboard" : "Create free account"} <ArrowRight size={18} /></Link></section>
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 sm:p-10"><span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700"><Clock3 size={14} /> FUTURE PLANS</span><h2 className="mt-7 text-2xl font-extrabold text-slate-950">More for growing teams</h2><p className="mt-3 leading-7 text-slate-500">Custom aliases, richer analytics, team workspaces, and higher limits are natural next steps—but they are not connected to the current backend yet.</p><div className="mt-8 space-y-4">{["Custom branded aliases", "Deeper traffic insights", "Team collaboration", "Expanded rate limits"].map((feature) => <div key={feature} className="flex items-center gap-3 text-slate-500"><span className="grid size-6 place-items-center rounded-full bg-slate-100 text-slate-400"><Clock3 size={13} /></span>{feature}</div>)}</div><div className="mt-9 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-500">No paid plans are being sold today. This keeps the frontend honest about what the API supports.</div></section>
        </div>
      </div>
    </main>
  );
}
