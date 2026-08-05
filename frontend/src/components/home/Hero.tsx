import { ArrowDown, BarChart3, MousePointerClick, Sparkles } from "@/components/ui/Icons";
import ShortenForm from "./ShortenForm";

export default function Hero() {
  return (
    <main className="relative overflow-hidden bg-slate-50 px-4 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="absolute left-1/2 top-0 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-violet-200/45 blur-3xl" />
      <div className="absolute -right-20 top-1/3 size-64 rounded-full bg-amber-100/70 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3.5 py-1.5 text-sm font-bold text-violet-700 shadow-sm backdrop-blur">
            <Sparkles size={15} /> A clearer way to share
          </span>
          <h1 className="mt-7 text-5xl font-black leading-[1.03] tracking-[-0.045em] text-slate-950 sm:text-7xl lg:text-8xl">
            Turn long links into <span className="relative whitespace-nowrap text-violet-600">small wins.<svg className="absolute -bottom-2 left-0 w-full text-amber-400" viewBox="0 0 380 12" fill="none" aria-hidden="true"><path d="M3 9C84 3 237 1 377 6" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg></span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">Create clean, shareable URLs in seconds. Save your links, generate QR codes, and see what earns the click.</p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl"><ShortenForm /></div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 divide-x divide-slate-200 text-center">
          <div className="px-2"><MousePointerClick className="mx-auto mb-2 text-violet-600" size={21} /><p className="text-sm font-bold text-slate-800">One-click copy</p></div>
          <div className="px-2"><BarChart3 className="mx-auto mb-2 text-violet-600" size={21} /><p className="text-sm font-bold text-slate-800">Click insights</p></div>
          <div className="px-2"><ArrowDown className="mx-auto mb-2 text-violet-600" size={21} /><p className="text-sm font-bold text-slate-800">No card needed</p></div>
        </div>
      </div>
    </main>
  );
}
