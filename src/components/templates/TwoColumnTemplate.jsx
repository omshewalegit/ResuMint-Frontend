import { forwardRef } from "react";
import "./TwoColumnTemplate.css";

/* ─── SVG Icons ─── */
const PhoneIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);
const EmailIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
const GithubIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LocationIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);
const CalendarIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
  </svg>
);
const ExternalLinkIcon = () => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* Icon set rotated for the right-column icon items (Strengths / Most Proud Of) */
const BadgeIcons = [
  () => (
    <svg
      className="tc-icon-badge"
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
      className="tc-icon-badge"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 11v10H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3zm0 0l5-9a2 2 0 0 1 2 2v5h5.28a2 2 0 0 1 1.98 2.3l-1.2 8A2 2 0 0 1 18.1 21H7" />
    </svg>
  ),
  () => (
    <svg
      className="tc-icon-badge"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  () => (
    <svg
      className="tc-icon-badge"
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

/* Decorative wavy blobs matching the source layout's top-right / bottom-left motif */
const WaveTop = () => (
  <svg
    className="tc-wave-top"
    viewBox="0 0 520 300"
    preserveAspectRatio="xMaxYMin slice"
    aria-hidden="true"
  >
    <circle cx="470" cy="40" r="190" fill="#ececec" />
    <circle cx="540" cy="170" r="140" fill="#f3f3f3" />
    <path d="M180 0 C 280 60, 320 -20, 520 70 L 520 0 Z" fill="#e4e4e4" />
  </svg>
);

const WaveBottom = () => (
  <svg
    className="tc-wave-bottom"
    viewBox="0 0 480 260"
    preserveAspectRatio="xMinYMax slice"
    aria-hidden="true"
  >
    <circle cx="40" cy="230" r="170" fill="#ececec" />
    <circle cx="-30" cy="120" r="120" fill="#f3f3f3" />
    <path d="M0 260 C 80 180, 140 260, 260 220 L 0 220 Z" fill="#e4e4e4" />
  </svg>
);

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
    <span className="tc-lang-dots">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`tc-lang-dot${i > count ? " empty" : ""}`} />
      ))}
    </span>
  );
}

