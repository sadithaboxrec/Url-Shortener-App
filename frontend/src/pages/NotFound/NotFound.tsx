import { ArrowLeft, Link2 } from "@/components/ui/Icons";
import { Link } from "react-router-dom";

export default function NotFound() {
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-slate-950 px-6 text-center text-white"><div className="absolute size-[30rem] rounded-full bg-violet-600/20 blur-3xl" /><div className="relative"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-violet-500"><Link2 size={27} /></span><p className="mt-8 text-sm font-black uppercase tracking-[0.3em] text-violet-400">404 · Link not found</p><h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">This route came up short.</h1><p className="mx-auto mt-5 max-w-lg text-lg text-slate-400">The page may have moved, or the address might be missing a piece.</p><Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 hover:bg-violet-50"><ArrowLeft size={18} /> Back to home</Link></div></main>;
}
