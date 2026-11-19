// src/utils/trafficTracker.js — gvtourplanners.com (customer site)
// Ovvoru page open / page maarumbodhu backend ku oru chinna "visit" anuppum.
// Login venaam. Fail aanaalum site ku edhuvum aagaadhu.
// main.jsx la:  import { startTrafficTracker } from "./utils/trafficTracker";  startTrafficTracker();
//
// Track aagradhu:
//   • Page view — ovvoru page open / maarumbodhu (thaane)
//   • Button / link click — thaane (button text illa data-track per)
//       <button data-track="Book Now – Kerala">Book Now</button>   ← per neenga kudukkalaam
//       <button data-track-ignore>…</button>                         ← track venaam
//   • Stage events — neenga code la kooppidanum:
//       import { trackEvent } from "../utils/trafficTracker";
//       trackEvent("Enquiry submitted", { destination: "Kerala" });

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const URL_TRACK = `${BACKEND}/api/touradmin/traffic/track`;

// Customer login aagirundhaa — unga site la token save aagura key (illana false)
const LOGIN_KEYS = ["token", "userToken", "utoken"];

const safeGet = (store, k) => { try { return store.getItem(k); } catch { return null; } };
const safeSet = (store, k, v) => { try { store.setItem(k, v); } catch { /* private mode */ } };
const rid = () =>
  (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);

let started = false;
let lastPath = "";

const send = (payload) => {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon && navigator.sendBeacon(URL_TRACK, new Blob([body], { type: "text/plain" }))) return;
  } catch { /* fall back */ }
  try {
    fetch(URL_TRACK, { method: "POST", body, headers: { "Content-Type": "text/plain" }, keepalive: true, mode: "no-cors" }).catch(() => {});
  } catch { /* ignore */ }
};

const ids = () => {
  let visitorId = safeGet(localStorage, "gv_vid");
  let isNew = false;
  if (!visitorId) { visitorId = rid(); isNew = true; safeSet(localStorage, "gv_vid", visitorId); }
  let sessionId = safeGet(sessionStorage, "gv_sid");
  if (!sessionId) { sessionId = rid(); safeSet(sessionStorage, "gv_sid", sessionId); }
  return { visitorId, sessionId, isNew };
};
const entrySource = () => {
  try { return JSON.parse(safeGet(sessionStorage, "gv_src") || "{}"); } catch { return {}; }
};
const common = () => ({
  referrer: entrySource().referrer || "",
  utm: entrySource().utm || null,
  path: window.location.pathname + window.location.search,
  screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
  lang: navigator.language || "",
  isLoggedIn: LOGIN_KEYS.some((k) => !!safeGet(localStorage, k)),
  // Login aana customer na token — backend verify panni user id mattum save pannum (token save aagaadhu)
  utoken: LOGIN_KEYS.map((k) => safeGet(localStorage, k)).find(Boolean) || undefined,
});

const track = () => {
  const path = window.location.pathname + window.location.search;
  if (path === lastPath) return; // adhe page thirumba
  lastPath = path;
  const { visitorId, sessionId, isNew } = ids();

  const q = new URLSearchParams(window.location.search);
  const urlUtm = q.get("utm_source") || q.get("utm_medium") || q.get("utm_campaign")
    ? { source: q.get("utm_source") || "", medium: q.get("utm_medium") || "", campaign: q.get("utm_campaign") || "" }
    : null;

  // Source (Google / Instagram / WhatsApp / utm) — visit oda mudhal page la eduththu,
  // andha visit la paarkkura ellaa page / click / event kum adhe source (sessionStorage).
  const firstInSession = !safeGet(sessionStorage, "gv_seen");
  safeSet(sessionStorage, "gv_seen", "1");
  if (firstInSession || urlUtm) {
    safeSet(sessionStorage, "gv_src", JSON.stringify({ referrer: firstInSession ? document.referrer || "" : "", utm: urlUtm }));
  }

  // title update aaga konjam wait
  setTimeout(() => {
    send({
      ...common(),
      type: "pageview",
      visitorId,
      sessionId,
      title: document.title || "",
      isNew: isNew && firstInSession,
    });
  }, 400);
};

// ─── Stage events (Enquiry submitted, Booking started, Payment done …) ───
export function trackEvent(name, props = null) {
  if (typeof window === "undefined" || !name) return;
  const { visitorId, sessionId } = ids();
  send({ ...common(), type: "event", name: String(name).slice(0, 80), props, visitorId, sessionId, title: document.title || "" });
}

// ─── Button / link clicks (thaane) ───
let lastClick = { key: "", t: 0 };
const onClick = (ev) => {
  const el = ev.target?.closest?.("[data-track], button, a, [role='button']");
  if (!el || el.closest("[data-track-ignore]")) return;
  if (el.matches("input, textarea, select")) return;
  const text = (el.getAttribute("data-track") || el.getAttribute("aria-label") || el.innerText || el.getAttribute("title") || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
  const href = el.tagName === "A" ? el.getAttribute("href") || "" : "";
  const name = text || (href ? `Link: ${href.slice(0, 60)}` : "");
  if (!name) return;
  const key = `${name}|${window.location.pathname}`;
  if (key === lastClick.key && Date.now() - lastClick.t < 800) return; // double click onnu dhaan
  lastClick = { key, t: Date.now() };
  const { visitorId, sessionId } = ids();
  send({
    ...common(),
    type: "click",
    name,
    props: href && /^https?:|^tel:|^mailto:|wa\.me|whatsapp/i.test(href) ? { href: href.slice(0, 120) } : null,
    visitorId,
    sessionId,
    title: document.title || "",
  });
};

// ─── LIVE ping: tab open + kannula theriyumbodhu mattum 20 sec ku oru thadava ───
const ping = (type = "ping") => {
  try {
    const { visitorId, sessionId } = ids();
    send({ type, visitorId, sessionId, isLoggedIn: LOGIN_KEYS.some((k) => !!safeGet(localStorage, k)) });
  } catch { /* ignore */ }
};

export function startTrafficTracker() {
  if (started || typeof window === "undefined") return;
  started = true;
  track();
  setInterval(() => { if (!document.hidden) ping(); }, 20000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) ping(); });
  window.addEventListener("pagehide", () => ping("bye")); // tab close / site vittu poonaa udane Live la irundhu eduththudum
  // React Router page maarumbodhu
  for (const fn of ["pushState", "replaceState"]) {
    const orig = history[fn];
    history[fn] = function (...args) {
      const r = orig.apply(this, args);
      setTimeout(track, 0);
      return r;
    };
  }
  window.addEventListener("popstate", track);
  document.addEventListener("click", onClick, true);
}