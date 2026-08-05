import { ArrowRight, Check } from "@/components/ui/Icons";
import { Link } from "react-router-dom";

export default function PricingPreview() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-white sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-violet-400">Straightforward from day one</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">Start for free.<br />Share something great.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">Create links without an account, or sign up to keep them organized and see their performance.</p>
          <Link to="/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-bold text-white transition hover:bg-violet-400">Create free account <ArrowRight size={18} /></Link>
        </div>
        <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur sm:p-9">
          <span className="absolute right-6 top-6 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">AVAILABLE NOW</span>
          <p className="text-lg font-bold">Free</p><p className="mt-3 text-5xl font-black">$0 <span className="text-base font-medium text-slate-400">forever</span></p>
          <div className="mt-8 space-y-4 text-slate-200">
            {["Instant URL shortening", "Saved link dashboard", "Click-count analytics", "QR code generation"].map((item) => <div key={item} className="flex items-center gap-3"><span className="grid size-6 place-items-center rounded-full bg-violet-500/20 text-violet-300"><Check size={14} /></span>{item}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
