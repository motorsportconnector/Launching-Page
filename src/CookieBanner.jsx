import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [shown, setShown] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const choice = window.localStorage.getItem("mc-cookie-consent");
      if (!choice) setShown(true);
    } catch {
      setShown(true);
    }
    const open = () => { setShown(true); setShowDetails(true); };
    window.addEventListener("mc:open-cookie-settings", open);
    return () => window.removeEventListener("mc:open-cookie-settings", open);
  }, []);

  const choose = (val) => {
    try { window.localStorage.setItem("mc-cookie-consent", val); } catch {}
    setShown(false);
    setShowDetails(false);
  };

  if (!shown) return null;

  return (
    <div
      style={{
        position: "fixed", bottom: 16, left: 16, right: 16,
        zIndex: 9997, maxWidth: 720, margin: "0 auto",
        background: "white", borderRadius: 14,
        border: "1.5px solid #cde8e1",
        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
        padding: "18px 22px",
      }}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f1710", marginBottom: 6 }}>
        Cookies and your privacy
      </div>
      <p style={{ fontSize: "0.82rem", color: "#374151", lineHeight: 1.55, margin: "0 0 12px" }}>
        We use only essential storage to make this site work and remember your cookie choice. We don't use tracking or advertising cookies — only privacy-friendly, cookieless analytics to count visits. See our{" "}
        <a href="/privacy.html" target="_blank" rel="noopener noreferrer" style={{ color: "#0b5d4f", fontWeight: 700 }}>Privacy Notice</a>{" "}
        for how we handle any details you share.
      </p>

      {showDetails && (
        <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 14px", marginBottom: 12, fontSize: "0.8rem", color: "#374151", lineHeight: 1.55 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>What we store</div>
          <ul style={{ margin: "0 0 8px", paddingLeft: 18 }}>
            <li><strong>Essential storage (always on):</strong> remembers your cookie choice, and — if you register your interest — keeps a copy of your submission in your own browser.</li>
            <li><strong>Analytics:</strong> privacy-friendly and cookieless — aggregate visit counts only, no personal tracking.</li>
            <li><strong>Marketing or advertising:</strong> none.</li>
            <li><strong>Third-party cookies:</strong> none.</li>
          </ul>
          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
            You can clear stored data anytime by clearing your browser's site data. See our Privacy Notice for full details.
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button
          onClick={() => choose("accepted")}
          style={{
            background: "#0b5d4f", color: "white",
            border: "none", borderRadius: 9,
            padding: "9px 18px", fontSize: "0.82rem",
            fontWeight: 700, cursor: "pointer", flex: "1 1 auto",
          }}
        >
          Accept essential
        </button>
        <button
          onClick={() => choose("rejected")}
          style={{
            background: "white", color: "#0b5d4f",
            border: "1.5px solid #cde8e1", borderRadius: 9,
            padding: "9px 18px", fontSize: "0.82rem",
            fontWeight: 700, cursor: "pointer", flex: "1 1 auto",
          }}
        >
          Reject non-essential
        </button>
        <button
          onClick={() => setShowDetails(d => !d)}
          style={{
            background: "transparent", color: "#6b7280",
            border: "none", borderRadius: 9,
            padding: "9px 14px", fontSize: "0.78rem",
            fontWeight: 600, cursor: "pointer",
          }}
        >
          {showDetails ? "Hide details" : "Details"}
        </button>
      </div>
    </div>
  );
}
