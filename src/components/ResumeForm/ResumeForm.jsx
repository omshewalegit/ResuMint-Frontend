import { useState, useEffect, useRef, useCallback } from "react";
import {
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  X,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";
import "./ResumeForm.css";

// ── Confirm Delete Modal ──────────────────────────────────────
function ConfirmModal({ message, onConfirm, onCancel }) {
  useEffect(() => {
    const handle = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onCancel]);

  return (
    <div
      className="rf-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="rf-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="rf-modal-title"
      >
        <div className="rf-modal-icon">
          <AlertTriangle size={18} />
        </div>
        <p className="rf-modal-title" id="rf-modal-title">
          Remove item?
        </p>
        <p className="rf-modal-msg">{message}</p>
        <div className="rf-modal-actions">
          <button className="rf-modal-cancel" onClick={onCancel} autoFocus>
            Cancel
          </button>
          <button className="rf-modal-confirm" onClick={onConfirm}>
            Yes, remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Tag Input ─────────────────────────────────────────────────
function TagInput({
  label,
  values = [],
  onChange,
  placeholder = "Type & press Enter",
}) {
  const [input, setInput] = useState("");
  const boxRef = useRef(null);

  const addTag = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newTags = trimmed
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onChange([...new Set([...values, ...newTags])]);
    setInput("");
  }, [input, values, onChange]);

  const removeTag = (idx) => onChange(values.filter((_, i) => i !== idx));

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && !input && values.length)
      removeTag(values.length - 1);
  };

  return (
    <div className="rf-field">
      {label && <label className="rf-label">{label}</label>}
      <div
        className="rf-tag-box"
        ref={boxRef}
        onClick={() => boxRef.current?.querySelector("input")?.focus()}
      >
        {values.map((tag, i) => (
          <span className="rf-tag" key={i}>
            {tag}
            <button
              type="button"
              className="rf-tag-remove"
              onClick={() => removeTag(i)}
              aria-label={`Remove ${tag}`}
            >
              <X size={10} />
            </button>
          </span>
        ))}
        <input
          className="rf-tag-input"
          placeholder={values.length === 0 ? placeholder : ""}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={addTag}
          aria-label={label}
        />
      </div>
    </div>
  );
}

// ── Char-counted Textarea ─────────────────────────────────────
function CountedTextarea({
  value,
  onChange,
  rows = 4,
  maxChars,
  placeholder,
  className,
}) {
  const textareaRef = useRef(null);
  const [boldBtn, setBoldBtn] = useState(null);

  const len = (value || "").length;
  const countClass = maxChars
    ? len > maxChars
      ? "over"
      : len > maxChars * 0.85
        ? "warn"
        : ""
    : "";

  const handleSelect = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart, selectionEnd } = ta;
    if (selectionStart === selectionEnd) {
      setBoldBtn(null);
      return;
    }
    const rect = ta.getBoundingClientRect();
    setBoldBtn({
      top: rect.top - 42,
      left: rect.left + rect.width / 2 - 16,
    });
  };

  const handleBold = (e) => {
    e.preventDefault();
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: start, selectionEnd: end } = ta;
    const selected = (value || "").slice(start, end);
    if (!selected) return;
    const isBold = selected.startsWith("**") && selected.endsWith("**");
    const replacement = isBold ? selected.slice(2, -2) : `**${selected}**`;
    const newVal =
      (value || "").slice(0, start) + replacement + (value || "").slice(end);
    onChange({ target: { value: newVal } });
    setBoldBtn(null);
  };

  return (
    <>
      {boldBtn && (
        <button
          type="button"
          className="rf-bold-btn"
          style={{ top: boldBtn.top, left: boldBtn.left }}
          onMouseDown={handleBold}
        >
          B
        </button>
      )}
      <div className="rf-textarea-wrap">
        <textarea
          ref={textareaRef}
          className={`rf-textarea ${className || ""}`}
          rows={rows}
          value={value}
          onChange={onChange}
          onSelect={handleSelect}
          onBlur={() => setTimeout(() => setBoldBtn(null), 150)}
          placeholder={placeholder}
        />
        {maxChars && (
          <span className={`rf-char-count ${countClass}`}>
            {len}/{maxChars}
          </span>
        )}
      </div>
    </>
  );
}

