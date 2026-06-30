import { useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import "./TemplateSelector.css";

const TEMPLATES = [
  {
    id: "classic",
    name: "Classic",
    description: "Clean serif, ATS-friendly, FAANGPath style",
    accent: "#000000",
    preview: {
      header: "#fff",
      headerText: "#000",
      sidebar: null,
      accent: "#000",
      font: "serif",
    },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean sans-serif with blue accents",
    accent: "#2a5cb8",
    preview: {
      header: "#fff",
      headerText: "#000",
      sidebar: null,
      accent: "#2a5cb8",
      font: "sans-serif",
    },
  },
  {
    id: "sidebar",
    name: "Sidebar",
    description: "Dark sidebar left, content right",
    accent: "#4fc3d4",
    preview: {
      header: "#1c2b3a",
      headerText: "#fff",
      sidebar: "#1c2b3a",
      accent: "#4fc3d4",
      font: "sans-serif",
    },
  },
  {
    id: "twocol",
    name: "Two Column",
    description: "Split layout with blue accents",
    accent: "#3b6fc7",
    preview: {
      header: "#fff",
      headerText: "#000",
      sidebar: null,
      accent: "#3b6fc7",
      font: "sans-serif",
    },
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Date-dot-content layout, navy & orange",
    accent: "#e07b2a",
    preview: {
      header: "#fff",
      headerText: "#1a3a6b",
      sidebar: null,
      accent: "#e07b2a",
      font: "sans-serif",
    },
  },
];

function TemplateThumbnail({ template, selected, onClick, index }) {
  const { preview } = template;
  const cardRef = useRef(null);

  // Mouse spotlight effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handle = (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty(
        "--mx",
        ((e.clientX - rect.left) / rect.width) * 100 + "%",
      );
      card.style.setProperty(
        "--my",
        ((e.clientY - rect.top) / rect.height) * 100 + "%",
      );
    };
    card.addEventListener("mousemove", handle);
    return () => card.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`ts-card ${selected ? "selected" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      aria-label={`Select ${template.name} template`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Mini resume preview */}
      <div className="ts-thumb" style={{ fontFamily: preview.font }}>
        {/* Sidebar layout */}
        {preview.sidebar ? (
          <div className="ts-thumb-sidebar-layout">
            <div
              className="ts-thumb-sidebar"
              style={{ background: preview.sidebar }}
            >
              <div
                className="ts-thumb-sidebar-name"
                style={{ background: "rgba(255,255,255,0.3)" }}
              />
              <div
                className="ts-thumb-sidebar-name"
                style={{
                  background: preview.accent,
                  width: "70%",
                  marginTop: 3,
                }}
              />
              <div style={{ marginTop: 8 }}>
                {[80, 60, 90, 50].map((w, i) => (
                  <div
                    key={i}
                    className="ts-thumb-line"
                    style={{
                      width: `${w}%`,
                      background: "rgba(255,255,255,0.2)",
                      marginBottom: 3,
                    }}
                  />
                ))}
              </div>
              <div
                className="ts-thumb-section-label"
                style={{ background: preview.accent, marginTop: 10 }}
              />
              {[70, 55, 80].map((w, i) => (
                <div
                  key={i}
                  className="ts-thumb-line"
                  style={{
                    width: `${w}%`,
                    background: "rgba(255,255,255,0.15)",
                    marginBottom: 3,
                  }}
                />
              ))}
            </div>
            <div className="ts-thumb-main">
              {[1, 2].map((s) => (
                <div key={s} style={{ marginBottom: 8 }}>
                  <div
                    className="ts-thumb-section-label"
                    style={{ background: "#ddd", marginBottom: 4 }}
                  />
                  {[90, 70, 80].map((w, i) => (
                    <div
                      key={i}
                      className="ts-thumb-line"
                      style={{ width: `${w}%`, marginBottom: 2 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: "8px 10px" }}>
            {/* Header */}
            <div
              style={{
                textAlign: "center",
                borderBottom: `1.5px solid ${preview.accent}`,
                paddingBottom: 5,
                marginBottom: 6,
              }}
            >
              <div
                className="ts-thumb-name"
                style={{
                  background: preview.headerText === "#fff" ? "#fff" : "#111",
                }}
              />
              <div
                className="ts-thumb-line"
                style={{
                  width: "60%",
                  margin: "3px auto 0",
                  background: preview.accent,
                }}
              />
              <div
                className="ts-thumb-line"
                style={{ width: "80%", margin: "2px auto 0" }}
              />
            </div>
            {/* Sections */}
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ marginBottom: 6 }}>
                <div
                  className="ts-thumb-section-label"
                  style={{
                    borderBottom: `1px solid ${preview.accent}`,
                    paddingBottom: 1,
                    marginBottom: 3,
                    background: "transparent",
                    height: "auto",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 4,
                      background: "#333",
                      borderRadius: 2,
                    }}
                  />
                </div>
                {[85, 65, 75].map((w, i) => (
                  <div
                    key={i}
                    className="ts-thumb-line"
                    style={{ width: `${w}%`, marginBottom: 2 }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Label */}
      <div className="ts-info">
        <div className="ts-name-row">
          <span className="ts-template-name">{template.name}</span>
          {selected && (
            <span className="ts-check">
              <Check size={12} strokeWidth={2.5} />
            </span>
          )}
        </div>
        <span className="ts-desc">{template.description}</span>
        <div
          className="ts-accent-dot"
          style={{ background: template.accent }}
        />
      </div>
    </div>
  );
}

export default function TemplateSelector({
  selectedId,
  onSelect,
  onContinue,
  onBack,
}) {
  return (
    <div className="ts-container">
      <div className="ts-header">
        <div className="ts-label">Templates</div>
        <h2 className="ts-title">Choose a Template</h2>
        <p className="ts-subtitle">
          Pick a style for your resume. You can change it anytime.
        </p>
      </div>

      <div className="ts-grid">
        {TEMPLATES.map((t, i) => (
          <TemplateThumbnail
            key={t.id}
            template={t}
            selected={selectedId === t.id}
            onClick={() => onSelect(t.id)}
            index={i}
          />
        ))}
      </div>

      <div className="ts-actions">
        {onBack && (
          <button className="ts-btn-back" onClick={onBack}>
            <ArrowLeft size={13} /> Back
          </button>
        )}
        <button
          className="btn btn-primary"
          onClick={onContinue}
          disabled={!selectedId}
        >
          <span>
            Continue with{" "}
            {TEMPLATES.find((t) => t.id === selectedId)?.name || "—"}
          </span>
          <span className="btn-icon">
            <ArrowRight size={14} strokeWidth={2} />
          </span>
        </button>
      </div>
    </div>
  );
}
