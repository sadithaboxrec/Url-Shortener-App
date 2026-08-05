import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Check, Copy, ExternalLink, Link2, MousePointerClick, QrCode, Search } from "@/components/ui/Icons";

import { getUserUrls } from "@/api/urls";
import ShortenForm from "@/components/home/ShortenForm";
import { useAuth } from "@/contexts/AuthContext";
import { getShortUrl } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import QrDownloadCard from "@/components/common/QrDownloadCard";

export default function Dashboard() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [qrId, setQrId] = useState<number | null>(null);
  const { data: urls = [], isLoading, isError } = useQuery({ queryKey: ["user-urls"], queryFn: getUserUrls });
  const filteredUrls = urls.filter((url) => `${url.short_code} ${url.original_url}`.toLowerCase().includes(search.toLowerCase()));
  const totalClicks = urls.reduce((total, url) => total + url.click_count, 0);
  const topLink = [...urls].sort((a, b) => b.click_count - a.click_count)[0];

  async function copyUrl(id: number, shortCode: string) {
    await navigator.clipboard.writeText(getShortUrl(shortCode));
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1800);
  }

  return (
    <main className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-sm font-bold uppercase tracking-widest text-violet-600">Your workspace</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Good to see you, {user?.name?.split(" ")[0] || "there"}.</h1><p className="mt-2 text-slate-500">Create a link, then watch it work.</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm"><span className="font-bold text-slate-900">{urls.length}</span> saved links · <span className="font-bold text-slate-900">{totalClicks}</span> total clicks</div>
        </div>

        <section className="mt-8 rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 p-4 sm:p-6">
          <div className="mb-4 px-2"><h2 className="text-xl font-extrabold text-white">Create a new short link</h2><p className="mt-1 text-sm text-slate-400">It’ll be saved to this workspace automatically.</p></div>
          <ShortenForm />
        </section>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat icon={Link2} label="Total links" value={urls.length.toLocaleString()} tone="violet" />
          <Stat icon={MousePointerClick} label="Total clicks" value={totalClicks.toLocaleString()} tone="amber" />
          <Stat icon={BarChart3} label="Top link" value={topLink ? `${topLink.click_count} clicks` : "No data yet"} tone="emerald" />
        </div>

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_15px_45px_-30px_rgba(15,23,42,0.3)]">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:px-6">
            <div><h2 className="text-xl font-extrabold text-slate-950">Your links</h2><p className="mt-1 text-sm text-slate-500">Every short link you’ve created while signed in.</p></div>
            <label className="relative block sm:w-72"><span className="sr-only">Search links</span><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search links…" className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100" /></label>
          </div>

          {isLoading ? <div className="grid min-h-56 place-items-center"><div className="size-8 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" /></div>
          : isError ? <div className="p-10 text-center"><p className="font-bold text-slate-900">We couldn’t load your links.</p><p className="mt-2 text-sm text-slate-500">Check that the API is running, then refresh this page.</p></div>
          : filteredUrls.length === 0 ? <div className="p-12 text-center"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-violet-50 text-violet-600"><Link2 size={25} /></span><h3 className="mt-4 font-extrabold text-slate-900">{urls.length ? "No matching links" : "Your first link starts here"}</h3><p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">{urls.length ? "Try a different search term." : "Paste a URL above. Your saved links and click counts will appear here."}</p></div>
          : <div className="divide-y divide-slate-100">{filteredUrls.map((url) => {
              const shortUrl = getShortUrl(url.short_code);
              return <article key={url.id} className="p-5 transition hover:bg-slate-50/70 sm:px-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-violet-50 text-violet-600"><Link2 size={20} /></div>
                  <div className="min-w-0 flex-1"><a href={shortUrl} target="_blank" rel="noopener noreferrer" className="font-extrabold text-violet-700 hover:underline">{shortUrl}</a><p className="mt-1 truncate text-sm text-slate-500" title={url.original_url}>{url.original_url}</p><p className="mt-1 text-xs font-medium text-slate-400">Created {formatDate(url.created_at)}</p></div>
                  <div className="flex items-center gap-2"><span className="mr-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700"><MousePointerClick size={15} /> {url.click_count}</span><button type="button" onClick={() => copyUrl(url.id, url.short_code)} className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-white hover:text-violet-700" aria-label="Copy short link">{copiedId === url.id ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}</button><button type="button" onClick={() => setQrId(qrId === url.id ? null : url.id)} className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-white hover:text-violet-700" aria-label="Show QR code"><QrCode size={18} /></button><a href={shortUrl} target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-white hover:text-violet-700" aria-label="Open short link"><ExternalLink size={18} /></a></div>
                </div>
                {qrId === url.id && <div className="mt-4 rounded-2xl bg-slate-50 p-2 sm:ml-15"><QrDownloadCard value={shortUrl} filename={`shortly-${url.short_code}`} compact /></div>}
              </article>;
            })}</div>}
        </section>
      </div>
    </main>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: typeof Link2; label: string; value: string; tone: "violet" | "amber" | "emerald" }) {
  const tones = { violet: "bg-violet-100 text-violet-700", amber: "bg-amber-100 text-amber-700", emerald: "bg-emerald-100 text-emerald-700" };
  return <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><span className={`grid size-12 place-items-center rounded-2xl ${tones[tone]}`}><Icon size={22} /></span><div><p className="text-sm font-semibold text-slate-500">{label}</p><p className="mt-0.5 text-2xl font-black text-slate-950">{value}</p></div></div>;
}