// ── Collapsible Section ───────────────────────────────────────
function Section({ id, heading, count, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const sectionRef = useRef(null);

  return (
    <section className="rf-section" id={id} ref={sectionRef}>
      <div
        className="rf-section-header"
        onClick={() => setOpen((o) => !o)}
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && setOpen((o) => !o)
        }
      >
        <h2 className="rf-heading">
          {heading}
          <span className="rf-heading-accent" />
        </h2>
        {count != null && <span className="rf-section-count">{count}</span>}
        <span className={`rf-section-toggle ${open ? "" : "collapsed"}`}>
          <ChevronDown size={14} />
        </span>
      </div>
      <div className={`rf-section-body ${open ? "" : "collapsed"}`}>
        {children}
      </div>
    </section>
  );
}

// ── Progress Tracker ──────────────────────────────────────────
const SECTIONS = [
  { id: "s-personal", label: "Personal" },
  { id: "s-summary", label: "Summary" },
  { id: "s-skills", label: "Skills" },
  { id: "s-experience", label: "Experience" },
  { id: "s-education", label: "Education" },
  { id: "s-projects", label: "Projects" },
  { id: "s-certs", label: "Certs" },
  { id: "s-achievements", label: "Achievements" },
  { id: "s-languages", label: "Languages" },
  { id: "s-interests", label: "Interests" },
];

function ProgressTracker({ active, saveState }) {
  const scrollTo = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="rf-progress">
      <div className="rf-progress-inner">
        {SECTIONS.map((s, i) => (
          <div className="rf-progress-step" key={s.id}>
            {i > 0 && <div className="rf-progress-line" />}
            <button
              type="button"
              className={`rf-progress-dot ${active === i ? "active" : i < active ? "filled" : ""}`}
              onClick={() => scrollTo(s.id)}
              aria-label={`Go to ${s.label}`}
            >
              <span>{i + 1}</span>
              <span className="rf-progress-tooltip">{s.label}</span>
            </button>
          </div>
        ))}
        <div className={`rf-autosave ${saveState}`}>
          <div className="rf-autosave-dot" />
          {saveState === "saving"
            ? "Saving…"
            : saveState === "saved"
              ? "Saved"
              : "Unsaved"}
        </div>
      </div>
    </div>
  );
}