/* ─── Main Component ─── */
const TwoColumnTemplate = forwardRef(({ data }, ref) => {
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
    strengths = [],
    hobbies = [],
    interests = [],
  } = data;

  const hobbyList = [...(hobbies || []), ...(interests || [])];

  const skillCategories = [
    {
      label: "Programming Languages",
      values: skills.programmingLanguages || [],
    },
    {
      label: "Frameworks & Libraries",
      values: skills.frameworks || skills.webTechnologies || [],
    },
    { label: "Databases", values: skills.databases || [] },
    { label: "Cloud", values: skills.cloud || [] },
    { label: "DevOps Tools", values: skills.devOpsTools || [] },
    { label: "Other", values: skills.other || [] },
  ].filter((s) => (Array.isArray(s.values) ? s.values.length > 0 : !!s.values));

  /* Personal Values: flatten every skill tag into one pill list (falls back gracefully if data uses a flat skills array instead) */
  const personalValues =
    skillCategories.length > 0
      ? skillCategories.flatMap((s) =>
          Array.isArray(s.values) ? s.values : [s.values],
        )
      : Array.isArray(skills)
        ? skills
        : [];

  /* Strengths: dedicated field if present, else derived from extraCurricular/leadership so the section is never empty when that data exists */
  const strengthList =
    strengths.length > 0
      ? strengths
      : [...(extraCurricular || []), ...(leadership || [])];

  /* Most Proud Of: dedicated achievements list */
  const achievementList = achievements.length > 0 ? achievements : strengthList;

  return (
    <div className="tc-wrap" ref={ref}>
      <WaveTop />
      <WaveBottom />

      <div className="tc-content">
        {/* ══ HEADER ══ */}
        <div className="tc-header">
          <h1 className="tc-name">{pi.fullName || "Your Name"}</h1>
          {pi.jobTitle && <div className="tc-role">{pi.jobTitle}</div>}
          <div className="tc-contact-bar">
            {pi.phoneNumber && (
              <span className="tc-contact-item">
                <PhoneIcon /> {pi.phoneNumber}
              </span>
            )}
            {pi.email && (
              <a className="tc-contact-item" href={`mailto:${pi.email}`}>
                <EmailIcon /> {pi.email}
              </a>
            )}
            {pi.linkedIn && (
              <a
                className="tc-contact-item"
                href={
                  pi.linkedIn.startsWith("http")
                    ? pi.linkedIn
                    : `https://${pi.linkedIn}`
                }
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon />
                {pi.linkedIn.replace(
                  /https?:\/\/(www\.)?linkedin\.com\/in\//i,
                  "",
                )}
              </a>
            )}
            {(pi.gitHub || pi.website) && (
              <a
                className="tc-contact-item"
                href={
                  (pi.gitHub || pi.website).startsWith("http")
                    ? pi.gitHub || pi.website
                    : `https://${pi.gitHub || pi.website}`
                }
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />
                {(pi.gitHub || pi.website).replace(
                  /https?:\/\/(www\.)?github\.com\//i,
                  "",
                )}
              </a>
            )}
            {pi.location && (
              <span className="tc-contact-item">
                <LocationIcon /> {pi.location}
              </span>
            )}
          </div>
        </div>

        {/* ══ TWO COLUMN BODY ══ */}
        <div className="tc-columns">
          {/* ─── LEFT COLUMN ─── */}
          <div className="tc-col-left">
            {summary && (
              <section className="tc-section">
                <h2 className="tc-heading">Summary</h2>
                <p className="tc-summary">
                  <BoldText text={summary} />
                </p>
              </section>
            )}

            {experience.length > 0 && (
              <section className="tc-section">
                <h2 className="tc-heading">Experience</h2>
                {experience.map((exp, i) => (
                  <div className="tc-entry" key={i}>
                    <div className="tc-entry-title">{exp.jobTitle}</div>
                    <div className="tc-entry-company">{exp.company}</div>
                    <div className="tc-entry-meta">
                      {(exp.startDate || exp.endDate) && (
                        <span className="tc-meta-item">
                          <CalendarIcon /> {exp.startDate} –{" "}
                          {exp.endDate || "Present"}
                        </span>
                      )}
                      {exp.location && (
                        <span className="tc-meta-item">
                          <LocationIcon /> {exp.location}
                        </span>
                      )}
                    </div>
                    {exp.organization && (
                      <p className="tc-entry-desc">{exp.organization}</p>
                    )}
                    {(exp.responsibilities?.length > 0 ||
                      exp.points?.length > 0 ||
                      exp.description) && (
                      <ul className="tc-bullets">
                        {(exp.responsibilities || exp.points || []).map(
                          (r, j) => (
                            <li key={j}>
                              <BoldText text={r} />
                            </li>
                          ),
                        )}
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

            {education.length > 0 && (
              <section className="tc-section">
                <h2 className="tc-heading">Education</h2>
                {education.map((edu, i) => (
                  <div className="tc-entry" key={i}>
                    <div className="tc-edu-degree">
                      {edu.degree}
                      {edu.major ? ` in ${edu.major}` : ""}
                    </div>
                    <div className="tc-edu-school">
                      {edu.university || edu.institution || edu.school}
                    </div>
                    <div className="tc-entry-meta">
                      {(edu.startDate || edu.graduationYear || edu.endDate) && (
                        <span className="tc-meta-item">
                          <CalendarIcon />
                          {edu.startDate && edu.graduationYear
                            ? `${edu.startDate} – ${edu.graduationYear}`
                            : edu.startDate
                              ? `${edu.startDate} – ${edu.endDate || "Present"}`
                              : edu.graduationYear}
                        </span>
                      )}
                      {edu.location && (
                        <span className="tc-meta-item">
                          <LocationIcon /> {edu.location}
                        </span>
                      )}
                    </div>
                    {edu.gpa && (
                      <p className="tc-edu-gpa">
                        CGPA: <strong>{edu.gpa}</strong>
                      </p>
                    )}
                    {edu.coursework && (
                      <>
                        <div className="tc-edu-cw-heading">
                          Relevant Coursework
                        </div>
                        <ul className="tc-cw-grid">
                          {(Array.isArray(edu.coursework)
                            ? edu.coursework
                            : edu.coursework.split(",").map((c) => c.trim())
                          ).map((c, j) => (
                            <li key={j}>{c}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </section>
            )}

            {projects.length > 0 && (
              <section className="tc-section">
                <h2 className="tc-heading">Projects</h2>
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
                    <div className="tc-proj-entry" key={i}>
                      <div className="tc-proj-header">
                        <div className="tc-proj-title-group">
                          <span className="tc-proj-name">{p.title}</span>
                          {(p.liveLink || p.githubLink) && (
                            <span className="tc-proj-icons">
                              {p.liveLink && (
                                <a
                                  href={p.liveLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  title="Live"
                                >
                                  <ExternalLinkIcon />
                                </a>
                              )}
                              {p.githubLink && (
                                <a
                                  href={p.githubLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  title="GitHub"
                                >
                                  <GithubIcon />
                                </a>
                              )}
                            </span>
                          )}
                          {techList.length > 0 && (
                            <>
                              <span className="tc-proj-pipe"> | </span>
                              <span className="tc-proj-tech">
                                {techList.join(", ")}
                              </span>
                            </>
                          )}
                        </div>
                        {displayDate && (
                          <span className="tc-proj-date">{displayDate}</span>
                        )}
                      </div>
                      {p.responsibilities?.length > 0 ? (
                        <ul className="tc-bullets">
                          {p.responsibilities.map((r, j) => (
                            <li key={j}>
                              <BoldText text={r} />
                            </li>
                          ))}
                        </ul>
                      ) : p.description ? (
                        <ul className="tc-bullets">
                          <li>
                            <BoldText text={p.description} />
                          </li>
                        </ul>
                      ) : null}
                    </div>
                  );
                })}
              </section>
            )}

            {certifications?.filter((c) => c.name).length > 0 && (
              <section className="tc-section">
                <h2 className="tc-heading">Certifications</h2>
                {certifications
                  .filter((c) => c.name)
                  .map((c, i) => (
                    <div className="tc-cert-entry" key={i}>
                      <div className="tc-cert-row">
                        <span className="tc-cert-name">{c.name}</span>
                        <span className="tc-cert-date">{c.year}</span>
                      </div>
                      {c.issuingOrganization && (
                        <p className="tc-cert-issuer">
                          {c.issuingOrganization}
                        </p>
                      )}
                    </div>
                  ))}
              </section>
            )}
          </div>

          {/* ─── RIGHT COLUMN ─── */}
          <div className="tc-col-right">
            {strengthList.length > 0 && (
              <section className="tc-section">
                <h2 className="tc-heading">Strengths</h2>
                {strengthList.map((item, i) => {
                  const title =
                    typeof item === "string"
                      ? item
                      : item.title || item.organization || item.club || "";
                  const desc =
                    typeof item === "string"
                      ? ""
                      : item.description ||
                        (item.responsibilities || item.points || [])[0] ||
                        "";
                  const Icon = BadgeIcons[i % BadgeIcons.length];
                  return (
                    <div className="tc-icon-item" key={i}>
                      <Icon />
                      <div className="tc-icon-body">
                        <p className="tc-icon-title">{title}</p>
                        {desc && <p className="tc-icon-desc">{desc}</p>}
                      </div>
                    </div>
                  );
                })}
              </section>
            )}

            {achievementList.length > 0 && (
              <section className="tc-section">
                <h2 className="tc-heading">Achievements</h2>
                {achievementList.map((item, i) => {
                  const title =
                    typeof item === "string"
                      ? item
                      : item.title || item.organization || item.club || "";
                  const desc =
                    typeof item === "string"
                      ? ""
                      : item.description ||
                        (item.responsibilities || item.points || [])[0] ||
                        "";
                  const Icon = BadgeIcons[(i + 2) % BadgeIcons.length];
                  return (
                    <div className="tc-icon-item" key={i}>
                      <Icon />
                      <div className="tc-icon-body">
                        <p className="tc-icon-title">{title}</p>
                        {desc && <p className="tc-icon-desc">{desc}</p>}
                      </div>
                    </div>
                  );
                })}
              </section>
            )}

            {personalValues.length > 0 && (
              <section className="tc-section">
                <h2 className="tc-heading">Skills</h2>
                <div className="tc-pills">
                  {personalValues.map((v, i) => (
                    <span className="tc-pill" key={i}>
                      {v}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {languages?.length > 0 && (
              <section className="tc-section">
                <h2 className="tc-heading">Languages</h2>
                <div className="tc-lang-list">
                  {languages.map((l, i) => {
                    const name = typeof l === "string" ? l : l.language;
                    const prof =
                      typeof l === "string" ? "" : l.proficiency || "";
                    return (
                      <div className="tc-lang-row" key={i}>
                        <span className="tc-lang-name">{name}</span>
                        <LangDots count={profToDots(prof)} />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {hobbyList.length > 0 && (
              <section className="tc-section">
                <h2 className="tc-heading">Interests</h2>
                <ul className="tc-interests-list">
                  {hobbyList
                    .map((h) =>
                      typeof h === "string" ? h : h.name || h.title || "",
                    )
                    .filter(Boolean)
                    .map((label, i) => (
                      <li key={i}>{label}</li>
                    ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      <div className="tc-footer">{pi.website && <span>{pi.website}</span>}</div>
    </div>
  );
});

TwoColumnTemplate.displayName = "TwoColumnTemplate";
export default TwoColumnTemplate;
