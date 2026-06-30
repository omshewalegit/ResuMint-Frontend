import { forwardRef } from "react";
import "./ModernTemplate.css";

/* ─── SVG Icons ─── */
const PhoneIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GithubIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    width="10"
    height="10"
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

/* Achievement marker — clean SVG flag/target, no emoji */
const AchMarker = () => (
  <svg
    className="mt-ach-marker"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
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
  // If it's already a number (1–5), use it directly
  const n = Number(p);
  if (!isNaN(n) && n >= 1 && n <= 5) return Math.round(n);

  const s = String(p).toLowerCase().trim();
  if (!s) return 0; // no proficiency given → show no dots

  if (s.includes("native")) return 5;
  if (s.includes("fluent") || s.includes("c2")) return 5;
  if (s.includes("advanced") || s.includes("c1") || s.includes("upper"))
    return 4;
  if (s.includes("intermediate") || s.includes("b1") || s.includes("b2"))
    return 3;
  if (s.includes("elementary") || s.includes("basic") || s.includes("a2"))
    return 2;
  if (s.includes("beginner") || s.includes("a1")) return 1;
  return 3; // unknown string → default 3
}

function LangDots({ count }) {
  return (
    <span className="mt-lang-dots">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`mt-lang-dot${i > count ? " empty" : ""}`} />
      ))}
    </span>
  );
}

