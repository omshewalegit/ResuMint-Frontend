import { useState, useRef, useEffect } from "react";
import { Sparkles, Loader2, Lightbulb, ChevronRight } from "lucide-react";
import "./InputForm.css";

const SAMPLES = [
  {
    label: "Full Stack Dev",
    emoji: "",
    text: `My name is Rahul Mehta. I am a Full Stack Developer with 3 years of experience. My email is rahul.mehta@gmail.com, phone is +91-9876543210, LinkedIn is linkedin.com/in/rahulmehta, GitHub is github.com/rahulmehta, and I live in Bangalore, Karnataka. I have worked at TechCorp as a Junior Developer from Jan 2021 to Dec 2022 and at Startup XYZ as a Full Stack Engineer from Jan 2023 to Present, where I built and maintained customer-facing web applications using React, Node.js, MongoDB, and REST APIs, reducing page load time by 40%. I hold a B.Tech in Computer Science from VIT University, graduating in 2021 with CGPA 8.5. My skills include JavaScript, Python, HTML, CSS as languages; React, Node.js, Express.js as frameworks; MongoDB, MySQL as databases; AWS as cloud; Git, Docker as DevOps tools. Projects: I built an E-Commerce Platform using React, Node.js, MongoDB, Stripe in March 2023 with product listing, cart, and payment integration. GitHub: github.com/rahulmehta/ecommerce. I also built a Task Management App using React, Node.js, Socket.io in August 2022. GitHub: github.com/rahulmehta/taskapp. Achievements: Won Best Project Award at VIT Hackathon 2021. Selected as Technical Lead for college coding club 2020. Certifications: MongoDB Developer Certification by MongoDB University in 2022. AWS Cloud Practitioner by Amazon Web Services in 2023. Languages: English - Fluent, Hindi - Native. Interests: Open Source Contributing, Competitive Programming, Football, Gaming.`,
  },
  {
    label: "Data Scientist",
    emoji: "",
    text: `My name is Priya Nair. I am a Data Scientist with 4 years of experience. My email is priya.nair@gmail.com, phone is +91-9123456789, LinkedIn is linkedin.com/in/priyanair, GitHub is github.com/priyanair, and I live in Hyderabad, Telangana. I have worked at DataCorp as an ML Engineer from Feb 2021 to Jan 2023 and at Analytics India as a Senior Data Scientist from Feb 2023 to Present, where I built predictive models that improved business revenue by 20% and reduced customer churn by 15%. I hold an M.Tech in Data Science from IIT Delhi, graduating in 2020 with CGPA 9.1. My skills include Python, R, SQL as languages; TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy as frameworks; PostgreSQL, MongoDB as databases; AWS, GCP as cloud; Git, Docker, Airflow as DevOps tools. Projects: I built a Customer Churn Prediction Model using Python, Scikit-learn, XGBoost, Flask in June 2023, achieving 92% accuracy. GitHub: github.com/priyanair/churn-model. I also built an NLP Sentiment Analyzer using Python, BERT, FastAPI in January 2022. GitHub: github.com/priyanair/sentiment. Achievements: Published research paper on NLP at ICML 2023. Won Kaggle Competition Top 5% in 2022. Certifications: TensorFlow Developer Certificate by Google in 2022. AWS Machine Learning Specialty in 2023. Languages: English - Fluent, Hindi - Fluent, Malayalam - Native. Interests: Kaggle Competitions, Research, Chess, Badminton, Reading.`,
  },
  {
    label: "UI/UX Designer",
    emoji: "",
    text: `My name is Aisha Khan. I am a UI/UX Designer with 5 years of experience. My email is aisha.khan@gmail.com, phone is +91-9988776655, LinkedIn is linkedin.com/in/aishakhan, GitHub is github.com/aishakhan, and I live in Mumbai, Maharashtra. I have worked at DesignStudio as a Product Designer from March 2019 to Feb 2022 and at CreativeAgency as a UX Lead from March 2022 to Present, designing intuitive interfaces for mobile and web products used by over 500K users, increasing user engagement by 35%. I hold a degree in Visual Communication from NID Ahmedabad, graduating in 2019 with distinction. My skills include Figma, Adobe XD, Sketch as design tools; HTML, CSS, JavaScript as languages; Maze, Hotjar, UserTesting as research tools; Zeplin, InVision as prototyping tools. Projects: I redesigned the Swiggy Checkout Flow in Figma in April 2023, reducing drop-off rate by 28%. I also designed a Healthcare App UI/UX using Figma, Adobe XD in September 2022 for 50K+ users. Achievements: Won Red Dot Design Award 2023. Featured in Behance Top 10 India Designers 2022. Certifications: Google UX Design Certificate by Google in 2021. Interaction Design Foundation Certificate in 2022. Languages: English - Fluent, Hindi - Native, Urdu - Native. Interests: Design Systems, Accessibility, Sketching, Travel, Photography.`,
  },
  {
    label: "DevOps Engineer",
    emoji: "",
    text: `My name is Vikram Singh. I am a DevOps Engineer with 3 years of experience. My email is vikram.singh@gmail.com, phone is +91-9845612378, LinkedIn is linkedin.com/in/vikramsingh, GitHub is github.com/vikramsingh, and I live in Pune, Maharashtra. I have worked at CloudBase as a DevOps Engineer from June 2021 to May 2023 and at ByteOps as a Site Reliability Engineer from June 2023 to Present, automating infrastructure and reducing deployment times by 60% while achieving 99.9% uptime. I hold a B.E. in Information Technology from BITS Pilani, graduating in 2021 with CGPA 8.2. My skills include Python, Bash, Go as languages; Ansible, Terraform, Helm as frameworks; PostgreSQL, Redis as databases; AWS, Azure, GCP as cloud; Docker, Kubernetes, Jenkins, GitHub Actions, Prometheus, Grafana as DevOps tools. Projects: I built a Kubernetes Auto-Scaling Infrastructure using Kubernetes, Terraform, AWS, Prometheus in July 2023, handling 10x traffic spikes. GitHub: github.com/vikramsingh/k8s-infra. I also built a CI/CD Pipeline Automation using Jenkins, Docker, GitHub Actions in December 2022. GitHub: github.com/vikramsingh/cicd. Achievements: Reduced infrastructure costs by 45% at ByteOps. Speaker at DevOpsDays Pune 2023. Certifications: AWS Solutions Architect by Amazon Web Services in 2022. Certified Kubernetes Administrator by CNCF in 2023. Languages: English - Fluent, Hindi - Native, Punjabi - Native. Interests: Open Source, Cloud Architecture, Cycling, Cricket, Gaming.`,
  },
  {
    label: "Product Manager",
    emoji: "",
    text: `My name is Sneha Joshi. I am a Product Manager with 6 years of experience. My email is sneha.joshi@gmail.com, phone is +91-9765432109, LinkedIn is linkedin.com/in/snehajoshi, GitHub is github.com/snehajoshi, and I live in Bangalore, Karnataka. I have worked at GrowthApp as an Associate PM from July 2018 to June 2021 and at ProductCo as a Senior PM from July 2021 to Present, shipping 10+ major features that increased user retention by 35% and reduced churn by 18%. I hold an MBA from IIM Ahmedabad, graduating in 2018 with distinction. My skills include Jira, Notion, Confluence as tools; SQL, Python as languages; Mixpanel, Amplitude, Google Analytics as analytics tools; Figma as design tools. Projects: I launched a B2B SaaS Onboarding Revamp using Figma, Mixpanel, Jira in March 2023, reducing time-to-value by 50%. I also led a Mobile App Redesign using Figma, Amplitude in October 2022, increasing DAU by 40%. Achievements: Product of the Year Award at ProductCo 2023. Speaker at ProductCon Bangalore 2022. Certifications: Product Management Certificate by Product School in 2019. Google Analytics Certification in 2020. Languages: English - Fluent, Hindi - Native, Gujarati - Native. Interests: Product Strategy, UX Research, Yoga, Travel, Podcasting.`,
  },
  {
    label: "Cyber Security",
    emoji: "",
    text: `My name is Aryan Kapoor. I am a Cybersecurity Engineer with 4 years of experience. My email is aryan.kapoor@gmail.com, phone is +91-9654321087, LinkedIn is linkedin.com/in/aryankapoor, GitHub is github.com/aryankapoor, and I live in Delhi, India. I have worked at SecureNet as a Security Analyst from August 2020 to July 2022 and at CyberShield as a Penetration Tester from August 2022 to Present, identifying and remediating critical vulnerabilities for Fortune 500 clients, preventing estimated $2M in potential breaches. I hold a B.Tech in Computer Science from NIT Trichy, graduating in 2020 with CGPA 8.8. My skills include Python, Bash, C as languages; Metasploit, Burp Suite, Nmap as frameworks; MySQL, MongoDB as databases; AWS as cloud; Wireshark, Splunk, Nessus, OWASP ZAP as DevOps tools. Projects: I built a Network Vulnerability Scanner using Python, Nmap, Metasploit in May 2023, detecting 95% of known CVEs. GitHub: github.com/aryankapoor/vuln-scanner. I also built a SIEM Dashboard using Splunk, Python, ELK Stack in November 2022. GitHub: github.com/aryankapoor/siem. Achievements: Won National Cybersecurity Hackathon 2022 organized by CERT-In. Reported critical CVE to Google earning Bug Bounty in 2023. Certifications: CEH by EC-Council in 2021. CISSP by ISC2 in 2023. Languages: English - Fluent, Hindi - Native. Interests: Bug Bounty Hunting, CTF Competitions, Ethical Hacking, Chess, Reading.`,
  },
];

