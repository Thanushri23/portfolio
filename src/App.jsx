import { useState, useEffect, useRef } from "react";

const ROLES = ["Flutter Developer", "Angular Developer", "Full-Stack Developer", "React Developer"];

const PROJECTS = [
  {
    id: "rushz",
    year: "2024",
    title: "Rushz",
    subtitle: "Venue Booking Platform",
    stack: ["Flutter", "Dart", "Supabase", "PostgreSQL"],
    description: "Cross-platform mobile app for booking movie/gaming cabins and outdoor sports courts. Two complete interfaces — customers book, admins manage.",
    bullets: ["End-to-end booking flow with real-time Supabase sync", "Role-based access: customer + admin interfaces", "Cabin-based indoor & court-based outdoor booking"],
    github: "https://github.com/Thanushri23/Rushz",
    live: null,
    color: "#E63946",
  },
  {
    id: "portal",
    year: "2025",
    title: "Employee Portal",
    subtitle: "Team Task & Leave Manager",
    stack: ["Angular", "Node.js", "Express.js", "MongoDB"],
    description: "Full-stack MEAN application with separate Manager and Employee dashboards for task tracking, leave management, and team oversight.",
    bullets: ["Complete leave lifecycle: submit → review → approve/reject", "Role-based dashboards with real-time status tracking", "Custom REST API with Express.js + MongoDB"],
    github: "https://github.com/Thanushri23/Dashboard",
    live: "https://dashboard-96cafyyxn-thanushris-projects-c26840ac.vercel.app/login",
    color: "#E63946",
  },
];

const SKILLS = [
  { cat: "Mobile", items: ["Flutter", "Dart"] },
  { cat: "Frontend", items: ["Angular", "TypeScript", "HTML/CSS", "Tailwind", "Bootstrap"] },
  { cat: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { cat: "Database", items: ["MongoDB", "Supabase", "Firebase", "PostgreSQL"] },
  { cat: "Languages", items: ["JavaScript", "Python", "SQL"] },
  { cat: "Tools", items: ["Git", "GitHub", "VS Code"] },
];

const NAV = ["about", "projects", "skills", "contact"];

function useTypewriter(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, charIdx + 1));
        if (charIdx + 1 === word.length) { setTimeout(() => setDeleting(true), pause); return; }
        setCharIdx(c => c + 1);
      } else {
        setDisplay(word.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx(i => (i + 1) % words.length); setCharIdx(0); return; }
        setCharIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

function RedLine() {
  return <div style={{ width: "48px", height: "2px", background: "#E63946", margin: "16px 0 24px" }} />;
}

function SectionEye({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
      <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 600, color: "#E63946", letterSpacing: "3px", textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: "1px", background: "#2A2A2A" }} />
    </div>
  );
}

