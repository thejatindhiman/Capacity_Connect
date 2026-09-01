"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, GraduationCap, LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="page-container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{
              width: 36, height: 36,
              background: "var(--gradient-primary)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
            }}>
              <GraduationCap size={20} color="white" />
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Capacity
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Connect
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="desktop-nav">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="btn-ghost"
                style={{ color: pathname.startsWith(href) ? "var(--accent-blue-light)" : "var(--text-secondary)" }}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link href="/auth/login" className="btn-secondary" style={{ padding: "8px 16px", fontSize: 13 }}>
              <LogIn size={14} /> Sign In
            </Link>
            <Link href="/auth/register" className="btn-primary" style={{ padding: "8px 16px", fontSize: 13 }}>
              Get Started
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="btn-ghost"
            style={{ display: "none" }}
            onClick={() => setMenuOpen(!menuOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          borderTop: "1px solid var(--border-default)",
          padding: "12px 24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}>
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="btn-ghost"
              style={{ justifyContent: "flex-start", padding: "10px 12px" }}
              onClick={() => setMenuOpen(false)}
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <Link href="/auth/login" className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Sign In</Link>
            <Link href="/auth/register" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
