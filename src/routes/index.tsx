import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import birthdayGift from "@/assets/IMG_20260926_085225_036.jpg";
import firstMeeting from "@/assets/IMG_20260926_084904_786.jpg";
import firstParty from "@/assets/Screenshot_20260926-091200_Instagram-2.jpg";
import culturalFest from "@/assets/Screenshot_20260926-091221_Instagram-2.jpg";
import movieDate from "@/assets/Screenshot_20260926-091234_Instagram-2.jpg";
import year2Photo1 from "@/assets/chapter2/IMG-20240124-WA0016.jpg";
import year2Photo2 from "@/assets/chapter2/IMG_20260926_085558_325.jpg";
import year2Photo3 from "@/assets/chapter2/IMG-20240619-WA0050.jpg";
import year2Video from "@/assets/chapter2/VID-20240219-WA0004.mp4";
import year2SweetMoment from "@/assets/chapter2/IMG_20260926_085328_177.jpg";
import year3Photo1 from "@/assets/chapter3/IMG_20260926_090413_730.jpg";
import year3Photo2 from "@/assets/chapter3/IMG_20260926_084941_357.jpg";
import year3Photo3 from "@/assets/chapter3/IMG-20250202-WA0028.jpg";
import year3Photo4 from "@/assets/chapter3/WA_1790399150100.jpg";
import year3SweetMoment from "@/assets/chapter3/VID_20260926_035455_3472.mp4";
import year4Photo1 from "@/assets/chapter4/da5e5ca5-6270-4885-999c-96b477bd6029.jpg";
import year4Photo2 from "@/assets/chapter4/IMG-20260730-WA0017.jpg";
import year4Photo3 from "@/assets/chapter4/VID-20260712-WA00262.mp4";
import year4Photo4 from "@/assets/chapter4/IMG-20260808-WA0138.jpg";
import year4SweetMoment from "@/assets/chapter4/Photo from Shashank Pandey.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shasank & Rashmi — Four Years of Us" },
      { name: "description", content: "A little storybook of our four years together." },
      { property: "og:title", content: "Shasank & Rashmi — Four Years of Us" },
      { property: "og:description", content: "A little storybook of our four years together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

/* ============ EDIT YOUR DETAILS HERE ============ */
const NAMES = { me: "Shasank", her: "Rashmi" };
const START_DATE = "2022-09-28"; // the day it all began
/*
 * Photos: put a URL (or imported image) in `photos` / `highlight.src`.
 * Videos: use a URL ending in .mp4 — it will play automatically.
 * Empty strings show a labelled placeholder slot.
 */
const CHAPTERS = [
  {
    no: "One", year: "Year 1", title: "Where It Began",
    story: "It started with one Instagram message from you — \"hey, are you preparing for NDA?\" — and a conversation that simply refused to end. Then the college reading room: I held your hand, and you smiled, \"has anyone given you a dare?\"",
    photos: [birthdayGift, firstParty, movieDate, culturalFest],
    descriptions: [
      "Sabse chhotu birthday gift dia tha tu isse bhi bohot happy hogai thi :)",
      "Jab Ham pehli baar mile the tune hair cut lia tha iss time hamne first hand cuddle wala photo lia tha",
      "first time Ham party me gye the, hamne bohot dance kia the oo antava pe ",
      "Hamara first cultural fest the, tu kitni khubsurat lag rahi thi aur hamne saath me garba kia tha ",
    ],
    highlight: { src: firstMeeting, caption: "our first movie date", description: "Hamara first movie date , tu apne didi ko laayi thi , fir ham dono saath baithe the aur maine tujhe kiss kia tha(First kiss ka intiative maine kia tha) , wo lift wala kiss wow" },
    question: "Be honest — how long had you been waiting to say that dare line?",
  },
  {
    no: "Two", year: "Year 2", title: "Learning Each Other",
    story: "Late-night talks, silly fights, making up with Kissi. We learned each other's quiet languages.",
    photos: [year2Photo1, year2Photo2, year2Photo3, year2Video],
    descriptions: ["Iss din tu vrindavan se aayi thi aur thodi sad thi health ke wajah se tab tu sidha mele godi me aagai thi reading room me", 
      "Ham canteen me lunch karne aate the saath me, mai har waqt tere saath rukta tha college ki bus jaane tak usme ham ye sab filter wali masti karte the. Btw Looking bridesmaid😚😚"
      , "Tune first time mera birthday manaya the and pehli baar rose dia the, tu bohot sweet thi uss time"
      , "Ham college me kaafi popular hogaye the and haa ye video dharmik ne banaya tha"],
    highlight: { src: year2SweetMoment, caption: "our sweet moment", description: "Ye to sabse jyda accha and hamesha story moment wala picu hai, uss time gulab pe gulab lag rahi thi gulab jamun❤️❤️" },
    question: "Which little habit of mine secretly makes you smile?",
  },
  {
    no: "Three", year: "Year 3", title: "Growing Together",
    story: "New places, new dreams, the same hand to hold. Somewhere along the way, you became home.",
    photos: [year3Photo1, year3Photo2, year3Photo3, year3Photo4],
    descriptions: ["Hamne kamati bag explore kia tha, zoo me tere and mere jaise swan dekhe the fir toy train bhi ghume the, one of the lovely day spended with you 😘😘",
       "On of the favorite pic of mine😜😜",
        "Meri internship ke just one day pehle ham mile the aur tu mujhe aise dekh ke bohot hasi thi😊",
         "Jab mera confirmation hua tha promact me ,tune mujhe bohot help ki thi hamesha motivate karti thi tab maine tere liye sunflower laaya tha tu bohot khush hogai thi"],
    highlight: { src: year3SweetMoment, caption: "you, laughing", description: "Garba-- Tu chaudwi ka chaand jaisi aati thi mere saath garba karti thi fir tension me chali jaati thi but hamesha cute lagti thi😘😘" },
    question: "Where in the world would you run away with me tomorrow?",
  },
  {
    no: "Four", year: "Year 4", title: "Still Falling",
    story: "Four years in and I still look at you like the first day. Every chapter with you is my favourite one.",
    photos: [year4Photo1, year4Photo2, year4Photo3, year4Photo4],
    descriptions: ["Har jagah baarish hogai thi fir bhi didi ka wish tune poori kia aur itne aache se hamne lambe time tak garba khelu😍", 
      "This day, maine bhagwan ko yaad kia tha piche baith ke 😜(Bohot acchi gaadi chalayi bubu)",
       "Again one of the happy moment, bohot enjoy kia tha hamne bohot saare games khele the (BTW abhi bhi credits baaki hai to kab chalna hai ?😉)", 
       "Bohot Acchu Gana gaya tha aapne and it was a beautiful trip"],
    highlight: { src: year4SweetMoment, caption: "today & always", description: "Thank You , Har time mere saath rehne ke liye mujhe dengue se bahar nikal ne ke liye and LOVE YOU❤️❤️" },
    question: "What's one dream you want us to chase next?",
  },
];
const MUSIC_URL = "/music/lovely.mp3"; // soft romantic instrumental
/* ================================================ */

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setInView(true), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`}>{children}</div>;
}

function Media({ src, label }: { src: string; label: string }) {
  if (!src)
    return (
      <div className="grid aspect-square place-items-center bg-blush text-center">
        <span className="px-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
      </div>
    );
  if (src.endsWith(".mp4"))
    return <video src={src} className="aspect-square w-full bg-blush object-contain" autoPlay muted loop playsInline />;
  return <img src={src} alt={label} loading="lazy" className="aspect-square w-full bg-blush object-contain" />;
}

function FlipMedia({ src, label, description, highlight = false }: { src: string; label: string; description: string; highlight?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={`${label} — ${flipped ? "show photo" : "read memory"}`}
      aria-pressed={flipped}
      onClick={() => setFlipped((value) => !value)}
      className="flip-scene block aspect-square h-auto w-full rounded-none p-0 shadow-none hover:bg-transparent"
    >
      <span className={`flip-inner relative block h-full w-full ${flipped ? "is-flipped" : ""}`}>
        <span className="flip-face absolute inset-0 block overflow-hidden">
          <Media src={src} label={label} />
          <span className="absolute bottom-0 right-0 bg-card/85 px-2 py-1 font-mono text-[9px] uppercase text-foreground">Tap to turn ↺</span>
        </span>
        <span className={`flip-face flip-back absolute inset-0 flex items-center justify-center overflow-y-auto bg-blush p-2 text-center font-script italic normal-case whitespace-normal text-foreground ${highlight ? "text-[16px] leading-tight" : "text-[13px] leading-tight"}`}>
          <span className="block max-h-full overflow-y-auto">{description || "Text"}</span>
        </span>
      </span>
    </Button>
  );
}

function Petals() {
  const [petals, setPetals] = useState<{ left: number; delay: number; dur: number; s: number }[]>([]);
  useEffect(() => {
    setPetals(Array.from({ length: 14 }, () => ({
      left: Math.random() * 100, delay: Math.random() * 12, dur: 10 + Math.random() * 10, s: 0.6 + Math.random() * 0.8,
    })));
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p, i) => (
        <span key={i} className="petal" style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, scale: `${p.s}` }} />
      ))}
    </div>
  );
}

function MusicToggle() {
  const audio = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const player = audio.current;
    if (!player) return;
    player.play().then(() => setOn(true)).catch(() => {});
  }, []);
  const toggle = () => {
    if (!audio.current || !MUSIC_URL) return setOn((v) => !v);
    if (on) audio.current.pause(); else audio.current.play().catch(() => {});
    setOn(!on);
  };
  return (
    <>
      {MUSIC_URL && <audio ref={audio} src={MUSIC_URL} autoPlay loop />}
      <button onClick={toggle} aria-label="Toggle music"
        className="fixed right-4 top-4 z-40 flex items-center gap-1.5 rounded-full bg-card/70 px-3 py-2 text-[11px] font-medium text-foreground ring-1 ring-border backdrop-blur-md">
        <span className="text-sm leading-none text-primary">{on ? "♫" : "♪"}</span> {on ? "Playing" : "Music off"}
      </button>
    </>
  );
}

function Envelope({ question }: { question: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen((v) => !v)}
      className="mt-9 w-full rounded-2xl bg-card/70 p-5 text-left shadow-photo ring-1 ring-border backdrop-blur-md transition-transform active:scale-[0.98]">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">A sealed question</p>
        <span className={`text-xl leading-none text-primary transition-transform duration-500 ${open ? "rotate-180" : ""}`}>{open ? "✉" : "♥"}</span>
      </div>
      <div className={`grid transition-all duration-700 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <p className="overflow-hidden pt-3 font-script text-2xl italic leading-snug">{question}</p>
      </div>
      {!open && <p className="mt-2 font-script text-lg italic text-muted-foreground">Tap to break the seal…</p>}
    </button>
  );
}

