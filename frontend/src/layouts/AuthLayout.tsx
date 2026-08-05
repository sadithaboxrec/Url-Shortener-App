import { ArrowLeft, Link2, Sparkles } from "@/components/ui/Icons";
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[0.9fr_1.1fr]">
      <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -left-24 top-1/3 size-80 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="absolute -right-20 bottom-10 size-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <Link to="/" className="relative flex items-center gap-2.5 text-xl font-extrabold">
          <span className="grid size-10 place-items-center rounded-xl bg-violet-500"><Link2 size={21} /></span>
          Shortly<span className="-ml-2 text-violet-400">.</span>
        </Link>
        <div className="relative max-w-lg">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-violet-100"><Sparkles size={15} /> Make every click count</span>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight">Small links.<br /><span className="text-violet-400">Bigger impact.</span></h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">Create memorable links, share them anywhere, and understand what your audience clicks.</p>
        </div>
        <p className="relative text-sm text-slate-500">Fast. Focused. Free to start.</p>
      </section>
      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-16">
        <Link to="/" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-950 lg:self-end"><ArrowLeft size={16} /> Back to home</Link>
        <div className="mx-auto flex w-full max-w-md flex-1 items-center py-10"><Outlet /></div>
      </section>
    </main>
  );
}
