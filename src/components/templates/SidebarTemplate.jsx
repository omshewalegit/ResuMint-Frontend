import { forwardRef } from "react";
import "./SidebarTemplate.css";

/* ─── SVG Icons ─── */
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
  </svg>
);
const ExternalLinkIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* Achievement icon set — rotates per item */
const AchIcons = [
  () => (
    <svg
      className="sb-achieve-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  () => (
    <svg
      className="sb-achieve-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22V4a1 1 0 0 1 1-1h13.13a.5.5 0 0 1 .4.8L15 9l3.53 5.2a.5.5 0 0 1-.4.8H5a1 1 0 0 0-1 1" />
    </svg>
  ),
  () => (
    <svg
      className="sb-achieve-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
    </svg>
  ),
  () => (
    <svg
      className="sb-achieve-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
];

/* ─── Helpers ─── */
function BoldText({ text }) {
  if (!text) return null;
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
      )}
    </>
  );
}

function profToDots(p = "") {
  const n = Number(p);
  if (!isNaN(n) && n >= 1 && n <= 5) return Math.round(n);
  const s = String(p).toLowerCase().trim();
  if (!s) return 0;
  if (s.includes("native") || s.includes("c2")) return 5;
  if (s.includes("fluent")) return 5;
  if (s.includes("advanced") || s.includes("c1") || s.includes("upper"))
    return 4;
  if (s.includes("intermediate") || s.includes("b")) return 3;
  if (s.includes("elementary") || s.includes("basic") || s.includes("a2"))
    return 2;
  if (s.includes("beginner") || s.includes("a1")) return 1;
  return 3;
}

