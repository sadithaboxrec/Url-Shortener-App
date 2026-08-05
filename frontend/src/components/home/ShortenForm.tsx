import { useMemo, useState, type FormEvent } from "react";
import axios from "axios";
import { Check, Copy, ExternalLink, Link2, QrCode } from "@/components/ui/Icons";

import { useCreateUrl } from "@/hooks/useCreateUrl";
import { getShortUrl } from "@/utils/constants";
import Button from "@/components/ui/Button";
import QrDownloadCard from "@/components/common/QrDownloadCard";

export default function ShortenForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [validationError, setValidationError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const createUrlMutation = useCreateUrl();
  const shortUrl = useMemo(() => createUrlMutation.data ? getShortUrl(createUrlMutation.data.short_code) : "", [createUrlMutation.data]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanedUrl = originalUrl.trim();
    setValidationError(""); setCopied(false); setShowQr(false);
    try {
      const parsed = new URL(cleanedUrl);
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error();
      createUrlMutation.mutate({ original_url: cleanedUrl });
    } catch {
      setValidationError("Enter a complete URL beginning with http:// or https://");
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { setCopied(false); }
  }

  function getApiError(): string {
    const error = createUrlMutation.error;
    if (axios.isAxiosError(error)) {
      const detail = error.response?.data?.detail;
      if (error.response?.status === 429) return typeof detail === "string" ? detail : "You've reached the current rate limit. Please try again shortly.";
      if (typeof detail === "string") return detail;
    }
    return "We couldn't shorten that URL. Please try again.";
  }

  return (
    <div className="rounded-[2rem] border border-white/80 bg-white/90 p-3 shadow-[0_24px_80px_-30px_rgba(76,29,149,0.35)] backdrop-blur sm:p-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="original-url" className="sr-only">Long URL</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={21} />
            <input id="original-url" type="url" value={originalUrl} onChange={(event) => { setOriginalUrl(event.target.value); setValidationError(""); }} placeholder="Paste your long link here" autoComplete="url" disabled={createUrlMutation.isPending} className={`min-h-14 w-full rounded-2xl border bg-slate-50 py-3 pl-12 pr-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${validationError ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-violet-500 focus:ring-violet-100"}`} />
          </div>
          <Button type="submit" loading={createUrlMutation.isPending} className="min-h-14 px-7 text-base sm:min-w-40">{createUrlMutation.isPending ? "Working…" : "Shorten link"}</Button>
        </div>
        {validationError && <p role="alert" className="mt-2 px-2 text-left text-sm font-medium text-red-600">{validationError}</p>}
      </form>

      {createUrlMutation.isError && <div role="alert" className="mt-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-left text-sm text-red-700">{getApiError()}</div>}

      {createUrlMutation.isSuccess && shortUrl && (
        <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-left sm:p-5">
          <div className="flex items-center gap-2 font-bold text-emerald-900"><span className="grid size-6 place-items-center rounded-full bg-emerald-600 text-white"><Check size={14} /></span> Your short link is ready</div>
          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3 shadow-sm"><p className="truncate font-bold text-violet-700">{shortUrl}</p><p className="mt-0.5 truncate text-xs text-slate-500">{createUrlMutation.data.original_url}</p></div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={handleCopy}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? "Copied" : "Copy"}</Button>
              <Button type="button" variant="secondary" onClick={() => setShowQr((value) => !value)}><QrCode size={17} /> QR</Button>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" aria-label="Open short URL" className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-100"><ExternalLink size={18} /></a>
            </div>
          </div>
          {showQr && <div className="mt-4"><QrDownloadCard value={shortUrl} filename={`shortly-${createUrlMutation.data.short_code}`} /></div>}
        </div>
      )}
      <p className="mt-3 text-center text-xs font-medium text-slate-400">No account required · Secure redirects · Free to use</p>
    </div>
  );
}