function Chapter({ c: base, idx, onContinue, kissing }: { c: (typeof CHAPTERS)[number]; idx: number; onContinue: () => void; kissing: boolean }) {
  const rot = ["-rotate-2", "rotate-2 mt-4", "rotate-1", "-rotate-1 mt-4"];
  const c = base;
  return (
    <section id={`chapter-${idx + 1}`} className="relative border-t border-border px-6 py-16">
      <Reveal>
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">Chapter {c.no}</p>
          <p className="font-mono text-[11px] text-muted-foreground">{c.year}</p>
        </div>
        <h2 className="mt-3 text-balance font-script text-[42px] font-semibold italic leading-none">{c.title}</h2>
        <p className="mt-4 text-pretty font-script text-xl italic leading-snug opacity-85">{c.story}</p>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-5">
        {c.photos.map((src, i) => (
          <Reveal key={i} className={`relative bg-photo p-2 pb-6 shadow-photo ${rot[i % 4]}`}>
            <span className="tape" />
             <FlipMedia src={src} label={`${c.year} · photo ${i + 1}`} description={src === base.photos[i] ? (base.descriptions[i] ?? "Text") : "Text"} />
          </Reveal>
        ))}
      </div>

      <Reveal className="relative mx-auto mt-10 w-[78%] rotate-1 bg-photo p-2 pb-8 shadow-photo">
        <span className="tape" />
         <FlipMedia src={c.highlight.src} label={`${c.year} · sweet moment`} description={c.highlight.src === base.highlight.src ? base.highlight.description : "Text"} highlight />
        <p className="mt-3 text-center font-hand text-2xl text-primary">{c.highlight.caption}</p>
      </Reveal>

      <Reveal><Envelope question={c.question} /></Reveal>
       <div className="relative mt-12 flex min-h-28 flex-col items-center justify-end text-center">
         {kissing && <div role="status" aria-live="polite" className="kiss-pop pointer-events-none absolute bottom-12 z-20 flex flex-col items-center">
           <span className="text-6xl" aria-hidden="true">💋</span>
           <span className="font-hand text-3xl text-primary">A kiss for you</span>
         </div>}
         <Button type="button" onClick={onContinue} disabled={kissing} className="rounded-full px-7 py-6 text-sm shadow-photo">
           {idx === CHAPTERS.length - 1 ? "A kiss, then our forever ♥" : `A kiss, then ${CHAPTERS[idx + 1]?.year ?? "the next chapter"} ♥`}
         </Button>
       </div>
    </section>
  );
}

