import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Gift,
  Maximize2,
  MessageSquare,
  PlusCircle,
  Search,
  Tag,
  User,
  Users,
  X,
} from "lucide-react";

// Web3Forms access key. Registrations are emailed here.
const WEB3FORMS_ACCESS_KEY = "f2f2230b-4a2f-4ace-a1cf-af842d66df42";

// --- colour helpers ---------------------------------------------------------
const hexRgb = (h) => {
  const n = parseInt(h.slice(1), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
};
const darken = (h, f) => {
  const n = parseInt(h.slice(1), 16);
  let r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  r = Math.round(r * (1 - f));
  g = Math.round(g * (1 - f));
  b = Math.round(b * (1 - f));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
const lighten = (h, f) => {
  const n = parseInt(h.slice(1), 16);
  let r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  r = Math.round(r + (255 - r) * f);
  g = Math.round(g + (255 - g) * f);
  b = Math.round(b + (255 - b) * f);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// --- audience-dependent content --------------------------------------------
const CONTENT = {
  employer: {
    accent: "#0b5d4f",
    heroSub:
      "Recruit permanent staff, book available freelancers and manage your regular crew.",
    slides: [
      { src: "c-home-v3.webp", alt: "Motorsport recruitment dashboard for race teams and employers", caption: "Dashboard" },
      { src: "c-staff.webp", alt: "Motorsport staff portal to manage race team crew", caption: "Staff Portal" },
      { src: "c-calendar.webp", alt: "Employer calendar for planning motorsport race weekends", caption: "Employer Calendar" },
      { src: "c-discover.webp", alt: "Discover freelance and permanent motorsport staff", caption: "Freelancer & Employee Discovery" },
      { src: "c-permanent.webp", alt: "Permanent motorsport jobs — full and part time roles", caption: "Full/Part Time Roles" },
      { src: "c-freelance.webp", alt: "Freelance motorsport jobs for race weekend contracts", caption: "Freelance Roles" },
    ],
    painLead:
      "Been let down and now ringing round for a replacement? Trust and word of mouth only work if the right person happens to be free.",
    pains: [
      "Going back to the same names because they are the ones you have numbers for",
      "Availability buried in WhatsApp threads and spreadsheets",
      "No single record of who you have worked with, and who was good",
      "Adverts lost amongst overpriced job boards",
    ],
    painClose: "One profile, tailored to your team or business, helping you widen your network and bring better quality work throughout the season.",
    pillIcon: Building2,
    pillLabel: "For employers",
    pillText: "Post roles, find crew and manage your team",
    cards: [
      { Icon: PlusCircle, title: "Post in 60 Seconds", desc: "Freelance and Full/Part Time roles live in under a minute." },
      { Icon: Users, title: "Staff Portal", desc: "Your pre-existing network all in one place. View their availability and send direct offers." },
      { Icon: Calendar, title: "Employer Calendar", desc: "Event planning made simple. Publish your schedule for your whole network to see." },
      { Icon: Search, title: "Freelancer & Employee Discovery", desc: "Browse the full network. Filter by role, location, availability." },
    ],
    pricing: [
      {
        tier: "Free",
        price: "£0",
        per: "",
        color: "#6b7280",
        pop: false,
        features: [
          "1 Freelance Job Post/Month",
          "Full/Part Time Listings (Pay per Post)",
          "Direct Messaging",
          "Freelancer & Employee Availability View",
        ],
      },
      {
        tier: "Pro",
        price: "£49.99",
        per: "/mo",
        color: "#0b5d4f",
        pop: true,
        popLabel: "Most popular",
        features: [
          "Unlimited Freelance Job Posts",
          "1 Standard Full/Part Time Listing per 6 Months",
          "Staff Portal & Roster",
          "Employer Calendar",
          "AI Freelancer & Employee Matching",
          "Full Freelancer & Employee Discovery",
        ],
      },
    ],
    faqSub: "For employers.",
    faqs: [
      { q: "What does it cost to post a role?", a: "Pricing will be tier based, with a free tier and paid tiers. Full pricing will be announced soon — register your interest now to be the first to know." },
      { q: "How quickly can I fill a gap?", a: "Post a job within 60 seconds and receive applications from available freelancers. You can also send direct offers to freelancers you've previously hired and to your pre-existing team through your custom Staff Portal, where you can manage your crew." },
      { q: "I'm the parent of a driver - can I use this?", a: "Absolutely. Anyone can search the network and book the right person directly, whether you are a team, a business or a parent supporting a young driver." },
      { q: "Do you take commission on bookings?", a: "No. Pay is agreed and handled directly between you and the freelancer or employee. We never take a cut." },
    ],
    roles: [
      "Race Team", "Karting Team", "Manufacturer", "Team Owner / Principal", "Parts / Equipment Supplier",
      "Engineering / Technical Company", "Championship / Series Organiser", "Circuit / Track Operator",
      "Trackday Company", "Driving Academy / School", "Sim / Esports Operation", "Hospitality / Events Company",
      "Media / Marketing Agency", "Other",
    ],
    rolePlaceholder: "We are a…",
  },
  contractor: {
    accent: "#7c3aed",
    heroSub:
      "Build your profile, showcase your talent and apply for freelance or permanent roles in seconds.",
    slides: [
      { src: "c-con-home2.webp", alt: "Motorsport freelancer dashboard and profile", caption: "Your Dashboard" },
      { src: "c-con-freelance.webp", alt: "Freelance motorsport jobs and race weekend contracts", caption: "Freelance Jobs" },
      { src: "c-con-permanent.webp", alt: "Permanent motorsport jobs — full and part time roles", caption: "Full/Part Time Roles" },
      { src: "c-con-teams-nb.webp", alt: "Motorsport freelancer team and booking management", caption: "My Teams" },
    ],
    painLead:
      "You know you can do the job. But without the network, opportunities go missed and dates sit empty.",
    pains: [
      "Sending the same CV and day rate to team after team",
      "Hearing about work only after it has been filled",
      "Nowhere to showcase your availability and experience",
      "Old fashioned job boards full of expired listings",
    ],
    painClose: "One profile, tailored to your role in motorsport, helping to widen your network and bring more opportunities throughout the season.",
    pillIcon: User,
    pillLabel: "For freelancers & employees",
    pillText: "Build a profile, stay visible and apply in seconds",
    cards: [
      { Icon: FileText, title: "Create Your Profile", desc: "Your CV, experience and availability held in one profile that works for every application." },
      { Icon: Calendar, title: "Live Availability", desc: "Set your free dates across the year so employers can see before they ask." },
      { Icon: Briefcase, title: "Freelance & Permanent Jobs", desc: "Browse and apply across both marketplaces. Filter by role, location and rate." },
      { Icon: MessageSquare, title: "Direct Messaging", desc: "Talk to employers directly. Every conversation tied to a booking." },
    ],
    pricing: [
      {
        tier: "Free",
        price: "£0",
        per: "",
        color: "#6b7280",
        pop: false,
        features: [
          "Access to Only: Staff Portal and Full/Part Time Job Marketplace",
          "Apply to 1 Full/Part Time Role",
          "Receive Private Offers",
          "CV & Profile Hosting",
        ],
      },
      {
        tier: "Pro",
        price: "£14.99",
        per: "/mo",
        color: "#7c3aed",
        pop: true,
        popLabel: "Freelancers pick this",
        features: [
          "Access to All Features and Marketplaces",
          "Unlimited Full/Part Time Applications",
          "Full Freelance Job Marketplace",
          "Apply to Any Freelance Role",
          "Priority Search Visibility",
          "Full Profile & Ratings",
        ],
      },
    ],
    faqSub: "For freelancers and employees.",
    faqs: [
      { q: "What does it cost to join?", a: "Pricing will be tier based, with a free tier and paid tiers. Full pricing will be announced soon — register your interest now to be the first to know." },
      { q: "How do employers find me?", a: "Your profile holds your CV, experience and live availability, so employers can find you and send direct offers before a role is even advertised. You can also apply to unlimited jobs to widen your network." },
      { q: "What kind of work is on here?", a: "There is a freelance marketplace for one-off jobs or race weekend contracts, alongside the permanent jobs marketplace where you can find full / part time jobs, both featuring roles across every area of motorsport." },
      { q: "Do you take a cut of what I earn?", a: "No. Your pay is agreed directly with the employer. We never take a cut." },
    ],
    roles: [
      "Data Analyst", "Driver Coach", "Hospitality Team Member", "Kart Mechanic", "Mechanic",
      "Performance Engineer", "Photographer / Videographer", "Race Engineer", "Sim Racer",
      "Student / Apprentice", "Team Manager", "Transport / HGV Driver", "Other",
    ],
    rolePlaceholder: "I'm a…",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EarlyInterestLanding() {
  const [mode, setMode] = useState("employer");
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState(false); // fullscreen image viewer
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot: hidden field only bots fill
  const [role, setRole] = useState("");
  const [rolesOpen, setRolesOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const dragRef = useRef(null);

  const isEmp = mode === "employer";
  const c = CONTENT[mode];

  // derived theme colours
  const theme = useMemo(() => {
    const accent = c.accent;
    const rgb = hexRgb(accent);
    return {
      accent,
      accentDark: darken(accent, 0.28),
      accentSoft: `rgba(${rgb},0.10)`,
      accentBorder: `rgba(${rgb},0.24)`,
      accentShadow: `rgba(${rgb},0.42)`,
      ambientBg: `radial-gradient(circle, rgba(${rgb},0.09) 0%, rgba(${rgb},0) 62%)`,
      ambientBg2: `radial-gradient(circle, rgba(${rgb},0.12) 0%, rgba(${rgb},0) 64%)`,
      bannerBg: `linear-gradient(90deg, ${accent}, ${darken(accent, 0.28)})`,
      bannerAccent: lighten(accent, 0.62),
      promoBg: `linear-gradient(135deg, ${accent}, ${darken(accent, 0.28)})`,
      promoIcon: lighten(accent, 0.6),
    };
  }, [c.accent]);

  const slides = c.slides;
  const count = slides.length;
  const activeCaption = slides[slide]?.caption ?? slides[0].caption;

  const switchMode = (m) => {
    setMode(m);
    setRole("");
    setSlide(0);
    setError("");
    setRolesOpen(false);
  };

  const prevSlide = () => setSlide((s) => (s + count - 1) % count);
  const nextSlide = () => setSlide((s) => (s + 1) % count);

  const onTouchStart = (e) => {
    dragRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (dragRef.current == null) return;
    const dx = e.changedTouches[0].clientX - dragRef.current;
    dragRef.current = null;
    if (dx < -40) nextSlide();
    else if (dx > 40) prevSlide();
  };
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse") dragRef.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (e.pointerType !== "mouse" || dragRef.current == null) return;
    const dx = e.clientX - dragRef.current;
    dragRef.current = null;
    if (dx < -40) nextSlide();
    else if (dx > 40) prevSlide();
  };

  const valid = EMAIL_RE.test(email.trim());
  const ready = valid && !!role;

  const submit = useCallback(() => {
    if (hp) {
      // Honeypot filled → almost certainly a bot. Show success, send nothing.
      setSubmitted(true);
      return;
    }
    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!role) {
      setError("Please tell us which role you fit.");
      return;
    }
    const cleanEmail = email.trim();
    try {
      const arr = JSON.parse(localStorage.getItem("mc_waitlist") || "[]");
      arr.push({ email: cleanEmail, role, mode, at: new Date().toISOString() });
      localStorage.setItem("mc_waitlist", JSON.stringify(arr));
    } catch (e) {
      /* storage unavailable — non-fatal */
    }
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "New Motorsport Connector registration",
        from_name: "Motorsport Connector",
        email: cleanEmail,
        role,
        botcheck: "", // Web3Forms native spam field (empty for humans)
        message:
          "New registration\nType: " +
          (mode === "employer" ? "Employer" : "Freelancer / Employee") +
          "\nEmail: " +
          cleanEmail +
          "\nRole: " +
          role,
      }),
    }).catch(() => {});
    setSubmitted(true);
    setError("");
  }, [email, role, mode, hp]);

  // shared inline style fragments
  const tabBase = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    padding: "9px 20px",
    borderRadius: 999,
    border: "none",
    fontSize: "0.75rem",
    fontWeight: 800,
    cursor: "pointer",
    transition: "all 0.18s ease",
    letterSpacing: "-0.01em",
    whiteSpace: "nowrap",
  };
  const tabBaseSm = {
    flex: 1,
    padding: "10px 8px",
    borderRadius: 9,
    border: "none",
    fontSize: "0.8rem",
    fontWeight: 800,
    cursor: "pointer",
    transition: "all 0.15s ease",
    letterSpacing: "-0.01em",
  };
  const selStyle = {
    background: theme.accent,
    color: "#fff",
    boxShadow: `0 3px 10px -3px ${theme.accentShadow}`,
  };
  const offStyle = { background: "transparent", color: "#6b7280" };

  const PillIcon = c.pillIcon;

  return (
    <div
      className="mc-landing"
      style={{
        position: "relative",
        overflowX: "hidden",
        background: "#ffffff",
        "--accent": theme.accent,
        "--accent-soft": theme.accentSoft,
      }}
    >
      <style>{CSS}</style>

      {/* ROLLING PROMO BANNER */}
      <div
        style={{
          position: "relative",
          zIndex: 40,
          overflow: "hidden",
          background: theme.bannerBg,
          transition: "background 0.4s ease",
        }}
      >
        <div className="mc-marquee" style={{ display: "flex", width: "max-content" }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 26px",
                fontSize: "0.74rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: theme.bannerAccent, display: "inline-flex" }}>
                <Gift size={14} strokeWidth={2.1} />
              </span>
              Founding members, register your interest now and get your first month free. Limited early spots.
            </span>
          ))}
        </div>
      </div>

      {/* ambient glows */}
      <div
        className="mc-blob1"
        style={{
          position: "absolute",
          top: "-8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 1100,
          height: 820,
          borderRadius: "50%",
          background: theme.ambientBg,
          pointerEvents: "none",
          zIndex: 0,
          transition: "background 0.4s ease",
        }}
      />
      <div
        className="mc-blob2"
        style={{
          position: "absolute",
          top: "34%",
          right: "-14%",
          width: 620,
          height: 620,
          borderRadius: "50%",
          background: theme.ambientBg2,
          pointerEvents: "none",
          zIndex: 0,
          transition: "background 0.4s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: 420,
          background: `linear-gradient(180deg, ${theme.accentSoft} 0%, rgba(255,255,255,0) 100%)`,
          opacity: 0.5,
          pointerEvents: "none",
          zIndex: 0,
          transition: "background 0.4s ease",
        }}
      />

      {/* NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.72)",
          borderBottom: "1px solid rgba(15,23,16,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
            <img
              src="/assets/mc-logo.png"
              alt="Motorsport Connector"
              style={{ height: 28, objectFit: "contain", display: "block", flexShrink: 0 }}
            />
            <span
              className="mc-nav-tag"
              style={{
                fontSize: "0.74rem",
                fontWeight: 600,
                color: "#6b7280",
                letterSpacing: "0.01em",
                paddingLeft: 14,
                borderLeft: "1px solid #e5e7eb",
                whiteSpace: "nowrap",
              }}
            >
              Connecting the paddock
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <a href="#glimpse" className="mc-nav-link" style={navLink}>
              Features
            </a>
            <a href="#pricing" className="mc-nav-link" style={navLink}>
              Pricing
            </a>
            <a href="#faq" className="mc-nav-link" style={navLink}>
              FAQ
            </a>
            <a
              href="#register"
              className="mc-lift"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 18px",
                borderRadius: 999,
                background: theme.accent,
                border: `1px solid ${theme.accent}`,
                color: "#fff",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
                lineHeight: 1,
                flexShrink: 0,
                transition: "background 0.3s ease, transform 0.2s ease",
                boxShadow: `0 6px 18px -8px ${theme.accentShadow}`,
              }}
            >
              Register interest
            </a>
          </div>
        </div>
      </nav>

      {/* TOGGLE ROW */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6b7280", textAlign: "center" }}>
          Which one sounds like you?
        </div>
        <div
          style={{
            display: "inline-flex",
            gap: 4,
            padding: 4,
            borderRadius: 999,
            background: "#f3f4f6",
            border: "1px solid #ececec",
          }}
        >
          <button onClick={() => switchMode("employer")} style={{ ...tabBase, ...(isEmp ? selStyle : offStyle) }}>
            <Building2 size={13} strokeWidth={2} />
            I'm an Employer
          </button>
          <button onClick={() => switchMode("contractor")} style={{ ...tabBase, ...(!isEmp ? selStyle : offStyle) }}>
            <User size={13} strokeWidth={2} />
            I'm a Freelancer/Employee
          </button>
        </div>
      </section>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 820,
          margin: "0 auto",
          padding: "20px 24px 8px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 15px",
            borderRadius: 999,
            background: theme.accentSoft,
            border: `1px solid ${theme.accentBorder}`,
            fontSize: "0.68rem",
            fontWeight: 800,
            color: theme.accent,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 20,
            transition: "all 0.3s ease",
            whiteSpace: "nowrap",
          }}
        >
          <span
            className="mc-blink"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: theme.accent,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          Launching soon
        </span>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 5.2vw, 4.7rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.048em",
            margin: "0 0 14px",
            textTransform: "uppercase",
            textWrap: "balance",
          }}
        >
          <span style={{ display: "block", color: "#0f1710" }}>The home of</span>
          <span style={{ display: "block", color: "#0f1710" }}>motorsport</span>
          <span style={{ display: "block", color: theme.accent, transition: "color 0.3s ease" }}>recruitment</span>
        </h1>
        <div
          style={{
            width: 48,
            height: 3,
            borderRadius: 2,
            background: theme.accent,
            margin: "0 auto 16px",
            transition: "background 0.3s ease",
          }}
        />
        <p
          style={{
            fontSize: "1.1rem",
            fontWeight: 500,
            lineHeight: 1.55,
            color: "#4b5563",
            margin: "0 auto 28px",
            maxWidth: 500,
            textWrap: "pretty",
          }}
        >
          {c.heroSub}
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="#register"
            className="mc-lift"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 26px",
              borderRadius: 12,
              fontSize: "0.92rem",
              fontWeight: 800,
              cursor: "pointer",
              border: "none",
              background: theme.accent,
              color: "#fff",
              boxShadow: `0 8px 24px -8px ${theme.accentShadow}`,
              transition: "transform 0.2s ease",
            }}
          >
            Register interest <ArrowRight size={17} strokeWidth={2.2} />
          </a>
          <a
            href="#glimpse"
            className="mc-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 26px",
              borderRadius: 12,
              fontSize: "0.92rem",
              fontWeight: 800,
              cursor: "pointer",
              background: "transparent",
              color: "#0f1710",
              border: "1.5px solid #d1d5db",
              transition: "border-color 0.2s ease",
            }}
          >
            See how it works
          </a>
        </div>
      </section>

      {/* REGISTER */}
      <section
        id="register"
        style={{ position: "relative", zIndex: 40, maxWidth: 520, margin: "20px auto 0", padding: "0 24px" }}
      >
        <div
          style={{
            borderRadius: 22,
            padding: 26,
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            boxShadow: `0 30px 70px -34px ${theme.accentShadow}`,
            transition: "box-shadow 0.4s ease",
          }}
        >
          {!submitted ? (
            <div>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: theme.accent,
                  marginBottom: 14,
                  transition: "color 0.3s ease",
                }}
              >
                Be a part of what's next
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  padding: 5,
                  borderRadius: 12,
                  background: "#f3f4f6",
                  marginBottom: 12,
                }}
              >
                <button onClick={() => switchMode("employer")} style={{ ...tabBaseSm, ...(isEmp ? selStyle : offStyle) }}>
                  Employer
                </button>
                <button
                  onClick={() => switchMode("contractor")}
                  style={{ ...tabBaseSm, ...(!isEmp ? selStyle : offStyle) }}
                >
                  Freelancer / employee
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {/* Honeypot — hidden from users, bots auto-fill it → submission is dropped */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, opacity: 0 }}
                />
                <input
                  type="email"
                  aria-label="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Your email address"
                  className="mc-input"
                  style={{
                    width: "100%",
                    padding: "15px 16px",
                    borderRadius: 12,
                    border: "1.5px solid #e5e7eb",
                    background: "#f9fafb",
                    color: "#0f1710",
                    fontSize: "0.92rem",
                    outline: "none",
                  }}
                />
                <div style={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => setRolesOpen((o) => !o)}
                    aria-label="Your role"
                    style={{
                      width: "100%",
                      padding: "15px 16px",
                      borderRadius: 12,
                      border: `1.5px solid ${rolesOpen ? theme.accent : "#e5e7eb"}`,
                      background: rolesOpen ? "#fff" : "#f9fafb",
                      color: role ? "#0f1710" : "#9ca3af",
                      fontSize: "0.92rem",
                      outline: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                      transition: "border-color 0.18s ease, background 0.18s ease",
                    }}
                  >
                    <span>{role || c.rolePlaceholder}</span>
                    <span
                      style={{
                        pointerEvents: "none",
                        color: rolesOpen ? theme.accent : "#6b7280",
                        display: "inline-flex",
                        transition: "transform 0.22s ease",
                        transform: rolesOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown size={16} strokeWidth={2} />
                    </span>
                  </button>
                  {rolesOpen && (
                    <div
                      className="mc-rise"
                      style={{
                        position: "absolute",
                        zIndex: 20,
                        top: "calc(100% + 6px)",
                        left: 0,
                        right: 0,
                        maxHeight: 280,
                        overflowY: "auto",
                        padding: 6,
                        borderRadius: 14,
                        background: "#ffffff",
                        border: "1px solid #e5e7eb",
                        boxShadow: "0 20px 44px -20px rgba(15,23,16,0.28), 0 2px 6px rgba(15,23,16,0.06)",
                      }}
                    >
                      {c.roles.map((r) => {
                        const selected = role === r;
                        return (
                          <button
                            type="button"
                            key={r}
                            onClick={() => {
                              setRole(r);
                              setRolesOpen(false);
                              setError("");
                            }}
                            className="mc-role-opt"
                            style={{
                              width: "100%",
                              textAlign: "left",
                              border: "none",
                              background: selected ? theme.accentSoft : "transparent",
                              color: selected ? theme.accent : "#374151",
                              fontSize: "0.9rem",
                              fontWeight: selected ? 700 : 500,
                              padding: "11px 13px",
                              borderRadius: 9,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 10,
                              transition: "background 0.14s ease",
                            }}
                          >
                            <span>{r}</span>
                            {selected && (
                              <span style={{ color: theme.accent, display: "inline-flex" }}>
                                <Check size={15} strokeWidth={2.6} />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                <button
                  onClick={submit}
                  disabled={!ready}
                  style={{
                    width: "100%",
                    marginTop: 3,
                    padding: 16,
                    borderRadius: 12,
                    fontSize: "0.96rem",
                    fontWeight: 800,
                    letterSpacing: "0.01em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 9,
                    transition: "all 0.2s ease",
                    border: `1.5px solid ${theme.accent}`,
                    ...(ready
                      ? {
                          background: theme.accent,
                          color: "#fff",
                          cursor: "pointer",
                          boxShadow: `0 6px 20px -6px ${theme.accentShadow}`,
                        }
                      : { background: "#fff", color: theme.accent, cursor: "not-allowed", boxShadow: "none" }),
                  }}
                >
                  Register interest <ArrowRight size={17} strokeWidth={2.2} />
                </button>
              </div>
              {!!error && (
                <div style={{ marginTop: 10, fontSize: "0.8rem", color: "#dc2626", fontWeight: 600 }}>{error}</div>
              )}
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: theme.promoBg,
                  boxShadow: `0 8px 22px -8px ${theme.accentShadow}`,
                  transition: "background 0.4s ease",
                }}
              >
                <span style={{ flexShrink: 0, color: theme.promoIcon, display: "inline-flex" }}>
                  <Gift size={19} strokeWidth={2} />
                </span>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "#fff",
                    fontWeight: 800,
                    lineHeight: 1.35,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Founding members, register your interest now and get your{" "}
                  <span style={{ color: theme.promoIcon }}>first month free</span>. Limited early spots.
                </span>
              </div>
            </div>
          ) : (
            <div className="mc-rise" style={{ textAlign: "center", padding: "12px 4px 6px" }}>
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: "50%",
                  background: theme.accentSoft,
                  border: `1px solid ${theme.accentBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: theme.accent,
                }}
              >
                <Check size={30} strokeWidth={2.4} />
              </div>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: "1.35rem",
                  letterSpacing: "-0.02em",
                  marginBottom: 8,
                  color: "#0f1710",
                }}
              >
                You're on the list.
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#4b5563",
                  lineHeight: 1.6,
                  margin: "0 auto",
                  maxWidth: 340,
                }}
              >
                Thank you for registering interest! Keep an eye on your inbox; you'll receive updates and will be the
                first to know when we're live.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              fontSize: "0.65rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: theme.accent,
              marginBottom: 6,
              transition: "color 0.3s ease",
            }}
          >
            Platform
          </div>
          <h2
            style={{
              fontSize: "clamp(2.1rem, 4.3vw, 3.1rem)",
              fontWeight: 900,
              letterSpacing: "-0.032em",
              margin: "8px 0 12px",
              color: "#0f1710",
            }}
          >
            Everything you need
          </h2>
          <p style={{ color: "#4b5563", fontSize: "0.9rem", maxWidth: 420, margin: "0 auto", lineHeight: 1.7 }}>
            Tailored for the paddock.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              fontSize: "0.62rem",
              fontWeight: 800,
              borderRadius: 999,
              padding: "5px 13px",
              background: theme.accentSoft,
              color: theme.accent,
              border: `1px solid ${theme.accentBorder}`,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            <PillIcon size={11} strokeWidth={2} />
            {c.pillLabel}
          </span>
          <span style={{ fontSize: "0.82rem", color: "#4b5563" }}>{c.pillText}</span>
          <div style={{ flex: 1, minWidth: 40, height: 1, background: "rgba(0,0,0,0.06)" }} />
        </div>
        <div className="mc-feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {c.cards.map(({ Icon, title, desc }) => (
            <div
              key={title}
              style={{
                padding: 22,
                borderRadius: 16,
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: theme.accentSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                  color: theme.accent,
                }}
              >
                <Icon size={19} strokeWidth={1.7} />
              </div>
              <div style={{ fontWeight: 800, fontSize: "0.85rem", color: "#0f1710", marginBottom: 5 }}>{title}</div>
              <p style={{ fontSize: "0.77rem", color: "#4b5563", lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CAROUSEL */}
      <section
        id="glimpse"
        style={{ position: "relative", zIndex: 10, maxWidth: 1060, margin: "0 auto", padding: "64px 24px" }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 20,
            fontSize: "0.68rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: theme.accent,
            transition: "color 0.3s ease",
          }}
        >
          A glimpse inside the platform
        </div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              background: "#fff",
              border: "1px solid #e6e8ea",
              boxShadow: `0 2px 4px rgba(15,23,16,0.04), 0 44px 90px -46px ${theme.accentShadow}`,
              transition: "box-shadow 0.4s ease",
            }}
          >
            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              style={{
                position: "relative",
                overflow: "hidden",
                background: "#ffffff",
                aspectRatio: "1698 / 877",
                touchAction: "pan-y",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 5,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  pointerEvents: "none",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: theme.accent }} />
                <span style={{ fontSize: "0.64rem", fontWeight: 800, color: "#0f1710", letterSpacing: "-0.01em" }}>
                  {activeCaption}
                </span>
              </div>

              <div style={{ position: "absolute", inset: 0 }}>
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    transition: "transform 0.6s cubic-bezier(.4,0,.2,1)",
                    transform: `translateX(-${slide * 100}%)`,
                  }}
                >
                  {slides.map((s) => (
                    <div key={s.src} style={{ flex: "0 0 100%", height: "100%", position: "relative" }}>
                      <img
                        src={`/assets/${s.src}`}
                        alt={s.alt}
                        draggable="false"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          objectPosition: "center",
                          display: "block",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={prevSlide} aria-label="Previous" style={arrowBtn("left")}>
                <ChevronLeft size={20} strokeWidth={2.2} />
              </button>
              <button onClick={nextSlide} aria-label="Next" style={arrowBtn("right")}>
                <ChevronRight size={20} strokeWidth={2.2} />
              </button>

              <button
                onClick={() => setExpanded(true)}
                aria-label="Enlarge image"
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  zIndex: 5,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 11px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
                  color: "#0f1710",
                  fontSize: "0.64rem",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                }}
              >
                <Maximize2 size={13} strokeWidth={2.4} />
                Tap to enlarge
              </button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 26 }}>
          {slides.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                height: 9,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s ease",
                width: i === slide ? 28 : 9,
                background: i === slide ? theme.accent : "#d1d5db",
              }}
            />
          ))}
        </div>
      </section>

      {/* FULLSCREEN IMAGE VIEWER */}
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          role="dialog"
          aria-label="Enlarged screenshot"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(8,12,10,0.92)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 18px",
              color: "#fff",
              flex: "0 0 auto",
            }}
          >
            <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "-0.01em", display: "inline-flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: theme.accent }} />
              {activeCaption}
            </span>
            <button
              onClick={() => setExpanded(false)}
              aria-label="Close"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: "rgba(255,255,255,0.14)",
                color: "#fff",
                fontSize: "0.72rem",
                fontWeight: 800,
              }}
            >
              <X size={15} strokeWidth={2.4} />
              Close
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: "1 1 auto",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "0 0 12px",
            }}
          >
            <img
              src={`/assets/${slides[slide]?.src ?? slides[0].src}`}
              alt={slides[slide]?.alt ?? slides[0].alt}
              style={{
                height: "auto",
                width: "auto",
                minWidth: "min(1200px, 240vw)",
                maxWidth: "none",
                margin: "auto",
                display: "block",
                borderRadius: 8,
              }}
            />
          </div>

          <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 18, padding: "6px 0 16px" }}>
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              aria-label="Previous"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 999, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.14)", color: "#fff" }}
            >
              <ChevronLeft size={22} strokeWidth={2.2} />
            </button>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem", fontWeight: 700 }}>
              Swipe the image to see detail · {slide + 1} / {count}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              aria-label="Next"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 999, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.14)", color: "#fff" }}
            >
              <ChevronRight size={22} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      )}

      {/* PROBLEM */}
      <section style={{ position: "relative", zIndex: 10, background: "transparent" }}>
        <div
          style={{
            maxWidth: 940,
            margin: "0 auto",
            padding: "64px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span
                style={{
                  width: 22,
                  height: 2,
                  background: theme.accent,
                  borderRadius: 2,
                  transition: "background 0.3s ease",
                }}
              />
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: theme.accent,
                  transition: "color 0.3s ease",
                }}
              >
                The old way
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(2.1rem, 4vw, 3.1rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                margin: "0 0 16px",
                textTransform: "uppercase",
                color: "#0f1710",
                lineHeight: 0.98,
              }}
            >
              Sound familiar?
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.62, color: "#4b5563", margin: "0 0 24px", maxWidth: 380 }}>
              {c.painLead}
            </p>
            <div
              style={{
                padding: "16px 18px",
                borderRadius: 13,
                background: "#ffffff",
                border: `1px solid ${theme.accentBorder}`,
                boxShadow: "0 1px 2px rgba(15,23,16,0.04)",
                transition: "border-color 0.3s ease",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#0f1710",
                  margin: 0,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.45,
                }}
              >
                {c.painClose}
              </p>
            </div>
          </div>
          <div
            style={{
              borderRadius: 18,
              background: "#ffffff",
              border: "1px solid #eceff1",
              boxShadow: "0 1px 2px rgba(15,23,16,0.04), 0 20px 44px -32px rgba(15,23,16,0.3)",
              overflow: "hidden",
            }}
          >
            {c.pains.map((p, i) => (
              <div
                key={p}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 13,
                  padding: "17px 20px",
                  ...(i > 0 ? { borderTop: "1px solid #f1f3f4" } : null),
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: theme.accentSoft,
                    color: theme.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 1,
                    transition: "background 0.3s ease, color 0.3s ease",
                  }}
                >
                  <X size={11} strokeWidth={2.8} />
                </span>
                <span style={{ fontSize: "0.9rem", color: "#4b5563", lineHeight: 1.55 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            style={{
              fontSize: "0.65rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: theme.accent,
              marginBottom: 6,
              transition: "color 0.3s ease",
            }}
          >
            Pricing
          </div>
          <h2
            style={{
              fontSize: "clamp(2.1rem, 4.3vw, 3.1rem)",
              fontWeight: 900,
              letterSpacing: "-0.032em",
              margin: "8px 0 12px",
              color: "#0f1710",
            }}
          >
            Clear, honest pricing
          </h2>
        </div>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div
            style={{
              padding: "36px 28px",
              borderRadius: 20,
              background: theme.accentSoft,
              border: `1px solid ${theme.accentBorder}`,
              textAlign: "center",
              transition: "background 0.4s ease, border-color 0.4s ease",
            }}
          >
            <div style={{ color: theme.accent, display: "inline-flex", marginBottom: 12 }}>
              <Tag size={26} strokeWidth={2} />
            </div>
            <p
              style={{
                fontSize: "1.05rem",
                fontWeight: 800,
                color: "#0f1710",
                margin: 0,
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
              }}
            >
              Tier based pricing, built to be competitive and fair. Full pricing will be announced soon — register your interest to be the first to know.
            </p>
          </div>
          {false && c.pricing.map((p) => (
            <div
              key={p.tier}
              style={{
                borderRadius: 20,
                padding: "26px 22px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                background: "rgba(0,0,0,0.02)",
                border: p.pop ? `2px solid ${p.color}` : "1px solid rgba(0,0,0,0.06)",
                boxShadow: p.pop ? `0 0 0 4px ${p.color}10, 0 24px 48px ${p.color}12` : "none",
              }}
            >
              {p.pop && (
                <div
                  style={{
                    position: "absolute",
                    top: -13,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: p.color,
                    color: "#fff",
                    fontSize: "0.58rem",
                    fontWeight: 800,
                    borderRadius: 999,
                    padding: "4px 13px",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {p.popLabel}
                </div>
              )}
              <div
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#6b7280",
                  marginBottom: 3,
                }}
              >
                {isEmp ? "Employer" : "Freelancer / Employee"}
              </div>
              <div style={{ fontWeight: 900, fontSize: "1rem", color: "#0f1710", marginBottom: 8 }}>{p.tier}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 18 }}>
                <span style={{ fontWeight: 900, fontSize: "2.1rem", color: p.color, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {p.price}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>{p.per}</span>
              </div>
              {p.pop && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "9px 11px",
                    marginBottom: 16,
                    borderRadius: 10,
                    background: theme.accentSoft,
                    border: `1px solid ${theme.accentBorder}`,
                    color: p.color,
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  <Gift size={14} strokeWidth={2.2} style={{ flexShrink: 0 }} />
                  Founding offer — first month free
                </div>
              )}
              <div
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.05)",
                  paddingTop: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginBottom: 16,
                  flex: 1,
                }}
              >
                {p.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      fontSize: "0.77rem",
                      lineHeight: 1.45,
                      color: "#4b5563",
                    }}
                  >
                    <span style={{ color: p.color, display: "inline-flex", flexShrink: 0, marginTop: 2 }}>
                      <CheckCircle2 size={12} strokeWidth={2.2} />
                    </span>
                    {f}
                  </div>
                ))}
              </div>
              <a
                href="#register"
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 10,
                  background: p.pop ? p.color : "transparent",
                  color: p.pop ? "#fff" : p.color,
                  border: `1.5px solid ${p.color}`,
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxSizing: "border-box",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                Register interest →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ position: "relative", zIndex: 10, maxWidth: 1000, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div
            style={{
              fontSize: "0.65rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: theme.accent,
              marginBottom: 6,
              transition: "color 0.3s ease",
            }}
          >
            FAQ
          </div>
          <h2
            style={{
              fontSize: "clamp(2.1rem, 4.3vw, 3.1rem)",
              fontWeight: 900,
              letterSpacing: "-0.032em",
              margin: "8px 0 12px",
              color: "#0f1710",
            }}
          >
            Frequently asked questions
          </h2>
          <p style={{ color: "#4b5563", fontSize: "0.9rem" }}>{c.faqSub}</p>
        </div>
        <div className="mc-faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {c.faqs.map((q) => (
            <div key={q.q} style={{ borderRadius: 16, padding: 22, background: "#ffffff", border: "1px solid #e8ebed" }}>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#0f1710",
                  letterSpacing: "-0.015em",
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                {q.q}
              </div>
              <div style={{ fontSize: "0.88rem", color: "#4b5563", lineHeight: 1.65 }}>{q.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 10, borderTop: "1px solid #e5e7eb", marginTop: 72 }}>
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "32px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px 24px",
          }}
        >
          <img src="/assets/mc-logo.png" alt="Motorsport Connector" style={{ height: 22, objectFit: "contain", display: "block" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              flexWrap: "wrap",
              fontSize: "0.82rem",
              fontWeight: 600,
            }}
          >
            <a href="mailto:motorsportconnector@gmail.com" style={{ color: theme.accent }}>
              motorsportconnector@gmail.com
            </a>
            <a
              href="https://www.instagram.com/motorsportconnector"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: theme.accent }}
            >
              Instagram · @motorsportconnector
            </a>
            <a
              href="/privacy.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: theme.accent, fontSize: "0.82rem", fontWeight: 600 }}
            >
              Privacy Notice
            </a>
          </div>
          <span style={{ fontSize: "0.76rem", color: "#6b7280" }}>© 2026 Motorsport Connector Ltd</span>
        </div>
      </footer>
    </div>
  );
}

const navLink = {
  fontSize: "0.82rem",
  fontWeight: 700,
  color: "#4b5563",
  whiteSpace: "nowrap",
  padding: "8px 4px",
  transition: "color 0.2s ease",
};

const arrowBtn = (side) => ({
  position: "absolute",
  [side]: 14,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 6,
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,0.92)",
  boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#0f1710",
});

const CSS = `
.mc-landing a { text-decoration: none; }
.mc-landing ::placeholder { color: #9ca3af; }
@keyframes mcblink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
@keyframes mcrise { 0% { opacity: 0; transform: translateY(16px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes mcfloatblob { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(0,-26px) scale(1.05); } }
@keyframes mcmarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.mc-blink { animation: mcblink 2.2s ease-in-out infinite; }
.mc-rise { animation: mcrise 0.4s ease both; }
.mc-marquee { animation: mcmarquee 34s linear infinite; }
.mc-blob1 { animation: mcfloatblob 16s ease-in-out infinite; }
.mc-blob2 { animation: mcfloatblob 20s ease-in-out infinite reverse; }
.mc-nav-link:hover { color: var(--accent); }
.mc-lift:hover { transform: translateY(-1px); }
.mc-outline:hover { border-color: var(--accent) !important; }
.mc-input:focus { border-color: var(--accent) !important; background: #fff !important; }
.mc-role-opt:hover { background: var(--accent-soft) !important; }
@media (max-width: 860px) { .mc-landing .mc-nav-tag { display: none !important; } }
@media (max-width: 1024px) { .mc-landing .mc-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
@media (max-width: 760px) {
  .mc-landing .mc-feat-grid { grid-template-columns: 1fr !important; }
  .mc-landing .mc-price-grid { grid-template-columns: 1fr !important; max-width: 420px !important; }
  .mc-landing .mc-faq-grid { grid-template-columns: 1fr !important; }
}
@media (max-width: 620px) { .mc-landing .mc-nav-link { display: none !important; } }
@media (prefers-reduced-motion: reduce) {
  .mc-marquee, .mc-blob1, .mc-blob2, .mc-blink, .mc-rise { animation: none !important; }
}
`;