const TIPS = [
  "Mention your years of experience and domain",
  "List companies you've worked at and your roles",
  "Include your technical skills and tools",
  "Add your educational background",
];

export default function InputForm({ onGenerate, isLoading }) {
  const [description, setDescription] = useState("");
  const [activeSample, setActiveSample] = useState(null);
  const formRef = useRef(null);
  const charCount = description.length;
  const maxChars = 2000;

  // Mouse spotlight effect on card (from LP feature cards)
  useEffect(() => {
    const card = formRef.current;
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

  const handleSample = (sample, idx) => {
    setDescription(sample.text);
    setActiveSample(idx);
  };

  const handleSubmit = () => {
    if (!description.trim() || isLoading) return;
    onGenerate(description.trim());
  };

  return (
    <div className="input-form" ref={formRef}>
      {/* Corner glow orb */}
      <div className="if-orb" />

      <div className="form-header">
        <h2 className="form-title">Describe Yourself</h2>
        <p className="form-subtitle">
          Write about your experience, skills, and background. The more detail,
          the better your resume.
        </p>
      </div>

      <div className="samples-label">Try a sample</div>
      <div className="samples-row">
        {SAMPLES.map((s, i) => (
          <button
            key={s.label}
            className={`sample-pill ${activeSample === i ? "active" : ""}`}
            onClick={() => handleSample(s, i)}
            disabled={isLoading}
          >
            <span className="sample-emoji">{s.emoji}</span>
            {s.label}
          </button>
        ))}
      </div>

      <div className="textarea-wrapper">
        <textarea
          className="description-textarea"
          placeholder="Write about yourself or pick a sample above..."
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= maxChars)
              setDescription(e.target.value);
            setActiveSample(null);
          }}
          rows={10}
          disabled={isLoading}
        />
        <div
          className={`char-count ${charCount > maxChars * 0.9 ? "warn" : ""}`}
        >
          {charCount}/{maxChars}
        </div>
      </div>

      <div className="form-tips">
        <p className="tips-label">
          <Lightbulb size={13} strokeWidth={1.8} />
          Tips for best results
        </p>
        <ul className="tips-list">
          {TIPS.map((tip) => (
            <li key={tip}>
              <ChevronRight size={11} strokeWidth={2} className="tip-icon" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`generate-btn ${isLoading ? "loading" : ""}`}
        onClick={handleSubmit}
        disabled={!description.trim() || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="spin" /> Generating Resume...
          </>
        ) : (
          <>
            <Sparkles size={18} /> Generate Resume
          </>
        )}
      </button>
    </div>
  );
}