function Finale() {
  const [days, setDays] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [bits, setBits] = useState<{ x: number; y: number; d: number; c: string }[]>([]);
  useEffect(() => {
    setDays(Math.floor((Date.now() - new Date(START_DATE).getTime()) / 86400000));
  }, []);
  const celebrate = () => {
    setRevealed(true);
    setBits(Array.from({ length: 36 }, () => ({
      x: (Math.random() - 0.5) * 340, y: (Math.random() - 0.9) * 420, d: Math.random() * 0.3, c: Math.random() > 0.5 ? "♥" : "✦",
    })));
  };
  return (
    <section className="relative overflow-hidden border-t border-border px-8 py-20 text-center">
      {["18%,22%", "30%,74%", "62%,28%", "72%,70%"].map((p, i) => {
        const [t, l] = p.split(",");
        return <span key={i} className="sparkle absolute text-primary" style={{ top: t, left: l, animationDelay: `${i * 0.5}s` }}>✦</span>;
      })}
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">And counting</p>
        <p className="mt-4 font-script text-[76px] font-semibold italic leading-none text-primary">
          {days === null ? "—" : days.toLocaleString()}
        </p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">days of loving you</p>
        <p className="mx-auto mt-8 max-w-[28ch] text-balance font-script text-2xl italic leading-snug">
          Whatever the next year holds, I'd choose you again — every single morning. Thank you for four years of being my favourite person.
        </p>
      </Reveal>

      <div className="relative mt-10 flex justify-center">
        {bits.map((b, i) => (
          <span key={i} className="burst pointer-events-none absolute left-1/2 top-1/2 text-xl text-accent"
            style={{ ["--x" as string]: `${b.x}px`, ["--y" as string]: `${b.y}px`, animationDelay: `${b.d}s` }}>{b.c}</span>
        ))}
        {revealed ? (
          <p className="animate-scale-in font-hand text-5xl text-primary">Candle Light Dinner and tofu😍😍 Yayyyy!!!</p>
        ) : (
          <button onClick={celebrate} className="rounded-full bg-primary px-7 py-3 text-sm font-medium tracking-wide text-primary-foreground shadow-photo">
            Open your surprise ♥
          </button>
        )}
      </div>
      <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {NAMES.me} &amp; {NAMES.her} · forever
      </p>
    </section>
  );
}