function LangDots({ count }) {
  return (
    <span className="sb-lang-dots">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`sb-lang-dot${i > count ? " empty" : ""}`} />
      ))}
    </span>
  );
}

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ─── Main Component ─── */
const SidebarTemplate = forwardRef(({ data }, ref) => {
  if (!data) return null;

  const {
    personalInformation: pi = {},
    summary,
    skills = {},
    experience = [],
    education = [],
    certifications = [],
    projects = [],
    languages = [],
    extraCurricular = [],
    leadership = [],
    achievements = [],
    hobbies = [],
    interests = [],
  } = data;

  const allSkills = [
    ...(skills.programmingLanguages || []),
    ...(skills.frameworks || skills.webTechnologies || []),
    ...(skills.databases || []),
    ...(skills.cloud || []),
    ...(skills.devOpsTools || []),
    ...(skills.softSkills || []),
    ...(skills.other || []),
  ];

  const hobbyList = [...(hobbies || []), ...(interests || [])]
    .map((h) => (typeof h === "string" ? h : h.name || h.title || ""))
    .filter(Boolean);

  const allAchievements = [
    ...(achievements || []),
    ...(extraCurricular || []),
    ...(leadership || []),
  ];

  return (
    <div className="sb-resume" ref={ref}>
      {/* ══ LEFT SIDEBAR ══ */}
      <div className="sb-sidebar">
        <div className="sb-sidebar-top">
          <div className="sb-avatar">{getInitials(pi.fullName)}</div>
          <h1 className="sb-name">{pi.fullName || "Your Name"}</h1>
          {pi.jobTitle && <p className="sb-role">{pi.jobTitle}</p>}
          <div className="sb-contact">
            {pi.phoneNumber && (
              <a
                className="sb-contact-item"
                href={`tel:${pi.phoneNumber.replace(/\s/g, "")}`}
              >
                <PhoneIcon /> {pi.phoneNumber}
              </a>
            )}
            {pi.email && (
              <a className="sb-contact-item" href={`mailto:${pi.email}`}>
                <EmailIcon /> {pi.email}
              </a>
            )}
            {pi.linkedIn && (
              <a
                className="sb-contact-item"
                href={
                  pi.linkedIn.startsWith("http")
                    ? pi.linkedIn
                    : `https://${pi.linkedIn}`
                }
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon />{" "}
                {pi.linkedIn.replace(
                  /https?:\/\/(www\.)?linkedin\.com\/in\//i,
                  "",
                )}
              </a>
            )}
            {(pi.gitHub || pi.website) && (
              <a
                className="sb-contact-item"
                href={
                  (pi.gitHub || pi.website).startsWith("http")
                    ? pi.gitHub || pi.website
                    : `https://${pi.gitHub || pi.website}`
                }
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />{" "}
                {(pi.gitHub || pi.website).replace(
                  /https?:\/\/(www\.)?(github\.com\/)?/i,
                  "",
                )}
              </a>
            )}
            {pi.location && (
              <div className="sb-contact-item">
                <LocationIcon /> {pi.location}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {allSkills.length > 0 && (
          <div className="sb-side-section">
            <h2 className="sb-side-heading">Skills</h2>
            <div className="sb-skills">
              {allSkills.map((s, i) => (
                <span className="sb-skill" key={i}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="sb-side-section">
            <h2 className="sb-side-heading">Languages</h2>
            {languages.map((l, i) => {
              const name = typeof l === "string" ? l : l.language;
              const prof = typeof l === "string" ? "" : l.proficiency || "";
              return (
                <div className="sb-lang" key={i}>
                  <div className="sb-lang-top">
                    <span className="sb-lang-name">{name}</span>
                    <LangDots count={profToDots(prof)} />
                  </div>
                  {prof && <p className="sb-lang-level">{prof}</p>}
                </div>
              );
            })}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="sb-side-section">
            <h2 className="sb-side-heading">Education</h2>
            {education.map((edu, i) => (
              <div className="sb-edu" key={i}>
                <span className="sb-edu-degree">
                  {edu.degree}
                  {edu.major ? ` in ${edu.major}` : ""}
                </span>
                <span className="sb-edu-uni">
                  {edu.university || edu.institution || edu.school}
                </span>
                <div className="sb-edu-meta">
                  {(edu.graduationYear || edu.startDate) && (
                    <span>
                      <CalendarIcon />
                      {edu.startDate && edu.graduationYear
                        ? `${edu.startDate} – ${edu.graduationYear}`
                        : edu.graduationYear ||
                          `${edu.startDate} – ${edu.endDate || "Present"}`}
                    </span>
                  )}
                  {edu.location && (
                    <span>
                      <LocationIcon /> {edu.location}
                    </span>
                  )}
                </div>
                {edu.gpa && (
                  <p className="sb-cert-date" style={{ marginTop: 2 }}>
                    CGPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications?.filter((c) => c.name).length > 0 && (
          <div className="sb-side-section">
            <h2 className="sb-side-heading">Certifications</h2>
            {certifications
              .filter((c) => c.name)
              .map((c, i) => (
                <div className="sb-cert" key={i}>
                  <span className="sb-cert-name">{c.name}</span>
                  {c.issuingOrganization && (
                    <span className="sb-cert-issuer">
                      {c.issuingOrganization}
                    </span>
                  )}
                  {c.year && <span className="sb-cert-date">{c.year}</span>}
                </div>
              ))}
          </div>
        )}

        {/* Interests */}
        {hobbyList.length > 0 && (
          <div className="sb-side-section">
            <h2 className="sb-side-heading">Interests</h2>
            <ul className="sb-interests-list">
              {hobbyList.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ══ RIGHT MAIN ══ */}
      <div className="sb-main">
        {/* Summary */}
        {summary && (
          <section className="sb-section">
            <h2 className="sb-heading">Summary</h2>
            <p className="sb-text">
              <BoldText text={summary} />
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="sb-section">
            <h2 className="sb-heading">Experience</h2>
            {experience.map((exp, i) => (
              <div className="sb-entry" key={i}>
                <div className="sb-entry-head">
                  <span className="sb-entry-title">
                    {exp.jobTitle}
                    {exp.organization ? `, ${exp.organization}` : ""}
                  </span>
                  {(exp.startDate || exp.endDate) && (
                    <span className="sb-entry-date">
                      {exp.startDate} – {exp.endDate || "Present"}
                    </span>
                  )}
                </div>
                {exp.company && (
                  <span className="sb-entry-company">{exp.company}</span>
                )}
                {exp.location && (
                  <div className="sb-entry-meta">
                    <span>
                      <LocationIcon /> {exp.location}
                    </span>
                  </div>
                )}
                {(exp.responsibilities?.length > 0 ||
                  exp.points?.length > 0 ||
                  exp.description) && (
                  <ul className="sb-list">
                    {(exp.responsibilities || exp.points || []).map((r, j) => (
                      <li key={j}>
                        <BoldText text={r} />
                      </li>
                    ))}
                    {exp.description &&
                      !exp.responsibilities?.length &&
                      !exp.points?.length && (
                        <li>
                          <BoldText text={exp.description} />
                        </li>
                      )}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="sb-section">
            <h2 className="sb-heading">Projects</h2>
            {projects.map((p, i) => {
              const displayDate =
                p.date ||
                (p.startDate && p.endDate
                  ? `${p.startDate} – ${p.endDate}`
                  : p.startDate || p.endDate || "");
              const techList = Array.isArray(p.technologiesUsed)
                ? p.technologiesUsed
                : p.technologiesUsed
                  ? [p.technologiesUsed]
                  : [];
              return (
                <div className="sb-entry" key={i}>
                  <div className="sb-entry-head">
                    <div className="sb-proj-title-row">
                      <span className="sb-entry-title">{p.title}</span>
                      {(p.liveLink || p.githubLink) && (
                        <span className="sb-proj-links">
                          {p.liveLink && (
                            <a
                              href={p.liveLink}
                              target="_blank"
                              rel="noreferrer"
                              title="Live"
                            >
                              <ExternalLinkIcon
                                style={{ width: 11, height: 11 }}
                              />
                            </a>
                          )}
                          {p.githubLink && (
                            <a
                              href={p.githubLink}
                              target="_blank"
                              rel="noreferrer"
                              title="GitHub"
                            >
                              <GithubIcon style={{ width: 11, height: 11 }} />
                            </a>
                          )}
                        </span>
                      )}
                    </div>
                    {displayDate && (
                      <span className="sb-entry-date">{displayDate}</span>
                    )}
                  </div>
                  {techList.length > 0 && (
                    <p className="sb-tech">{techList.join(", ")}</p>
                  )}
                  {p.responsibilities?.length > 0 ? (
                    <ul className="sb-list">
                      {p.responsibilities.map((r, j) => (
                        <li key={j}>
                          <BoldText text={r} />
                        </li>
                      ))}
                    </ul>
                  ) : p.description ? (
                    <p className="sb-text" style={{ marginTop: 4 }}>
                      <BoldText text={p.description} />
                    </p>
                  ) : null}
                </div>
              );
            })}
          </section>
        )}

        {/* Achievements */}
        {allAchievements.length > 0 && (
          <section className="sb-section">
            <h2 className="sb-heading">Key Achievements</h2>
            <div className="sb-achieve-grid">
              {allAchievements.map((a, i) => {
                const title =
                  typeof a === "string"
                    ? a
                    : a.title || a.organization || a.club || "";
                const desc =
                  typeof a === "string"
                    ? ""
                    : a.description ||
                      (a.responsibilities || a.points || [])[0] ||
                      "";
                const Icon = AchIcons[i % AchIcons.length];
                return (
                  <div className="sb-achieve" key={i}>
                    <Icon />
                    <div className="sb-achieve-body">
                      <p className="sb-achieve-title">{title}</p>
                      {desc && <p className="sb-achieve-desc">{desc}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});

SidebarTemplate.displayName = "SidebarTemplate";
export default SidebarTemplate;
