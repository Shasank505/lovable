import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-NTnNiZ-k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function shrink(file) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			const s = Math.min(1, 900 / Math.max(img.width, img.height));
			const c = document.createElement("canvas");
			c.width = img.width * s;
			c.height = img.height * s;
			c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
			resolve(c.toDataURL("image/jpeg", .75));
			URL.revokeObjectURL(img.src);
		};
		img.onerror = reject;
		img.src = URL.createObjectURL(file);
	});
}
function parse(text) {
	const get = (k) => text.match(new RegExp(`${k}:\\s*([\\s\\S]*?)(?=\\n[A-Z]+:|$)`))?.[1]?.trim() ?? "";
	return {
		title: get("TITLE"),
		story: get("STORY"),
		caption: get("CAPTION"),
		question: get("QUESTION")
	};
}
function ChapterWriter({ year, names, onSave, onClose }) {
	const [memories, setMemories] = (0, import_react.useState)("");
	const [photos, setPhotos] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)(null);
	const addPhotos = async (files) => {
		if (!files) return;
		const list = await Promise.all(Array.from(files).filter((f) => f.type.startsWith("image/")).map(shrink));
		setPhotos((p) => [...p, ...list].slice(0, 5));
	};
	const write = async () => {
		setBusy(true);
		setErr("");
		try {
			const res = await fetch("/api/write-chapter", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					year,
					names,
					memories,
					photos: photos.slice(0, 4)
				})
			});
			const text = await res.text();
			if (!res.ok) throw new Error(text);
			setDraft(parse(text));
		} catch (e) {
			setErr(e.message || "Something went wrong.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 backdrop-blur-sm sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[92svh] w-full max-w-[440px] overflow-y-auto rounded-t-3xl bg-card p-6 shadow-photo sm:rounded-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.3em] text-primary",
						children: ["Write ", year]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "text-xl text-muted-foreground",
						"aria-label": "Close",
						children: "×"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block font-script text-xl italic",
					children: "Your memories from this year"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: memories,
					onChange: (e) => setMemories(e.target.value),
					rows: 6,
					placeholder: "Trips, inside jokes, fights, little moments…",
					className: "mt-2 w-full rounded-xl bg-blush p-3 text-sm outline-none ring-1 ring-border focus:ring-primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block font-script text-xl italic",
					children: "Photos (up to 5 — the first is the highlight)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/*",
					multiple: true,
					onChange: (e) => addPhotos(e.target.files),
					className: "mt-2 text-xs"
				}),
				photos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-5 gap-2",
					children: photos.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setPhotos((l) => l.filter((_, j) => j !== i)),
						"aria-label": "Remove photo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p,
							alt: "",
							className: "aspect-square w-full rounded object-cover"
						})
					}, i))
				}),
				err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-destructive",
					children: err
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: write,
					disabled: busy || !memories.trim(),
					className: "mt-5 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground disabled:opacity-50",
					children: busy ? "Writing with love…" : draft ? "Write again" : "Write this chapter ✦"
				}),
				draft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3 rounded-2xl bg-blush p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draft.title,
							onChange: (e) => setDraft({
								...draft,
								title: e.target.value
							}),
							className: "w-full bg-transparent font-script text-3xl italic outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: draft.story,
							onChange: (e) => setDraft({
								...draft,
								story: e.target.value
							}),
							rows: 5,
							className: "w-full bg-transparent font-script text-lg italic outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draft.caption,
							onChange: (e) => setDraft({
								...draft,
								caption: e.target.value
							}),
							className: "w-full bg-transparent font-hand text-xl text-primary outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: draft.question,
							onChange: (e) => setDraft({
								...draft,
								question: e.target.value
							}),
							rows: 2,
							className: "w-full bg-transparent text-sm outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onSave({
								...draft,
								photos
							}),
							className: "w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground",
							children: "Put it in the book ♥"
						})
					]
				})
			]
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var IMG_20260926_085225_036_default = "/assets/IMG_20260926_085225_036-Dwu-eNhz.jpg";
var IMG_20260926_084904_786_default = "/assets/IMG_20260926_084904_786-DibJUusX.jpg";
var Screenshot_20260926_091200_Instagram_2_default = "/assets/Screenshot_20260926-091200_Instagram-2-BsHbic0_.jpg";
var Screenshot_20260926_091221_Instagram_2_default = "/assets/Screenshot_20260926-091221_Instagram-2-5uQHSjiR.jpg";
var Screenshot_20260926_091234_Instagram_2_default = "/assets/Screenshot_20260926-091234_Instagram-2-D5i9GNOf.jpg";
var NAMES = {
	me: "Shasank",
	her: "Rashmi"
};
var START_DATE = "2022-09-28";
var CHAPTERS = [
	{
		no: "One",
		year: "Year 1",
		title: "Where It Began",
		story: "It started with one Instagram message from you — \"hey, are you preparing for NDA?\" — and a conversation that simply refused to end. Then the college reading room: I held your hand, and you smiled, \"has anyone given you a dare?\"",
		photos: [
			IMG_20260926_085225_036_default,
			Screenshot_20260926_091200_Instagram_2_default,
			Screenshot_20260926_091234_Instagram_2_default,
			Screenshot_20260926_091221_Instagram_2_default
		],
		descriptions: [
			"Sabse chhotu birthday gift dia tha tu isse bhi bohot happy hogai thi :)",
			"Jab Ham pehli baar mile the tune hair cut lia tha iss time hamne first hand cuddle wala photo lia tha",
			"first time Ham party me gye the, hamne bohot dance kia the oo antava pe ",
			"Hamara first cultural fest the, tu kitni khubsurat lag rahi thi aur hamne saath me garba kia tha "
		],
		highlight: {
			src: IMG_20260926_084904_786_default,
			caption: "our first movie date",
			description: "Hamara first movie date , tu apne didi ko laayi thi , fir ham dono saath baithe the aur maine tujhe kiss kia tha(First kiss ka intiative maine kia tha) , wo lift wala kiss wow"
		},
		question: "Be honest — how long had you been waiting to say that dare line?"
	},
	{
		no: "Two",
		year: "Year 2",
		title: "Learning Each Other",
		story: "Late-night talks, silly fights, making up with ice cream. We learned each other's quiet languages.",
		photos: [
			"",
			"",
			"",
			""
		],
		descriptions: [
			"Text",
			"Text",
			"Text",
			"Text"
		],
		highlight: {
			src: "",
			caption: "our favourite day",
			description: "Text"
		},
		question: "Which little habit of mine secretly makes you smile?"
	},
	{
		no: "Three",
		year: "Year 3",
		title: "Growing Together",
		story: "New places, new dreams, the same hand to hold. Somewhere along the way, you became home.",
		photos: [
			"",
			"",
			"",
			""
		],
		descriptions: [
			"Text",
			"Text",
			"Text",
			"Text"
		],
		highlight: {
			src: "",
			caption: "you, laughing",
			description: "Text"
		},
		question: "Where in the world would you run away with me tomorrow?"
	},
	{
		no: "Four",
		year: "Year 4",
		title: "Still Falling",
		story: "Four years in and I still look at you like the first day. Every chapter with you is my favourite one.",
		photos: [
			"",
			"",
			"",
			""
		],
		descriptions: [
			"Text",
			"Text",
			"Text",
			"Text"
		],
		highlight: {
			src: "",
			caption: "today & always",
			description: "Text"
		},
		question: "What's one dream you want us to chase next?"
	}
];
var MUSIC_URL = "/music/lovely.mp3";
function Reveal({ children, className = "" }) {
	const ref = (0, import_react.useRef)(null);
	const [inView, setInView] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => e?.isIntersecting && setInView(true), { threshold: .15 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: `reveal ${inView ? "in" : ""} ${className}`,
		children
	});
}
function Media({ src, label }) {
	if (!src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid aspect-square place-items-center bg-blush text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "px-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground",
			children: label
		})
	});
	if (src.endsWith(".mp4")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		src,
		className: "aspect-square w-full bg-blush object-contain",
		autoPlay: true,
		muted: true,
		loop: true,
		playsInline: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: label,
		loading: "lazy",
		className: "aspect-square w-full bg-blush object-contain"
	});
}
function FlipMedia({ src, label, description, highlight = false }) {
	const [flipped, setFlipped] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "ghost",
		"aria-label": `${label} — ${flipped ? "show photo" : "read memory"}`,
		"aria-pressed": flipped,
		onClick: () => setFlipped((value) => !value),
		className: "flip-scene block aspect-square h-auto w-full rounded-none p-0 shadow-none hover:bg-transparent",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `flip-inner relative block h-full w-full ${flipped ? "is-flipped" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flip-face absolute inset-0 block overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Media, {
					src,
					label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute bottom-0 right-0 bg-card/85 px-2 py-1 font-mono text-[9px] uppercase text-foreground",
					children: "Tap to turn ↺"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `flip-face flip-back absolute inset-0 flex items-center justify-center overflow-y-auto bg-blush p-2 text-center font-script italic normal-case whitespace-normal text-foreground ${highlight ? "text-[16px] leading-tight" : "text-[13px] leading-tight"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block max-h-full overflow-y-auto",
					children: description || "Text"
				})
			})]
		})
	});
}
function Petals() {
	const [petals, setPetals] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setPetals(Array.from({ length: 14 }, () => ({
			left: Math.random() * 100,
			delay: Math.random() * 12,
			dur: 10 + Math.random() * 10,
			s: .6 + Math.random() * .8
		})));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-0 z-0 overflow-hidden",
		children: petals.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "petal",
			style: {
				left: `${p.left}%`,
				animationDelay: `${p.delay}s`,
				animationDuration: `${p.dur}s`,
				scale: `${p.s}`
			}
		}, i))
	});
}
function MusicToggle() {
	const audio = (0, import_react.useRef)(null);
	const [on, setOn] = (0, import_react.useState)(false);
	const toggle = () => {
		if (!audio.current || false) return setOn((v) => !v);
		if (on) audio.current.pause();
		else audio.current.play().catch(() => {});
		setOn(!on);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
		ref: audio,
		src: MUSIC_URL,
		loop: true
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: toggle,
		"aria-label": "Toggle music",
		className: "fixed right-4 top-4 z-40 flex items-center gap-1.5 rounded-full bg-card/70 px-3 py-2 text-[11px] font-medium text-foreground ring-1 ring-border backdrop-blur-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm leading-none text-primary",
				children: on ? "♫" : "♪"
			}),
			" ",
			on ? "Playing" : "Music off"
		]
	})] });
}
function Envelope({ question }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setOpen((v) => !v),
		className: "mt-9 w-full rounded-2xl bg-card/70 p-5 text-left shadow-photo ring-1 ring-border backdrop-blur-md transition-transform active:scale-[0.98]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.25em] text-primary",
					children: "A sealed question"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-xl leading-none text-primary transition-transform duration-500 ${open ? "rotate-180" : ""}`,
					children: open ? "✉" : "♥"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid transition-all duration-700 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "overflow-hidden pt-3 font-script text-2xl italic leading-snug",
					children: question
				})
			}),
			!open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-script text-lg italic text-muted-foreground",
				children: "Tap to break the seal…"
			})
		]
	});
}
function Chapter({ c: base, idx, onContinue, kissing }) {
	const rot = [
		"-rotate-2",
		"rotate-2 mt-4",
		"rotate-1",
		"-rotate-1 mt-4"
	];
	const key = `chapter-draft-${idx}`;
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [writing, setWriting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const s = localStorage.getItem(key);
			if (s) setDraft(JSON.parse(s));
		} catch {}
	}, [key]);
	const save = (d) => {
		setDraft(d);
		setWriting(false);
		try {
			localStorage.setItem(key, JSON.stringify(d));
		} catch {
			alert("Saved for now, but the photos are too large to keep after a refresh.");
		}
	};
	const c = draft ? {
		...base,
		title: draft.title || base.title,
		story: draft.story || base.story,
		question: draft.question || base.question,
		highlight: {
			...base.highlight,
			src: draft.photos[0] ?? base.highlight.src,
			caption: draft.caption || base.highlight.caption
		},
		photos: base.photos.map((p, i) => draft.photos[i + 1] ?? p)
	} : base;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: `chapter-${idx + 1}`,
		className: "relative border-t border-border px-6 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.3em] text-primary",
						children: ["Chapter ", c.no]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] text-muted-foreground",
						children: c.year
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-balance font-script text-[42px] font-semibold italic leading-none",
					children: c.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-pretty font-script text-xl italic leading-snug opacity-85",
					children: c.story
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setWriting(true),
					className: "mt-4 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary ring-1 ring-border",
					children: [
						"✦ ",
						draft ? "Rewrite" : "Write",
						" this year with AI"
					]
				})
			] }),
			writing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChapterWriter, {
				year: c.year,
				names: NAMES,
				onSave: save,
				onClose: () => setWriting(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-5",
				children: c.photos.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: `relative bg-photo p-2 pb-6 shadow-photo ${rot[i % 4]}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tape" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipMedia, {
						src,
						label: `${c.year} · photo ${i + 1}`,
						description: src === base.photos[i] ? base.descriptions[i] ?? "Text" : "Text"
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "relative mx-auto mt-10 w-[78%] rotate-1 bg-photo p-2 pb-8 shadow-photo",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tape" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipMedia, {
						src: c.highlight.src,
						label: `${c.year} · sweet moment`,
						description: c.highlight.src === base.highlight.src ? base.highlight.description : "Text",
						highlight: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center font-hand text-2xl text-primary",
						children: c.highlight.caption
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Envelope, { question: c.question }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-12 flex min-h-28 flex-col items-center justify-end text-center",
				children: [kissing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "status",
					"aria-live": "polite",
					className: "kiss-pop pointer-events-none absolute bottom-12 z-20 flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-6xl",
						"aria-hidden": "true",
						children: "💋"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-hand text-3xl text-primary",
						children: "A kiss for you"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: onContinue,
					disabled: kissing,
					className: "rounded-full px-7 py-6 text-sm shadow-photo",
					children: idx === CHAPTERS.length - 1 ? "A kiss, then our forever ♥" : `A kiss, then ${CHAPTERS[idx + 1].year} ♥`
				})]
			})
		]
	});
}
function Finale() {
	const [days, setDays] = (0, import_react.useState)(null);
	const [revealed, setRevealed] = (0, import_react.useState)(false);
	const [bits, setBits] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setDays(Math.floor((Date.now() - (/* @__PURE__ */ new Date(START_DATE)).getTime()) / 864e5));
	}, []);
	const celebrate = () => {
		setRevealed(true);
		setBits(Array.from({ length: 36 }, () => ({
			x: (Math.random() - .5) * 340,
			y: (Math.random() - .9) * 420,
			d: Math.random() * .3,
			c: Math.random() > .5 ? "♥" : "✦"
		})));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden border-t border-border px-8 py-20 text-center",
		children: [
			[
				"18%,22%",
				"30%,74%",
				"62%,28%",
				"72%,70%"
			].map((p, i) => {
				const [t, l] = p.split(",");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sparkle absolute text-primary",
					style: {
						top: t,
						left: l,
						animationDelay: `${i * .5}s`
					},
					children: "✦"
				}, i);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground",
					children: "And counting"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-script text-[76px] font-semibold italic leading-none text-primary",
					children: days === null ? "—" : days.toLocaleString()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground",
					children: "days of loving you"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-8 max-w-[28ch] text-balance font-script text-2xl italic leading-snug",
					children: "Whatever the next year holds, I'd choose you again — every single morning. Thank you for four years of being my favourite person."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-10 flex justify-center",
				children: [bits.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "burst pointer-events-none absolute left-1/2 top-1/2 text-xl text-accent",
					style: {
						["--x"]: `${b.x}px`,
						["--y"]: `${b.y}px`,
						animationDelay: `${b.d}s`
					},
					children: b.c
				}, i)), revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "animate-scale-in font-hand text-5xl text-primary",
					children: "Happy Anniversary"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: celebrate,
					className: "rounded-full bg-primary px-7 py-3 text-sm font-medium tracking-wide text-primary-foreground shadow-photo",
					children: "Open your surprise ♥"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
				children: [
					NAMES.me,
					" & ",
					NAMES.her,
					" · forever"
				]
			})
		]
	});
}
function Index() {
	const [openChapters, setOpenChapters] = (0, import_react.useState)(1);
	const [kissingChapter, setKissingChapter] = (0, import_react.useState)(null);
	const [showFinale, setShowFinale] = (0, import_react.useState)(false);
	const kissTimer = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => {
		if (kissTimer.current) clearTimeout(kissTimer.current);
	}, []);
	const continueStory = (idx) => {
		if (kissingChapter !== null) return;
		setKissingChapter(idx);
		kissTimer.current = setTimeout(() => {
			if (idx === CHAPTERS.length - 1) setShowFinale(true);
			else setOpenChapters((count) => Math.max(count, idx + 2));
			setKissingChapter(null);
			requestAnimationFrame(() => document.getElementById(idx === CHAPTERS.length - 1 ? "finale" : `chapter-${idx + 2}`)?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			}));
		}, 1400);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Petals, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MusicToggle, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto max-w-[440px] bg-card/40 backdrop-blur-[2px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "relative flex min-h-svh flex-col items-center justify-center px-8 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground",
								children: "A little storybook"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-4 text-balance font-script text-[60px] font-semibold italic leading-[0.95]",
								children: [
									NAMES.me,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-hand text-primary",
										children: "&"
									}),
									" ",
									NAMES.her
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex items-center justify-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-border" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-hand text-3xl text-primary",
										children: "Four Years of Us"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-border" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-6 max-w-[26ch] text-pretty text-[13px] leading-relaxed text-muted-foreground",
								children: "Every page is a year. Every photo, a heartbeat. Turn slowly, my love."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#chapter-1",
								className: "mt-9 inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium tracking-wide text-primary-foreground shadow-photo",
								children: "Begin Our Story"
							})
						] })
					}),
					CHAPTERS.slice(0, openChapters).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chapter, {
						c,
						idx: i,
						onContinue: () => continueStory(i),
						kissing: kissingChapter === i
					}, i)),
					showFinale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "finale",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Finale, {})
					})
				]
			})
		]
	});
}
//#endregion
export { Index as component };
