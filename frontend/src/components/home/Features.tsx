import { BarChart3, Link2, QrCode, ShieldCheck } from "@/components/ui/Icons";

const features = [
  { icon: Link2, title: "Clean links, instantly", description: "Turn unwieldy URLs into compact links that look good everywhere you share them.", accent: "bg-violet-100 text-violet-700" },
  { icon: BarChart3, title: "Useful click insights", description: "See total clicks and compare your links, without getting lost in a wall of metrics.", accent: "bg-amber-100 text-amber-700" },
  { icon: QrCode, title: "QR-ready sharing", description: "Generate a scannable QR code for any short link and bridge print with digital.", accent: "bg-emerald-100 text-emerald-700" },
  { icon: ShieldCheck, title: "Account-based access", description: "Your saved link workspace is protected by secure, cookie-based sessions.", accent: "bg-sky-100 text-sky-700" },
];

export default function Features() {
  return (
    <section className="bg-white px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-widest text-violet-600">Everything you need</p><h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Less link clutter.<br />More clarity.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Shortly keeps the workflow focused: create, share, and learn.</p></div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, accent }, index) => (
            <article key={title} className="group rounded-3xl border border-slate-200 bg-slate-50/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60">
              <div className={`grid size-12 place-items-center rounded-2xl ${accent}`}><Icon size={23} /></div>
              <p className="mt-8 text-xs font-black tracking-widest text-slate-300">0{index + 1}</p>
              <h3 className="mt-2 text-xl font-extrabold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