// ── Card with reorder ─────────────────────────────────────────
function ReorderCard({
  index,
  total,
  onRemove,
  onMoveUp,
  onMoveDown,
  previewText,
  label,
  children,
}) {
  return (
    <div className="rf-card">
      <div className="rf-card-header">
        <div className="rf-card-meta">
          <span className="rf-card-num">#{index + 1}</span>
          {previewText && (
            <span className="rf-card-title-preview">{previewText}</span>
          )}
        </div>
        <div className="rf-card-actions">
          <button
            type="button"
            className="rf-move-btn"
            onClick={onMoveUp}
            disabled={index === 0}
            aria-label="Move up"
            title="Move up"
          >
            <ChevronUp size={12} />
          </button>
          <button
            type="button"
            className="rf-move-btn"
            onClick={onMoveDown}
            disabled={index === total - 1}
            aria-label="Move down"
            title="Move down"
          >
            <ChevronDown size={12} />
          </button>
          <button type="button" className="rf-remove-btn" onClick={onRemove}>
            <Trash2 size={11} /> Remove
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Simple Input Field ────────────────────────────────────────
function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  hint,
}) {
  return (
    <div className="rf-field">
      <label className="rf-label">
        {label}
        {required && <span className="rf-label-required">required</span>}
      </label>
      <input
        className={`rf-input ${hint ? "rf-input-error" : value ? "rf-input-valid" : ""}`}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
      />
      {hint && <span className="rf-field-hint">{hint}</span>}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// SKILL CATEGORIES — exactly 6, matching preview
// ═══════════════════════════════════════════════════
const SKILL_KEYS = [
  { key: "programmingLanguages", label: "Programming Languages" },
  { key: "frameworks", label: "Frameworks & Libraries" },
  { key: "databases", label: "Databases" },
  { key: "cloud", label: "Cloud" },
  { key: "devOpsTools", label: "DevOps Tools" },
  { key: "other", label: "Other" },
];

// ═══════════════════════════════════════════════════
// MAIN FORM
// ═══════════════════════════════════════════════════
export default function ResumeForm({ initialData, onSubmit, onBack }) {
  const [data, setData] = useState(initialData);
  const [confirm, setConfirm] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const [saveState, setSaveState] = useState("idle");
  const saveTimer = useRef(null);

  // ── Auto-save simulation ──
  useEffect(() => {
    setSaveState("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    }, 900);
    return () => clearTimeout(saveTimer.current);
  }, [data]);

  // ── Intersection observer for progress ──
  useEffect(() => {
    const observers = SECTIONS.map((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(i);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // ── Generic helpers ──
  const setField = (path, value) => {
    setData((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const setListField = (section, index, field, value) => {
    setData((prev) => {
      const next = structuredClone(prev);
      next[section][index][field] = value;
      return next;
    });
  };

  const addItem = (section, template) => {
    setData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), template],
    }));
  };

  const moveItem = (section, index, dir) => {
    setData((prev) => {
      const arr = [...(prev[section] || [])];
      const target = index + dir;
      if (target < 0 || target >= arr.length) return prev;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return { ...prev, [section]: arr };
    });
  };

  const askRemove = (section, index, label) =>
    setConfirm({ section, index, label });

  const confirmRemove = () => {
    if (!confirm) return;
    setData((prev) => ({
      ...prev,
      [confirm.section]: prev[confirm.section].filter(
        (_, i) => i !== confirm.index,
      ),
    }));
    setConfirm(null);
  };

  const setSkillArray = (key, arr) =>
    setData((prev) => ({ ...prev, skills: { ...prev.skills, [key]: arr } }));

  const getResponsibilities = (exp) => (exp.responsibilities || []).join("\n");
  const setResponsibilities = (section, index, raw) => {
    const arr = raw.split("\n");
    setListField(section, index, "responsibilities", arr);
  };

  const getProjectDesc = (proj) =>
    (
      proj.responsibilities || (proj.description ? [proj.description] : [])
    ).join("\n");
  const setProjectDesc = (i, raw) => {
    setListField("projects", i, "responsibilities", raw.split("\n"));
    setListField("projects", i, "description", "");
  };

  // ── Validation ──
  const pi = data.personalInformation || {};
  const emailHint =
    pi.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pi.email)
      ? "Enter a valid email address"
      : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailHint) {
      document
        .getElementById("s-personal")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    onSubmit(data);
  };

  const totalSkillCount = SKILL_KEYS.reduce(
    (acc, { key }) => acc + (data.skills?.[key]?.length || 0),
    0,
  );

  return (
    <>
      {confirm && (
        <ConfirmModal
          message={`Remove this ${confirm.label}? This cannot be undone.`}
          onConfirm={confirmRemove}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="rf-topbar">
        <button type="button" className="rf-topbar-back" onClick={onBack}>
          <ArrowLeft size={14} /> Back to Describe
        </button>
      </div>

      <ProgressTracker active={activeSection} saveState={saveState} />

      <form className="resume-form" onSubmit={handleSubmit} noValidate>
        {/* ── Personal Info ── */}
        <Section id="s-personal" heading="Personal information" defaultOpen>
          <div className="rf-grid2">
            <Field
              label="Full name"
              required
              value={pi.fullName || ""}
              placeholder="Jane Smith"
              onChange={(v) => setField("personalInformation.fullName", v)}
            />
            <Field
              label="Email"
              required
              type="email"
              value={pi.email || ""}
              placeholder="jane@example.com"
              hint={emailHint}
              onChange={(v) => setField("personalInformation.email", v)}
            />
            <Field
              label="Phone"
              value={pi.phoneNumber || ""}
              placeholder="+1 555 000 0000"
              onChange={(v) => setField("personalInformation.phoneNumber", v)}
            />
            <Field
              label="Location"
              value={pi.location || ""}
              placeholder="San Francisco, CA"
              onChange={(v) => setField("personalInformation.location", v)}
            />
            <Field
              label="LinkedIn"
              value={pi.linkedIn || ""}
              placeholder="linkedin.com/in/janesmith"
              onChange={(v) => setField("personalInformation.linkedIn", v)}
            />
            <Field
              label="GitHub"
              value={pi.gitHub || ""}
              placeholder="github.com/janesmith"
              onChange={(v) => setField("personalInformation.gitHub", v)}
            />
          </div>
        </Section>

        {/* ── Summary ── */}
        <Section id="s-summary" heading="Summary" defaultOpen>
          <CountedTextarea
            rows={4}
            maxChars={600}
            placeholder="A brief professional summary highlighting your key strengths and goals…"
            value={data.summary || ""}
            onChange={(e) => setField("summary", e.target.value)}
          />
        </Section>

        {/* ── Skills ── */}
        <Section
          id="s-skills"
          heading="Skills"
          count={totalSkillCount > 0 ? totalSkillCount : null}
        >
          <div className="rf-grid2">
            {SKILL_KEYS.map(({ key, label }) => (
              <TagInput
                key={key}
                label={label}
                values={data.skills?.[key] || []}
                onChange={(arr) => setSkillArray(key, arr)}
                placeholder="Add skill, press Enter"
              />
            ))}
          </div>
        </Section>

        {/* ── Experience ── */}
        <Section
          id="s-experience"
          heading="Experience"
          count={(data.experience || []).length || null}
        >
          {(data.experience || []).length === 0 && (
            <p className="rf-empty-state">No experience added yet</p>
          )}
          {(data.experience || []).map((exp, i) => (
            <ReorderCard
              key={i}
              index={i}
              total={(data.experience || []).length}
              previewText={exp.jobTitle || exp.company || ""}
              label="experience"
              onMoveUp={() => moveItem("experience", i, -1)}
              onMoveDown={() => moveItem("experience", i, 1)}
              onRemove={() => askRemove("experience", i, "experience")}
            >
              <div className="rf-grid2">
                <Field
                  label="Job title"
                  value={exp.jobTitle || ""}
                  placeholder="Senior Engineer"
                  onChange={(v) => setListField("experience", i, "jobTitle", v)}
                />
                <Field
                  label="Company"
                  value={exp.company || ""}
                  placeholder="Acme Corp"
                  onChange={(v) => setListField("experience", i, "company", v)}
                />
                <Field
                  label="Location"
                  value={exp.location || ""}
                  placeholder="New York, NY"
                  onChange={(v) => setListField("experience", i, "location", v)}
                />
                <Field
                  label="Start date"
                  value={exp.startDate || ""}
                  placeholder="Jan 2022"
                  onChange={(v) =>
                    setListField("experience", i, "startDate", v)
                  }
                />
                <Field
                  label="End date"
                  value={exp.endDate || ""}
                  placeholder="Present"
                  onChange={(v) => setListField("experience", i, "endDate", v)}
                />
              </div>
              <label className="rf-label rf-textarea-label">
                Responsibilities{" "}
                <span
                  style={{
                    color: "rgba(160,190,210,0.25)",
                    fontStyle: "italic",
                    textTransform: "none",
                    letterSpacing: 0,
                  }}
                >
                  — one per line
                </span>
              </label>
              <CountedTextarea
                rows={4}
                maxChars={1200}
                placeholder={
                  "• Led migration of monolith to microservices\n• Mentored 4 junior engineers"
                }
                value={getResponsibilities(exp)}
                onChange={(e) =>
                  setResponsibilities("experience", i, e.target.value)
                }
              />
            </ReorderCard>
          ))}
          <button
            type="button"
            className="rf-add-btn"
            onClick={() =>
              addItem("experience", {
                jobTitle: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                responsibilities: [],
              })
            }
          >
            <Plus size={13} /> Add experience
          </button>
        </Section>

        {/* ── Education ── */}
        <Section
          id="s-education"
          heading="Education"
          count={(data.education || []).length || null}
        >
          {(data.education || []).length === 0 && (
            <p className="rf-empty-state">No education added yet</p>
          )}
          {(data.education || []).map((edu, i) => (
            <ReorderCard
              key={i}
              index={i}
              total={(data.education || []).length}
              previewText={edu.university || edu.degree || ""}
              label="education"
              onMoveUp={() => moveItem("education", i, -1)}
              onMoveDown={() => moveItem("education", i, 1)}
              onRemove={() => askRemove("education", i, "education")}
            >
              <div className="rf-grid2">
                <Field
                  label="Degree"
                  value={edu.degree || ""}
                  placeholder="B.S. Computer Science"
                  onChange={(v) => setListField("education", i, "degree", v)}
                />
                <Field
                  label="Major"
                  value={edu.major || ""}
                  placeholder="Computer Science"
                  onChange={(v) => setListField("education", i, "major", v)}
                />
                <Field
                  label="University"
                  value={edu.university || ""}
                  placeholder="MIT"
                  onChange={(v) =>
                    setListField("education", i, "university", v)
                  }
                />
                <Field
                  label="Location"
                  value={edu.location || ""}
                  placeholder="Cambridge, MA"
                  onChange={(v) => setListField("education", i, "location", v)}
                />
                <Field
                  label="Graduation year"
                  value={edu.graduationYear || ""}
                  placeholder="2024"
                  onChange={(v) =>
                    setListField("education", i, "graduationYear", v)
                  }
                />
              </div>
            </ReorderCard>
          ))}
          <button
            type="button"
            className="rf-add-btn"
            onClick={() =>
              addItem("education", {
                degree: "",
                major: "",
                university: "",
                location: "",
                graduationYear: "",
              })
            }
          >
            <Plus size={13} /> Add education
          </button>
        </Section>

        {/* ── Projects ── */}
        <Section
          id="s-projects"
          heading="Projects"
          count={(data.projects || []).length || null}
        >
          {(data.projects || []).length === 0 && (
            <p className="rf-empty-state">No projects added yet</p>
          )}
          {(data.projects || []).map((proj, i) => (
            <ReorderCard
              key={i}
              index={i}
              total={(data.projects || []).length}
              previewText={proj.title || ""}
              label="project"
              onMoveUp={() => moveItem("projects", i, -1)}
              onMoveDown={() => moveItem("projects", i, 1)}
              onRemove={() => askRemove("projects", i, "project")}
            >
              <div className="rf-grid2">
                <Field
                  label="Title"
                  value={proj.title || ""}
                  placeholder="Resume Builder"
                  onChange={(v) => setListField("projects", i, "title", v)}
                />
                <Field
                  label="GitHub link"
                  value={proj.githubLink || ""}
                  placeholder="github.com/you/project"
                  onChange={(v) => setListField("projects", i, "githubLink", v)}
                />
                <Field
                  label="Date"
                  value={proj.date || ""}
                  placeholder="Jan 2024"
                  onChange={(v) => setListField("projects", i, "date", v)}
                />
              </div>
              <div style={{ marginTop: 14 }}>
                <TagInput
                  label="Technologies used"
                  values={proj.technologiesUsed || []}
                  onChange={(arr) =>
                    setListField("projects", i, "technologiesUsed", arr)
                  }
                  placeholder="React, TypeScript…"
                />
              </div>
              <label className="rf-label rf-textarea-label">
                Description{" "}
                <span
                  style={{
                    color: "rgba(160,190,210,0.25)",
                    fontStyle: "italic",
                    textTransform: "none",
                    letterSpacing: 0,
                  }}
                >
                  — one per line
                </span>
              </label>
              <CountedTextarea
                rows={3}
                maxChars={500}
                placeholder={
                  "• Built REST API with Node.js\n• Reduced load time by 40%"
                }
                value={getProjectDesc(proj)}
                onChange={(e) => setProjectDesc(i, e.target.value)}
              />
            </ReorderCard>
          ))}
          <button
            type="button"
            className="rf-add-btn"
            onClick={() =>
              addItem("projects", {
                title: "",
                description: "",
                technologiesUsed: [],
                githubLink: "",
                date: "",
              })
            }
          >
            <Plus size={13} /> Add project
          </button>
        </Section>

        {/* ── Certifications ── */}
        <Section
          id="s-certs"
          heading="Certifications"
          count={(data.certifications || []).length || null}
        >
          {(data.certifications || []).length === 0 && (
            <p className="rf-empty-state">No certifications added yet</p>
          )}
          {(data.certifications || []).map((cert, i) => (
            <ReorderCard
              key={i}
              index={i}
              total={(data.certifications || []).length}
              previewText={cert.name || ""}
              label="certification"
              onMoveUp={() => moveItem("certifications", i, -1)}
              onMoveDown={() => moveItem("certifications", i, 1)}
              onRemove={() => askRemove("certifications", i, "certification")}
            >
              <div className="rf-grid2">
                <Field
                  label="Name"
                  value={cert.name || ""}
                  placeholder="AWS Solutions Architect"
                  onChange={(v) => setListField("certifications", i, "name", v)}
                />
                <Field
                  label="Issuing organization"
                  value={cert.issuingOrganization || ""}
                  placeholder="Amazon Web Services"
                  onChange={(v) =>
                    setListField("certifications", i, "issuingOrganization", v)
                  }
                />
                <Field
                  label="Year"
                  value={cert.year || ""}
                  placeholder="2024"
                  onChange={(v) => setListField("certifications", i, "year", v)}
                />
              </div>
            </ReorderCard>
          ))}
          <button
            type="button"
            className="rf-add-btn"
            onClick={() =>
              addItem("certifications", {
                name: "",
                issuingOrganization: "",
                year: "",
              })
            }
          >
            <Plus size={13} /> Add certification
          </button>
        </Section>

        {/* ── Achievements ── */}
        <Section
          id="s-achievements"
          heading="Achievements"
          count={(data.achievements || []).length || null}
        >
          {(data.achievements || []).length === 0 && (
            <p className="rf-empty-state">No achievements added yet</p>
          )}
          {(data.achievements || []).map((ach, i) => (
            <ReorderCard
              key={i}
              index={i}
              total={(data.achievements || []).length}
              previewText={ach.title || ""}
              label="achievement"
              onMoveUp={() => moveItem("achievements", i, -1)}
              onMoveDown={() => moveItem("achievements", i, 1)}
              onRemove={() => askRemove("achievements", i, "achievement")}
            >
              <div className="rf-grid2">
                <Field
                  label="Title"
                  value={ach.title || ""}
                  placeholder="Hackathon Winner"
                  onChange={(v) => setListField("achievements", i, "title", v)}
                />
                <Field
                  label="Year"
                  value={ach.year || ""}
                  placeholder="2023"
                  onChange={(v) => setListField("achievements", i, "year", v)}
                />
              </div>
              <label className="rf-label rf-textarea-label">Description</label>
              <CountedTextarea
                rows={2}
                maxChars={300}
                placeholder="Brief context or impact of this achievement…"
                value={ach.description || ach.extraInformation || ""}
                onChange={(e) =>
                  setListField("achievements", i, "description", e.target.value)
                }
              />
            </ReorderCard>
          ))}
          <button
            type="button"
            className="rf-add-btn"
            onClick={() =>
              addItem("achievements", { title: "", year: "", description: "" })
            }
          >
            <Plus size={13} /> Add achievement
          </button>
        </Section>

        {/* ── Languages ── */}
        <Section
          id="s-languages"
          heading="Languages"
          count={(data.languages || []).length || null}
        >
          {(data.languages || []).length === 0 && (
            <p className="rf-empty-state">No languages added yet</p>
          )}
          {(data.languages || []).map((lang, i) => (
            <div className="rf-card rf-card-inline" key={i}>
              <Field
                label="Language"
                value={lang.language || ""}
                placeholder="English"
                onChange={(v) => setListField("languages", i, "language", v)}
              />
              <Field
                label="Proficiency"
                value={lang.proficiency || ""}
                placeholder="Native / Fluent / B2"
                onChange={(v) => setListField("languages", i, "proficiency", v)}
              />
              <button
                type="button"
                className="rf-remove-btn rf-remove-inline"
                onClick={() => askRemove("languages", i, "language")}
                aria-label="Remove language"
              >
                <Trash2 size={11} />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="rf-add-btn"
            onClick={() =>
              addItem("languages", { language: "", proficiency: "" })
            }
          >
            <Plus size={13} /> Add language
          </button>
        </Section>

        {/* ── Interests ── */}
        <Section id="s-interests" heading="Interests">
          <div className="rf-interests-wrap">
            <TagInput
              label="Add interests"
              values={(data.interests || []).map((i) =>
                typeof i === "string" ? i : i.name || "",
              )}
              onChange={(arr) =>
                setData((prev) => ({
                  ...prev,
                  interests: arr.map((name) => ({ name })),
                }))
              }
              placeholder="Photography, Open source, Chess…"
            />
          </div>
        </Section>

        {/* ── Actions ── */}
        <div className="rf-actions">
          <button type="button" className="rf-btn-back" onClick={onBack}>
            <ArrowLeft size={15} /> Back
          </button>
          <div className="rf-actions-right">
            {emailHint && (
              <span className="rf-actions-status">
                Fix errors before continuing
              </span>
            )}
            <button type="submit" className="rf-btn-submit">
              Generate resume <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
