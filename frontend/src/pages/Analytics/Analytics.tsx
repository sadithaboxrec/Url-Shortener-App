import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3, ExternalLink, Link2, MousePointerClick, Trophy } from "@/components/ui/Icons";
import { Link } from "react-router-dom";

import { getUserUrls } from "@/api/urls";
import { getShortUrl } from "@/utils/constants";
import { formatDate } from "@/utils/date";

export default function Analytics() {
  const { data: urls = [], isLoading, isError } = useQuery({ queryKey: ["user-urls"], queryFn: getUserUrls });
  const ranked = [...urls].sort((a, b) => b.click_count - a.click_count);
  const totalClicks = urls.reduce((sum, item) => sum + item.click_count, 0);
  const clickedLinks = urls.filter((item) => item.click_count > 0).length;
  const average = urls.length ? totalClicks / urls.length : 0;
  const chartData = ranked.slice(0, 8).reverse().map((item) => ({ name: item.short_code, clicks: item.click_count }));

  if (isLoading) return <div className="grid min-h-[70vh] place-items-center bg-slate-50"><div className="size-9 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" /></div>;

  return (
    <main className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div><p className="text-sm font-bold uppercase tracking-widest text-violet-600">Performance</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Analytics at a glance</h1><p className="mt-2 text-slate-500">A simple, honest view of how your links are performing.</p></div>

        {isError ? <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700">We couldn’t load your analytics. Check that the API is running and refresh.</div>
        : urls.length === 0 ? <section className="mt-8 grid min-h-96 place-items-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center"><div><span className="mx-auto grid size-16 place-items-center rounded-2xl bg-violet-50 text-violet-600"><BarChart3 size={29} /></span><h2 className="mt-5 text-2xl font-black text-slate-950">No data to chart—yet</h2><p className="mx-auto mt-2 max-w-md text-slate-500">Create your first short link and share it. Click activity will show up here.</p><Link to="/dashboard" className="mt-6 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white hover:bg-violet-700">Create a link</Link></div></section>
        : <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric icon={MousePointerClick} label="Total clicks" value={totalClicks.toLocaleString()} />
            <Metric icon={Link2} label="Saved links" value={urls.length.toLocaleString()} />
            <Metric icon={BarChart3} label="Avg. per link" value={average.toFixed(1)} />
            <Metric icon={Trophy} label="Links with clicks" value={`${clickedLinks} / ${urls.length}`} />
          </div>

          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-7"><h2 className="text-xl font-extrabold text-slate-950">Clicks by link</h2><p className="mt-1 text-sm text-slate-500">Your top {Math.min(urls.length, 8)} links, ranked by current total clicks.</p></div>
            <div className="h-80 w-full" aria-label="Bar chart showing clicks by short link">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 18 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" width={72} axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip cursor={{ fill: "#f5f3ff" }} contentStyle={{ borderRadius: 14, borderColor: "#e2e8f0", boxShadow: "0 10px 30px rgba(15,23,42,.1)" }} />
                  <Bar dataKey="clicks" fill="#7c3aed" radius={[0, 8, 8, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5 sm:px-7"><h2 className="text-xl font-extrabold text-slate-950">Link leaderboard</h2><p className="mt-1 text-sm text-slate-500">Your links ordered by total engagement.</p></div>
            <div className="divide-y divide-slate-100">{ranked.map((url, index) => <div key={url.id} className="flex items-center gap-4 p-5 sm:px-7"><span className={`grid size-9 shrink-0 place-items-center rounded-xl text-sm font-black ${index === 0 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>{index + 1}</span><div className="min-w-0 flex-1"><a href={getShortUrl(url.short_code)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-extrabold text-violet-700 hover:underline">{url.short_code}<ExternalLink size={13} /></a><p className="truncate text-sm text-slate-500">{url.original_url}</p><p className="mt-1 text-xs text-slate-400">Created {formatDate(url.created_at)}</p></div><div className="text-right"><p className="text-xl font-black text-slate-950">{url.click_count.toLocaleString()}</p><p className="text-xs font-semibold text-slate-400">clicks</p></div></div>)}</div>
          </section>
        </>}
      </div>
    </main>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Link2; label: string; value: string }) {
  return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-500">{label}</p><span className="grid size-9 place-items-center rounded-xl bg-violet-50 text-violet-600"><Icon size={18} /></span></div><p className="mt-5 text-3xl font-black tracking-tight text-slate-950">{value}</p></div>;
}
