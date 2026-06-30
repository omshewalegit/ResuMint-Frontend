import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Download,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  FileText,
  CheckCircle2,
  LayoutTemplate,
} from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import InputForm from "../components/InputForm/InputForm";
import ResumeForm from "../components/ResumeForm/ResumeForm";
import ResumePreviewWrapper from "../components/templates/ResumePreviewWrapper";
import TemplateSelector from "../components/templates/TemplateSelector";
import { generateResume } from "../services/api";
import "./BuilderPage.css";

const STEPS = [
  { id: "prompt", label: "Describe", icon: <Sparkles size={14} /> },
  { id: "form", label: "Review", icon: <FileText size={14} /> },
  { id: "template", label: "Template", icon: <LayoutTemplate size={14} /> },
  { id: "preview", label: "Export", icon: <CheckCircle2 size={14} /> },
];

export default function BuilderPage() {
  const [step, setStep] = useState("prompt");
  const [resumeData, setResumeData] = useState(null);
  const [templateId, setTemplateId] = useState("classic");
  const [isLoading, setIsLoading] = useState(false);
  const resumeRef = useRef(null);

  const currentStepIdx = STEPS.findIndex((s) => s.id === step);

  // Button ripple effect (from LP)
  useEffect(() => {
    const btns = document.querySelectorAll(".btn");
    const h = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty(
        "--bx",
        ((e.clientX - r.left) / r.width) * 100 + "%",
      );
      e.currentTarget.style.setProperty(
        "--by",
        ((e.clientY - r.top) / r.height) * 100 + "%",
      );
    };
    btns.forEach((b) => b.addEventListener("mousemove", h));
    return () => btns.forEach((b) => b.removeEventListener("mousemove", h));
  });

  const handleGenerate = async (description) => {
    setIsLoading(true);
    const toastId = toast.loading("AI is crafting your resume…", {
      style: {
        background: "#0d1a24",
        color: "#e8edf5",
        border: "1px solid rgba(0,212,255,0.2)",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "13px",
      },
    });
    try {
      const raw = await generateResume(description);
      let parsed;
      if (typeof raw === "string") {
        const clean = raw.replace(/```json|```/gi, "").trim();
        parsed = JSON.parse(clean);
      } else {
        parsed = raw;
      }

      // Normalize achievements — AI sometimes returns strings instead of objects
      if (parsed.achievements) {
        parsed.achievements = parsed.achievements.map((a) =>
          typeof a === "string" ? { title: a, year: "", description: "" } : a,
        );
      }

      setResumeData(parsed);
      setStep("form");
      toast.success("Done! Review and edit your details.", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Generation failed. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  // Form submit → go to template picker
  const handleFormSubmit = (editedData) => {
    setResumeData(editedData);
    setStep("template");
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="bp-page">
      <Navbar />

      {/* Ambient effects — matching LP */}
      <div className="noise-overlay" />
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-grid" />
      <div className="bp-scanline" />

      <div className="bp-container">
        {/* ── Header ── */}
        <div className="bp-header">
          <div className="bp-header-label">
            <span className="bp-header-label-line" />
            Resume Builder
          </div>
          <h1 className="bp-title">
            {step === "prompt" && (
              <>Craft your <span className="bp-title-accent">perfect resume</span></>
            )}
            {step === "form" && (
              <>Review & <span className="bp-title-accent">perfect</span> every detail</>
            )}
            {step === "template" && (
              <>Pick your <span className="bp-title-accent">template</span></>
            )}
            {step === "preview" && (
              <>Your resume is <span className="bp-title-accent">ready</span></>
            )}
          </h1>
          <p className="bp-subtitle">
            {step === "prompt" && "Describe yourself and let AI do the rest."}
            {step === "form" && "Fine-tune every section before choosing a layout."}
            {step === "template" && "Choose a design that matches your style."}
            {step === "preview" && "Download your pixel-perfect PDF."}
          </p>

          <div className="bp-stepper">
            {STEPS.map((s, i) => (
              <div key={s.id} className="bp-step-wrap">
                {i > 0 && (
                  <div
                    className={`bp-step-line ${i <= currentStepIdx ? "done" : ""}`}
                  />
                )}
                <div
                  className={`bp-step-item ${step === s.id ? "active" : i < currentStepIdx ? "done" : ""}`}
                >
                  <div className="bp-step-dot">
                    {i < currentStepIdx ? (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5l2.5 2.5L8 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      s.icon
                    )}
                  </div>
                  <span className="bp-step-label">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Step 1: Prompt ── */}
        {step === "prompt" && (
          <div className="bp-centered bp-step-content">
            <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
        )}

        {/* ── Step 2: Edit form ── */}
        {step === "form" && resumeData && (
          <div className="bp-step-content">
            <ResumeForm
              initialData={resumeData}
              onSubmit={handleFormSubmit}
              onBack={() => setStep("prompt")}
            />
          </div>
        )}

        {/* ── Step 3: Template picker ── */}
        {step === "template" && resumeData && (
          <div className="bp-step-content">
            <TemplateSelector
              selectedId={templateId}
              onSelect={setTemplateId}
              onContinue={() => setStep("preview")}
              onBack={() => setStep("form")}
            />
          </div>
        )}

        {/* ── Step 4: Preview + Download ── */}
        {step === "preview" && resumeData && (
          <div className="bp-preview-page bp-step-content">
            <div className="bp-toolbar">
              <div className="bp-toolbar-left">
                <button
                  className="bp-tool-btn"
                  onClick={() => setStep("template")}
                >
                  <ArrowLeft size={13} /> Template
                </button>
                <button className="bp-tool-btn" onClick={() => setStep("form")}>
                  <ArrowLeft size={13} /> Edit
                </button>
                <button
                  className="bp-tool-btn"
                  onClick={() => {
                    setResumeData(null);
                    setStep("prompt");
                  }}
                >
                  <RotateCcw size={13} /> Start over
                </button>
              </div>
              <div className="bp-toolbar-center">
                <span className="bp-toolbar-name">
                  {resumeData?.personalInformation?.fullName || "Resume"} · PDF
                  Ready
                </span>
              </div>
              <div className="bp-toolbar-right">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleDownloadPDF}
                >
                  <Download size={13} /> Download PDF
                </button>
              </div>
            </div>
            <div className="bp-preview-wrap">
              <ResumePreviewWrapper
                ref={resumeRef}
                data={resumeData}
                templateId={templateId}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
