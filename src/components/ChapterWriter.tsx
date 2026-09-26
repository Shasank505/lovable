import { useState } from "react";

export type ChapterDraft = { title: string; story: string; caption: string; question: string; photos: string[] };

function shrink(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, 900 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = img.width * s;
      c.height = img.height * s;
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/jpeg", 0.75));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function parse(text: string) {
  const get = (k: string) => text.match(new RegExp(`${k}:\\s*([\\s\\S]*?)(?=\\n[A-Z]+:|$)`))?.[1]?.trim() ?? "";
  return { title: get("TITLE"), story: get("STORY"), caption: get("CAPTION"), question: get("QUESTION") };
}

export function ChapterWriter({ year, names, onSave, onClose }: {
  year: string; names: { me: string; her: string };
  onSave: (d: ChapterDraft) => void; onClose: () => void;
}) {
  const [memories, setMemories] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [draft, setDraft] = useState<ReturnType<typeof parse> | null>(null);

  const addPhotos = async (files: FileList | null) => {
    if (!files) return;
    const list = await Promise.all(Array.from(files).filter((f) => f.type.startsWith("image/")).map(shrink));
    setPhotos((p) => [...p, ...list].slice(0, 5));
  };

  const write = async () => {
    setBusy(true); setErr("");
    try {
      const res = await fetch("/api/write-chapter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ year, names, memories, photos: photos.slice(0, 4) }),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      setDraft(parse(text));
    } catch (e) {
      setErr((e as Error).message || "Something went wrong.");
    } finally { setBusy(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 backdrop-blur-sm sm:items-center">
      <div className="max-h-[92svh] w-full max-w-[440px] overflow-y-auto rounded-t-3xl bg-card p-6 shadow-photo sm:rounded-3xl">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">Write {year}</p>
          <button onClick={onClose} className="text-xl text-muted-foreground" aria-label="Close">×</button>
        </div>
        <label className="mt-4 block font-script text-xl italic">Your memories from this year</label>
        <textarea value={memories} onChange={(e) => setMemories(e.target.value)} rows={6}
          placeholder="Trips, inside jokes, fights, little moments…"
          className="mt-2 w-full rounded-xl bg-blush p-3 text-sm outline-none ring-1 ring-border focus:ring-primary" />
        <label className="mt-4 block font-script text-xl italic">Photos (up to 5 — the first is the highlight)</label>
        <input type="file" accept="image/*" multiple onChange={(e) => addPhotos(e.target.files)} className="mt-2 text-xs" />
        {photos.length > 0 && (
          <div className="mt-3 grid grid-cols-5 gap-2">
            {photos.map((p, i) => (
              <button key={i} onClick={() => setPhotos((l) => l.filter((_, j) => j !== i))} aria-label="Remove photo">
                <img src={p} alt="" className="aspect-square w-full rounded object-cover" />
              </button>
            ))}
          </div>
        )}
        {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
        <button onClick={write} disabled={busy || !memories.trim()}
          className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground disabled:opacity-50">
          {busy ? "Writing with love…" : draft ? "Write again" : "Write this chapter ✦"}
        </button>
        {draft && (
          <div className="mt-6 space-y-3 rounded-2xl bg-blush p-4">
            <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="w-full bg-transparent font-script text-3xl italic outline-none" />
            <textarea value={draft.story} onChange={(e) => setDraft({ ...draft, story: e.target.value })} rows={5}
              className="w-full bg-transparent font-script text-lg italic outline-none" />
            <input value={draft.caption} onChange={(e) => setDraft({ ...draft, caption: e.target.value })}
              className="w-full bg-transparent font-hand text-xl text-primary outline-none" />
            <textarea value={draft.question} onChange={(e) => setDraft({ ...draft, question: e.target.value })} rows={2}
              className="w-full bg-transparent text-sm outline-none" />
            <button onClick={() => onSave({ ...draft, photos })}
              className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground">
              Put it in the book ♥
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
