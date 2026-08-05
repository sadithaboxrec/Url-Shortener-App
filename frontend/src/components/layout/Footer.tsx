import { Link2 } from "@/components/ui/Icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 sm:flex-row">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-slate-950">
          <span className="grid size-7 place-items-center rounded-lg bg-violet-600 text-white"><Link2 size={15} /></span>
          Shortly<span className="-ml-2 text-violet-600">.</span>
        </Link>
        <p className="text-center text-sm text-slate-500">Simple links. Clear results. Built for the modern web.</p>
        <div className="flex gap-5 text-sm font-medium text-slate-500">
          <Link to="/pricing" className="hover:text-violet-700">Pricing</Link>
          <Link to="/login" className="hover:text-violet-700">Log in</Link>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
