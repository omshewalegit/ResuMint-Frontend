import { forwardRef } from "react";
import "./ResumePreview.css";

/* ─────────────────────────────────────────────────────────────
   SVG Icons — matching PDF exactly
───────────────────────────────────────────────────────────── */
const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ verticalAlign: "middle" }}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ verticalAlign: "middle" }}
  >
    <path
      d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
      0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755
      -1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236
      1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466
      -1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176
      0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405
      2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23
      1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22
      0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295
      24 12c0-6.63-5.37-12-12-12z"
    />
  </svg>
);

/* Phone handset SVG — matches PDF exactly */
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ verticalAlign: "middle" }}
  >
    <path
      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24
      1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17
      0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
    />
  </svg>
);

/* Envelope SVG — matches PDF exactly */
const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ verticalAlign: "middle" }}
  >
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

/* LinkedIn "in" box icon */
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ verticalAlign: "middle" }}
  >
    <path
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762
      0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966
      0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783
      1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586
      7-2.777 7 2.476v6.759z"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Helper: **bold** markdown support
───────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
const ResumePreview = forwardRef(({ data }, ref) => {
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

  // Exactly 6 skill categories — same keys as form, same labels as form
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

  return (
    <div className="resume-preview" ref={ref}>
      {/* ════ HEADER ════ */}
      <div className="resume-header">
        <h1 className="resume-name">{pi.fullName || "Your Name"}</h1>
        <div className="resume-location">{pi.location || " "}</div>

        <div className="resume-contact">
          {pi.phoneNumber && (
            <span className="contact-item">
              <span className="contact-icon">
                <PhoneIcon />
              </span>
              {pi.phoneNumber}
            </span>
          )}

          {pi.email && (
            <a className="contact-item link" href={`mailto:${pi.email}`}>
              <span className="contact-icon">
                <EmailIcon />
              </span>
              {pi.email}
            </a>
          )}

          {pi.linkedIn && (
            <a
              className="contact-item link"
              href={
                pi.linkedIn.startsWith("http")
                  ? pi.linkedIn
                  : `https://${pi.linkedIn}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-icon">
                <LinkedInIcon />
              </span>
              {pi.linkedIn.replace(
                /https?:\/\/(www\.)?linkedin\.com\/in\//i,
                "",
              )}
            </a>
          )}

          {(pi.gitHub || pi.website) && (
            <a
              className="contact-item link"
              href={
                (pi.gitHub || pi.website).startsWith("http")
                  ? pi.gitHub || pi.website
                  : `https://${pi.gitHub || pi.website}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-icon">
                <GithubIcon />
              </span>
              {(pi.gitHub || pi.website).replace(
                /https?:\/\/(www\.)?github\.com\//i,
                "",
              )}
            </a>
          )}
        </div>
      </div>

      {/* ════ OBJECTIVE / SUMMARY ════ */}
      {summary && (
        <section className="resume-section">
          <h2 className="section-heading">Professional Summary</h2>
          <p className="objective-text">
            <BoldText text={summary} />
          </p>
        </section>
      )}

      {/* ════ EDUCATION ════ */}
      {education.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Education</h2>
          {education.map((edu, i) => (
            <div className="edu-entry" key={i}>
              <div className="edu-row-1">
                <span className="edu-institution">
                  {edu.university || edu.institution || edu.school}
                </span>
                <span className="edu-date">
                  {edu.startDate && edu.graduationYear
                    ? `${edu.startDate} – ${edu.graduationYear}`
                    : edu.startDate
                      ? `${edu.startDate} – ${edu.endDate || "Present"}`
                      : edu.graduationYear}
                </span>
              </div>
              <div className="edu-row-2">
                <span className="edu-degree">
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
                </span>
                {edu.location && (
                  <span className="edu-location">{edu.location}</span>
                )}
              </div>
              {edu.coursework && (
                <>
                  <div className="edu-coursework-heading">
                    Relevant Coursework
                  </div>
                  <ul className="edu-coursework-grid">
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

      {/* ════ TECHNICAL SKILLS ════ */}
      {skillCategories.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Technical Skills</h2>
          <div className="skills-block">
            {skillCategories.map((s, i) => (
              <p className="skill-row" key={i}>
                <span className="skill-row-label">{s.label}: </span>
                <span className="skill-row-values">
                  {Array.isArray(s.values) ? s.values.join(", ") : s.values}
                </span>
              </p>
            ))}
          </div>
        </section>
      )}

      {/* ════ EXPERIENCE ════ */}
      {experience.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Experience</h2>
          {experience.map((exp, i) => (
            <div className="resume-entry" key={i}>
              <div className="entry-row-1">
                <span className="entry-role">
                  {exp.jobTitle}
                  {exp.organization ? `, ${exp.organization}` : ""}
                </span>
                <span className="entry-date">
                  {exp.startDate} – {exp.endDate || "Present"}
                </span>
              </div>
              <div className="entry-row-2">
                <span className="entry-company">{exp.company}</span>
                {exp.location && (
                  <span className="entry-loc">{exp.location}</span>
                )}
              </div>
              {exp.responsibilities?.length > 0 && (
                <ul className="entry-list">
                  {exp.responsibilities.map((r, j) => (
                    <li key={j}>
                      <BoldText text={r} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ════ PROJECTS ════ */}
      {projects.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Projects</h2>
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
              <div className="project-entry" key={i}>
                <div className="project-header">
                  <div className="project-title-group">
                    <span className="project-name">{p.title}</span>
                    {(p.liveLink || p.githubLink) && (
                      <span className="project-icons">
                        {p.liveLink && (
                          <a
                            href={p.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            title="Live demo"
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
                        <span className="project-pipe"> | </span>
                        <span className="project-tech-inline">
                          {techList.join(", ")}
                        </span>
                      </>
                    )}
                  </div>
                  {displayDate && (
                    <span className="project-date">{displayDate}</span>
                  )}
                </div>
                {p.responsibilities?.length > 0 ? (
                  <ul className="project-list">
                    {p.responsibilities.map((r, j) => (
                      <li key={j}>
                        <BoldText text={r} />
                      </li>
                    ))}
                  </ul>
                ) : p.description ? (
                  <ul className="project-list">
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

      {/* ════ ACHIEVEMENTS ════ */}
      {(extraCurricular?.length > 0 ||
        achievements?.length > 0 ||
        leadership?.length > 0) && (
        <section className="resume-section">
          <h2 className="section-heading">Achievements</h2>

          {extraCurricular?.map((item, i) => {
            if (typeof item === "string") {
              return (
                <ul className="entry-list" key={i} style={{ marginBottom: 4 }}>
                  <li>
                    <BoldText text={item} />
                  </li>
                </ul>
              );
            }
            return (
              <div className="achievement-entry" key={i}>
                <div className="achievement-row-1">
                  <span className="achievement-org">
                    {item.organization || item.club || item.title}
                    {item.role ? `, ${item.role}` : ""}
                  </span>
                  <span className="achievement-date">
                    {item.startDate} – {item.endDate || "Present"}
                  </span>
                </div>
                {(item.subRole || item.location) && (
                  <div className="achievement-row-2">
                    <span className="achievement-role">
                      {item.subRole || ""}
                    </span>
                    {item.location && (
                      <span className="achievement-loc">{item.location}</span>
                    )}
                  </div>
                )}
                {item.responsibilities?.length > 0 && (
                  <ul className="entry-list">
                    {item.responsibilities.map((r, j) => (
                      <li key={j}>
                        <BoldText text={r} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {achievements?.length > 0 && (
            <div>
              {achievements.map((a, i) => (
                <div key={i} className="achievement-entry">
                  <div className="achievement-row-1">
                    <span className="achievement-org">
                      {typeof a === "string" ? a : a.title || ""}
                    </span>
                    <span className="achievement-date">
                      {typeof a === "string" ? "" : a.year || ""}
                    </span>
                  </div>
                  {typeof a !== "string" && a.description && (
                    <p className="entry-company">{a.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {leadership?.length > 0 && (
            <ul
              className="entry-list"
              style={{ marginTop: achievements?.length > 0 ? 4 : 0 }}
            >
              {leadership.map((item, i) => (
                <li key={i}>
                  <BoldText
                    text={
                      typeof item === "string"
                        ? item
                        : item.description || item.title
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* ════ CERTIFICATIONS ════ */}
      {certifications?.filter((c) => c.name).length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Certifications</h2>
          {certifications
            .filter((c) => c.name)
            .map((c, i) => (
              <div className="cert-entry" key={i}>
                <div className="cert-row">
                  <span className="cert-name">{c.name}</span>
                  <span className="cert-date">{c.year}</span>
                </div>
                {c.issuingOrganization && (
                  <p className="cert-issuer">{c.issuingOrganization}</p>
                )}
              </div>
            ))}
        </section>
      )}

      {/* ════ LANGUAGES ════ */}
      {languages?.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Languages</h2>
          <p className="languages-text">
            {languages
              .map((l) =>
                typeof l === "string"
                  ? l
                  : `${l.language}${l.proficiency ? ` — ${l.proficiency}` : ""}`,
              )
              .join("  ,  ")}
          </p>
        </section>
      )}

      {/* ════ INTERESTS / HOBBIES ════ */}
      {hobbyList.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Interests &amp; Hobbies</h2>
          <p className="hobbies-text">
            {hobbyList
              .map((h) => (typeof h === "string" ? h : h.name || ""))
              .filter(Boolean)
              .join("  ,  ")}
          </p>
        </section>
      )}
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";
export default ResumePreview;