function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#141414", border: `1px solid ${hov ? "#E63946" : "#2A2A2A"}`, borderRadius: "4px", overflow: "hidden", transition: "border-color .2s", cursor: "default" }}>
      <div style={{ height: "3px", background: hov ? "#E63946" : "#2A2A2A", transition: "background .2s" }} />
      <div style={{ padding: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <div>
            <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", color: "#E63946", fontWeight: 600, letterSpacing: "2px" }}>{p.year}</span>
            <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "22px", fontWeight: 700, color: "#F5F5F5", margin: "4px 0 2px" }}>{p.title}</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666", margin: 0 }}>{p.subtitle}</p>
          </div>
        </div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#999", lineHeight: 1.7, margin: "0 0 16px" }}>{p.description}</p>
        <ul style={{ margin: "0 0 20px", padding: "0 0 0 16px" }}>
          {p.bullets.map((b, i) => <li key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666", lineHeight: 1.6, marginBottom: "4px" }}>{b}</li>)}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
          {p.stack.map(s => <span key={s} style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 600, padding: "4px 10px", border: "1px solid #2A2A2A", borderRadius: "2px", color: "#888", letterSpacing: "0.5px" }}>{s}</span>)}
        </div>
        <div style={{ display: "flex", gap: "12px", borderTop: "1px solid #2A2A2A", paddingTop: "20px" }}>
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", fontWeight: 600, color: "#E63946", textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase" }}>
            GitHub →
          </a>
          {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", fontWeight: 600, color: "#666", textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase" }}>
            Live Demo →
          </a>}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const role = useTypewriter(ROLES, 75, 2200);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch (e) {} };
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setNavOpen(false); };

  return (
    <div style={{ background: "#0C0C0C", color: "#F5F5F5", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(12,12,12,0.95)", borderBottom: "1px solid #1A1A1A", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: "56px" }}>
        <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "18px", color: "#F5F5F5", letterSpacing: "-0.5px" }}>
          T<span style={{ color: "#E63946" }}>V</span>
        </span>
        <div style={{ display: "flex", gap: "32px" }}>
          {NAV.map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 500, color: "#666", letterSpacing: "1px", textTransform: "uppercase", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "#E63946"} onMouseLeave={e => e.target.style.color = "#666"}>
              {id}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 48px 64px", position: "relative", overflow: "hidden" }}>
        {/* Background TV monogram */}
        <div style={{ position: "absolute", right: "-40px", top: "50%", transform: "translateY(-50%)", fontFamily: "Space Grotesk, sans-serif", fontSize: "320px", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px #1A1A1A", lineHeight: 1, pointerEvents: "none", userSelect: "none", letterSpacing: "-20px" }}>TV</div>

        <div style={{ maxWidth: "900px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E63946", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", fontWeight: 600, color: "#666", letterSpacing: "2px", textTransform: "uppercase" }}>Available for internship · Hyderabad</span>
          </div>

          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(56px,9vw,96px)", fontWeight: 700, color: "#F5F5F5", lineHeight: 0.95, margin: "0 0 24px", letterSpacing: "-3px" }}>
            Thanushri<br />
            <span style={{ color: "#E63946", WebkitTextStroke: "0px" }}>Vundavalli</span>
          </h1>

          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 500, color: "#888", minHeight: "36px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "4px" }}>
            {role}
            <span style={{ display: "inline-block", width: "2px", height: "1.2em", background: "#E63946", animation: "blink 1s infinite", verticalAlign: "middle" }} />
          </div>

          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#666", lineHeight: 1.8, maxWidth: "520px", margin: "0 0 48px" }}>
            CS undergraduate who builds real things to learn real stacks. Flutter, Angular, MEAN — shipped. React — in progress.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("projects")} style={{ padding: "12px 32px", background: "#E63946", color: "#fff", border: "none", borderRadius: "2px", fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}>
              View Work
            </button>
            <a href="https://www.linkedin.com/in/thanushri-vundavalli/" target="_blank" rel="noopener noreferrer"
              style={{ padding: "12px 32px", background: "transparent", color: "#F5F5F5", border: "1px solid #2A2A2A", borderRadius: "2px", fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
              LinkedIn ↗
            </a>
          </div>
        </div>

        <style>{`
          @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
          @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        `}</style>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "96px 48px", borderTop: "1px solid #1A1A1A" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <SectionEye label="About" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <div>
              <div style={{ width: "120px", height: "120px", borderRadius: "4px", background: "#141414", border: "1px solid #2A2A2A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px" }}>
                <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "36px", fontWeight: 700, color: "#E63946" }}>TV</span>
              </div>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "32px", fontWeight: 700, color: "#F5F5F5", margin: "0 0 8px", letterSpacing: "-1px" }}>Thanushri Vundavalli</h2>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "14px", color: "#E63946", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 24px" }}>Software Developer</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#888", lineHeight: 1.8, margin: "0 0 24px" }}>
                Second-year B.Sc. CS student at NIAT (in collaboration with BITS Pilani), Hyderabad. I've spent the last year and a half building full-stack apps across different technologies — not following tutorials, but shipping actual working products.
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#888", lineHeight: 1.8, margin: "0 0 32px" }}>
                Attended an AI & ML Workshop at IIT Hyderabad (2024). Currently learning React to add to an already broad stack.
              </p>
              <div style={{ display: "flex", gap: "20px" }}>
                <a href="https://github.com/Thanushri23" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", fontWeight: 600, color: "#E63946", textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase" }}>GitHub →</a>
                <a href="mailto:thanushrivundavalli123@gmail.com" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", fontWeight: 600, color: "#666", textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase" }}>Email →</a>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 600, color: "#E63946", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 24px" }}>Education</p>
              <div style={{ marginBottom: "32px" }}>
                {[
                  { school: "NIAT (BITS Pilani)", degree: "B.Sc. Computer Science", period: "2024 – 2028" },
                  { school: "FIITJEE Junior College", degree: "Higher Secondary · 96%", period: "2023 – 2024" },
                  { school: "FIITJEE World School", degree: "Secondary · CGPA 9.7", period: "2020 – 2021" },
                ].map((e, i) => (
                  <div key={i} style={{ borderLeft: "1px solid #2A2A2A", paddingLeft: "20px", marginBottom: "20px", position: "relative" }}>
                    <div style={{ position: "absolute", left: "-4px", top: "6px", width: "7px", height: "7px", borderRadius: "50%", background: "#E63946" }} />
                    <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 600, color: "#F5F5F5", margin: "0 0 2px" }}>{e.school}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666", margin: "0 0 2px" }}>{e.degree}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#444", margin: 0 }}>{e.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: "96px 48px", borderTop: "1px solid #1A1A1A" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <SectionEye label="Projects" />
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, color: "#F5F5F5", margin: "0 0 8px", letterSpacing: "-1px" }}>
              Real projects.<br /><span style={{ color: "#E63946" }}>Real backends.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))", gap: "24px" }}>
            {PROJECTS.map(p => <ProjectCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: "96px 48px", borderTop: "1px solid #1A1A1A" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <SectionEye label="Skills" />
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, color: "#F5F5F5", margin: "0 0 48px", letterSpacing: "-1px" }}>The toolkit.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "32px" }}>
            {SKILLS.map(({ cat, items }) => (
              <div key={cat}>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 600, color: "#E63946", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 16px" }}>{cat}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {items.map(s => (
                    <span key={s} style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#888", borderLeft: "1px solid #2A2A2A", paddingLeft: "12px" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "96px 48px", borderTop: "1px solid #1A1A1A" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <SectionEye label="Contact" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "48px" }}>
            <div>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(36px,6vw,72px)", fontWeight: 700, color: "#F5F5F5", margin: "0 0 8px", letterSpacing: "-2px", lineHeight: 1 }}>
                Let's<br /><span style={{ color: "#E63946" }}>work.</span>
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#666", margin: "16px 0 0", maxWidth: "400px", lineHeight: 1.7 }}>
                Looking for an internship where I can build real things and keep learning fast.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "Email", value: "thanushrivundavalli123@gmail.com", href: "mailto:thanushrivundavalli123@gmail.com" },
                { label: "LinkedIn", value: "linkedin.com/in/thanushri-vundavalli", href: "https://www.linkedin.com/in/thanushri-vundavalli/" },
                { label: "GitHub", value: "github.com/Thanushri23", href: "https://github.com/Thanushri23" },
              ].map(({ label, value, href }) => (
                <div key={label} style={{ borderBottom: "1px solid #1A1A1A", paddingBottom: "16px" }}>
                  <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 600, color: "#E63946", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 4px" }}>{label}</p>
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#888", textDecoration: "none" }}
                    onMouseEnter={e => e.target.style.color = "#F5F5F5"} onMouseLeave={e => e.target.style.color = "#888"}>
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1A1A1A", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "16px", color: "#F5F5F5" }}>T<span style={{ color: "#E63946" }}>V</span></span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#444" }}>© 2026 Thanushri Vundavalli · Hyderabad</span>
      </footer>
    </div>
  );
}