function Index() {
  const [openChapters, setOpenChapters] = useState(0);
  const [kissingChapter, setKissingChapter] = useState<number | null>(null);
  const [showFinale, setShowFinale] = useState(false);
  const kissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (kissTimer.current) clearTimeout(kissTimer.current); }, []);
  const beginStory = () => {
    setOpenChapters(1);
    requestAnimationFrame(() => document.getElementById("chapter-1")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const continueStory = (idx: number) => {
    if (kissingChapter !== null) return;
    setKissingChapter(idx);
    kissTimer.current = setTimeout(() => {
      if (idx === CHAPTERS.length - 1) setShowFinale(true);
      else setOpenChapters((count) => Math.max(count, idx + 2));
      setKissingChapter(null);
      requestAnimationFrame(() => document.getElementById(idx === CHAPTERS.length - 1 ? "finale" : `chapter-${idx + 2}`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }, 1400);
  };
  return (
    <main className="relative min-h-screen">
      <Petals />
      <MusicToggle />
      <div className="relative z-10 mx-auto max-w-[440px] bg-card/40 backdrop-blur-[2px]">
        <section className="relative flex min-h-svh flex-col items-center justify-center px-8 text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">A little storybook</p>
            <h1 className="mt-4 text-balance font-script text-[60px] font-semibold italic leading-[0.95]">
              {NAMES.me} <span className="font-hand text-primary">&amp;</span> {NAMES.her}
            </h1>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-border" />
              <p className="font-hand text-3xl text-primary">Four Years of Us</p>
              <span className="h-px w-8 bg-border" />
            </div>
            <p className="mx-auto mt-6 max-w-[26ch] text-pretty text-[13px] leading-relaxed text-muted-foreground">
              Every page is a year. Every photo, a heartbeat. Turn slowly, my love.
            </p>
            <button type="button" onClick={beginStory} className="mt-9 rounded-full bg-primary px-7 py-3 text-sm font-medium tracking-wide text-primary-foreground shadow-photo">
              Begin Our Story
            </button>
          </Reveal>
        </section>
         {CHAPTERS.slice(0, openChapters).map((c, i) => <Chapter key={i} c={c} idx={i} onContinue={() => continueStory(i)} kissing={kissingChapter === i} />)}
         {showFinale && <div id="finale"><Finale /></div>}
      </div>
    </main>
  );
}
