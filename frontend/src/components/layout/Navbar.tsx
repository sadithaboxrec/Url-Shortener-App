import { useState } from "react";
import { BarChart3, LayoutDashboard, Link2, Menu, Settings, X } from "@/components/ui/Icons";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";

const appLinks = [
  { to: "/dashboard", label: "Links", icon: LayoutDashboard },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    setOpen(false);
    navigate("/");
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-violet-50 text-violet-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200">
            <Link2 size={20} strokeWidth={2.5} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-slate-950">Shortly<span className="text-violet-600">.</span></span>
        </Link>

        {isAuthenticated && (
          <div className="hidden items-center gap-1 md:flex">
            {appLinks.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={navLinkClass}>
                <Icon size={17} /> {label}
              </NavLink>
            ))}
          </div>
        )}

        <div className="hidden items-center gap-3 md:flex">
          {!isLoading && (isAuthenticated ? (
            <>
              <div className="mr-1 text-right">
                <p className="max-w-44 truncate text-sm font-semibold text-slate-800">{user?.name || "Your account"}</p>
                <p className="max-w-44 truncate text-xs text-slate-500">{user?.email}</p>
              </div>
              <Button variant="secondary" type="button" onClick={handleLogout}>Sign out</Button>
            </>
          ) : (
            <>
              <Link to="/pricing" className="px-2 text-sm font-semibold text-slate-600 hover:text-slate-950">Pricing</Link>
              <Link to="/login" className="px-2 text-sm font-semibold text-slate-700 hover:text-violet-700">Log in</Link>
              <Link to="/register" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-200 transition hover:bg-violet-700">Get started</Link>
            </>
          ))}
        </div>

        <button type="button" className="grid size-10 place-items-center rounded-xl text-slate-700 hover:bg-slate-100 md:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {isAuthenticated ? (
              <>
                <div className="mb-2 rounded-2xl bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">{user?.name || "Your account"}</p>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                </div>
                {appLinks.map(({ to, label, icon: Icon }) => (
                  <NavLink key={to} to={to} className={navLinkClass} onClick={() => setOpen(false)}>
                    <Icon size={17} /> {label}
                  </NavLink>
                ))}
                <Button variant="secondary" className="mt-2 w-full" type="button" onClick={handleLogout}>Sign out</Button>
              </>
            ) : (
              <>
                <NavLink to="/pricing" className={navLinkClass} onClick={() => setOpen(false)}>Pricing</NavLink>
                <NavLink to="/login" className={navLinkClass} onClick={() => setOpen(false)}>Log in</NavLink>
                <Link to="/register" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-violet-600 px-4 py-3 text-center text-sm font-semibold text-white">Create free account</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