/* ─── Main Component ─── */
const ModernTemplate = forwardRef(({ data }, ref) => {
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

  const allAchievements = [
    ...(achievements || []),
    ...(extraCurricular || []),
    ...(leadership || []),
  ];

  /* Use 2-col grid when no entry has bullet responsibilities */
  const useGrid =
    allAchievements.length > 0 &&
    allAchievements.every(
      (a) =>
        typeof a === "string" ||
        (!a.responsibilities?.length && !a.points?.length),
    );

  return (
    <div className="mt-wrap" ref={ref}>
      {/* ══ HEADER ══ */}
      <div className="mt-header">
        <h1 className="mt-name">{pi.fullName || "Your Name"}</h1>
        {pi.jobTitle && <div className="mt-role">{pi.jobTitle}</div>}
        {pi.location && (
          <div className="mt-location-line">
            <LocationIcon /> {pi.location}
          </div>
        )}

        <div className="mt-contact-bar">
          {pi.phoneNumber && (
            <span className="mt-contact-item">
              <PhoneIcon /> {pi.phoneNumber}
            </span>
          )}
          {pi.email && (
            <a className="mt-contact-item" href={`mailto:${pi.email}`}>
              <EmailIcon /> {pi.email}
            </a>
          )}
          {pi.linkedIn && (
            <a
              className="mt-contact-item"
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
              className="mt-contact-item"
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
        </div>
      </div>

      {/* ══ SUMMARY ══ */}
      {summary && (
        <section className="mt-section">
          <h2 className="mt-heading">Summary</h2>
          <p className="mt-summary">
            <BoldText text={summary} />
          </p>
        </section>
      )}

      {/* ══ EXPERIENCE ══ */}
      {experience.length > 0 && (
        <section className="mt-section">
          <h2 className="mt-heading">Experience</h2>
          {experience.map((exp, i) => (
            <div className="mt-entry" key={i}>
              <div className="mt-entry-title">
                {exp.jobTitle}
                {exp.organization ? `, ${exp.organization}` : ""}
              </div>
              {exp.company && (
                <div className="mt-entry-company">{exp.company}</div>
              )}
              <div className="mt-entry-meta">
                {(exp.startDate || exp.endDate) && (
                  <span className="mt-meta-item">
                    <CalendarIcon /> {exp.startDate} –{" "}
                    {exp.endDate || "Present"}
                  </span>
                )}
                {exp.location && (
                  <span className="mt-meta-item">
                    <LocationIcon /> {exp.location}
                  </span>
                )}
              </div>
              {(exp.responsibilities?.length > 0 ||
                exp.points?.length > 0 ||
                exp.description) && (
                <ul className="mt-bullets">
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

      {/* ══ EDUCATION ══ */}
      {education.length > 0 && (
        <section className="mt-section">
          <h2 className="mt-heading">Education</h2>
          {education.map((edu, i) => (
            <div className="mt-edu-entry" key={i}>
              <div className="mt-edu-degree">
                {edu.degree}
                {edu.major ? ` in ${edu.major}` : ""}
                {edu.gpa ? (
                  <>
                    {" "}
                    — <strong>CGPA: {edu.gpa}</strong>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-edu-school">
                {edu.university || edu.institution || edu.school}
              </div>
              <div className="mt-edu-meta">
                {(edu.startDate || edu.graduationYear || edu.endDate) && (
                  <span className="mt-meta-item">
                    <CalendarIcon />
                    {edu.startDate && edu.graduationYear
                      ? `${edu.startDate} – ${edu.graduationYear}`
                      : edu.startDate
                        ? `${edu.startDate} – ${edu.endDate || "Present"}`
                        : edu.graduationYear}
                  </span>
                )}
                {edu.location && (
                  <span className="mt-meta-item">
                    <LocationIcon /> {edu.location}
                  </span>
                )}
              </div>
              {edu.coursework && (
                <>
                  <div className="mt-edu-cw-heading">Relevant Coursework</div>
                  <ul className="mt-cw-grid">
                    {(Array.isArray(edu.coursework)
                      ? edu.coursework
                      : edu.coursework.split(",").map((c) => c.trim())
                    ).map((course, j) => (
                      <li key={j}>{course}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ══ KEY ACHIEVEMENTS ══ */}
      {allAchievements.length > 0 && (
        <section className="mt-section">
          <h2 className="mt-heading">Key Achievements</h2>

          {useGrid ? (
            <div className="mt-ach-grid">
              {allAchievements.map((a, i) => {
                const title =
                  typeof a === "string"
                    ? a
                    : a.title || a.organization || a.club || "";
                const desc = typeof a === "string" ? "" : a.description || "";
                const year =
                  typeof a === "string"
                    ? ""
                    : a.year ||
                      (a.startDate
                        ? `${a.startDate}${a.endDate ? ` – ${a.endDate}` : ""}`
                        : "");
                return (
                  <div className="mt-ach-item" key={i}>
                    <p className="mt-ach-title">
                      {title}
                      {year ? (
                        <span style={{ fontWeight: 400, color: "#666" }}>
                          {" "}
                          — {year}
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                    {desc && <p className="mt-ach-desc">{desc}</p>}
                  </div>
                );
              })}
            </div>
          ) : (
            allAchievements.map((item, i) => {
              if (typeof item === "string") {
                return (
                  <ul
                    className="mt-bullets"
                    key={i}
                    style={{ marginBottom: 4 }}
                  >
                    <li>
                      <BoldText text={item} />
                    </li>
                  </ul>
                );
              }
              return (
                <div className="mt-ach-detail" key={i}>
                  <div className="mt-ach-detail-row">
                    <span className="mt-ach-detail-title">
                      {item.organization || item.club || item.title}
                      {item.role ? `, ${item.role}` : ""}
                    </span>
                    {(item.startDate || item.year) && (
                      <span className="mt-ach-detail-date">
                        {item.startDate
                          ? `${item.startDate} – ${item.endDate || "Present"}`
                          : item.year}
                      </span>
                    )}
                  </div>
                  {item.responsibilities?.length > 0 && (
                    <ul className="mt-bullets">
                      {item.responsibilities.map((r, j) => (
                        <li key={j}>
                          <BoldText text={r} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })
          )}
        </section>
      )}

      {/* ══ LANGUAGES ══ */}
      {languages?.length > 0 && (
        <section className="mt-section">
          <h2 className="mt-heading">Languages</h2>
          <div className="mt-lang-row">
            {languages.map((l, i) => {
              const name = typeof l === "string" ? l : l.language;
              const prof = typeof l === "string" ? "" : l.proficiency || "";
              return (
                <div className="mt-lang-item" key={i}>
                  <div className="mt-lang-top">
                    <span className="mt-lang-name">{name}</span>
                    <LangDots count={profToDots(prof)} />
                  </div>
                  {prof && <p className="mt-lang-level">{prof}</p>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ══ SKILLS ══ */}
      {skillCategories.length > 0 && (
        <section className="mt-section">
          <h2 className="mt-heading">Skills</h2>
          <div className="mt-skills-block">
            {skillCategories.map((s, i) => (
              <div className="mt-skill-row" key={i}>
                <span className="mt-skill-label">{s.label}</span>
                <div className="mt-skill-tags">
                  {(Array.isArray(s.values) ? s.values : [s.values]).map(
                    (skill, j) => (
                      <span className="mt-skill-tag" key={j}>
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ PROJECTS ══ */}
      {projects.length > 0 && (
        <section className="mt-section">
          <h2 className="mt-heading">Projects</h2>
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
              <div className="mt-proj-entry" key={i}>
                <div className="mt-proj-header">
                  <div className="mt-proj-title-group">
                    <span className="mt-proj-name">{p.title}</span>
                    {(p.liveLink || p.githubLink) && (
                      <span className="mt-proj-icons">
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
                        <span className="mt-proj-pipe"> | </span>
                        <span className="mt-proj-tech">
                          {techList.join(", ")}
                        </span>
                      </>
                    )}
                  </div>
                  {displayDate && (
                    <span className="mt-proj-date">{displayDate}</span>
                  )}
                </div>
                {p.responsibilities?.length > 0 ? (
                  <ul className="mt-bullets">
                    {p.responsibilities.map((r, j) => (
                      <li key={j}>
                        <BoldText text={r} />
                      </li>
                    ))}
                  </ul>
                ) : p.description ? (
                  <ul className="mt-bullets">
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

      {/* ══ CERTIFICATIONS ══ */}
      {certifications?.filter((c) => c.name).length > 0 && (
        <section className="mt-section">
          <h2 className="mt-heading">Certifications</h2>
          {certifications
            .filter((c) => c.name)
            .map((c, i) => (
              <div className="mt-cert-entry" key={i}>
                <div className="mt-cert-row">
                  <span className="mt-cert-name">{c.name}</span>
                  <span className="mt-cert-date">{c.year}</span>
                </div>
                {c.issuingOrganization && (
                  <p className="mt-cert-issuer">{c.issuingOrganization}</p>
                )}
              </div>
            ))}
        </section>
      )}

      {/* ══ INTERESTS / HOBBIES ══ */}
      {hobbyList.length > 0 && (
        <section className="mt-section">
          <h2 className="mt-heading">Interests</h2>
          <p className="mt-interests-text">
            {hobbyList
              .map((h) => (typeof h === "string" ? h : h.name || h.title || ""))
              .filter(Boolean)
              .join("   •   ")}
          </p>
        </section>
      )}
    </div>
  );
});

ModernTemplate.displayName = "ModernTemplate";
export default ModernTemplate;
