import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Shield, Award, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const stats = [
    { label: "Active Trainees", value: "2,400+" },
    { label: "Verified Courses", value: "48" },
    { label: "Certificates Issued", value: "1,200+" },
    { label: "Skill Completion Rate", value: "94%" },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Capacity Building Modules",
      desc: "Structured organizational learning paths tailored for earth sciences, cybersecurity, cloud DevOps, and digital infrastructure.",
      color: "#3b82f6",
    },
    {
      icon: Shield,
      title: "Role-Based Governance",
      desc: "Distinct access tiers for Trainees, Trainers, and Administrators with full security clearance.",
      color: "#8b5cf6",
    },
    {
      icon: Award,
      title: "Competency Matrix & Badges",
      desc: "Automated tracking of trainee progress, assessment scores, and verified certifications.",
      color: "#10b981",
    },
  ];

  const categories = [
    { name: "Digital Infrastructure", count: 12, icon: "🌐" },
    { name: "DevOps & Cloud", count: 14, icon: "☁️" },
    { name: "Cybersecurity", count: 10, icon: "🛡️" },
    { name: "Earth Sciences & GIS", count: 8, icon: "🌍" },
    { name: "AI & Data Analytics", count: 4, icon: "⚡" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero Section */}
      <section className="section" style={{ position: "relative", overflow: "hidden", paddingTop: 80 }}>
        <div className="page-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", marginBottom: 20 }}>
            <span className="badge badge-purple" style={{ padding: "6px 16px", gap: 6, fontSize: 12 }}>
              <Sparkles size={14} /> Ministry of Earth Sciences • SIH 2026
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 900,
            margin: "0 auto 24px",
          }}>
            Empowering Teams with <span className="glow-text">Capacity Connect</span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--text-secondary)",
            maxWidth: 680,
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}>
            Centralized enterprise learning platform for organizational capacity building, skill matrix tracking, and verified certifications.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
            <Link href="/auth/register" className="btn-primary" style={{ padding: "14px 32px", fontSize: 16 }}>
              Get Started <ArrowRight size={18} />
            </Link>
            <Link href="/auth/login" className="btn-secondary" style={{ padding: "14px 32px", fontSize: 16 }}>
              Sign In to Portal
            </Link>
          </div>

          {/* Stats Bar */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
            maxWidth: 1000,
            margin: "0 auto",
          }}>
            {stats.map(({ label, value }) => (
              <div key={label} className="stat-card">
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: "rgba(0,0,0,0.2)" }}>
        <div className="page-container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, marginBottom: 16 }}>
              Everything You Need to <span className="glow-text">Learn & Grow</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              A comprehensive platform built for modern organizational learning and development.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="glass-card" style={{ padding: 28 }}>
                <div style={{
                  width: 48, height: 48,
                  background: `${color}20`,
                  border: `1px solid ${color}30`,
                  borderRadius: "var(--radius-md)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 18,
                }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border-default)", padding: "40px 0", marginTop: "auto" }}>
        <div className="page-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>Capacity Connect</span>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>· SIH 2026</span>
          </div>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
            © 2026 Capacity Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
