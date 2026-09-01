"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  GraduationCap, 
  UserCheck, 
  ShieldAlert, 
  Lock, 
  Mail, 
  User, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Sparkles
} from "lucide-react";

export type UserRole = "trainee" | "trainer" | "admin";
export type AuthMode = "login" | "register";

interface AuthPageContainerProps {
  initialMode?: AuthMode;
}

export function AuthPageContainer({ initialMode = "login" }: AuthPageContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>("trainee");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "Digital Infrastructure",
    adminKey: "",
  });

  const roles = [
    {
      id: "trainee" as UserRole,
      title: "Trainee",
      badge: "Learner Portal",
      color: "#3b82f6",
      bg: "rgba(59, 130, 246, 0.12)",
      borderColor: "rgba(59, 130, 246, 0.4)",
      icon: GraduationCap,
      description: "Access learning tracks, track competencies & earn certifications",
    },
    {
      id: "trainer" as UserRole,
      title: "Trainer / Instructor",
      badge: "Course Creator",
      color: "#8b5cf6",
      bg: "rgba(139, 92, 246, 0.12)",
      borderColor: "rgba(139, 92, 246, 0.4)",
      icon: UserCheck,
      description: "Manage capacity courses, grade assessments & monitor trainees",
    },
    {
      id: "admin" as UserRole,
      title: "Administrator",
      badge: "System Gov",
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.12)",
      borderColor: "rgba(245, 158, 11, 0.4)",
      icon: ShieldAlert,
      description: "Manage system roles, analytics & enterprise capacity policies",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(
        mode === "login" 
          ? `Welcome back! Signed in as ${selectedRole.toUpperCase()}.` 
          : `Account created successfully as ${selectedRole.toUpperCase()}!`
      );

      setTimeout(() => {
        if (selectedRole === "admin") {
          router.push("/dashboard?role=admin");
        } else if (selectedRole === "trainer") {
          router.push("/dashboard?role=trainer");
        } else {
          router.push("/courses");
        }
      }, 1200);
    }, 1000);
  };

  const handleGoogleAuth = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      setSuccessMessage(`Google Authentication successful as ${selectedRole.toUpperCase()}!`);
      setTimeout(() => {
        router.push("/courses");
      }, 1200);
    }, 1200);
  };

  const currentRoleObj = roles.find((r) => r.id === selectedRole) || roles[0];

  return (
    <div style={{
      minHeight: "calc(100vh - 64px)",
      display: "flex",
      alignItems: "center",
      justify: "center",
      padding: "2rem 1rem",
      background: "radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, rgba(7, 13, 26, 0) 70%)"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "640px",
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        borderRadius: "24px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(59,130,246,0.15)",
        overflow: "hidden"
      }}>
        
        {/* Top Segmented Mode Switcher */}
        <div style={{
          display: "flex",
          borderBottom: "1px solid var(--border-default)",
          background: "rgba(0,0,0,0.2)"
        }}>
          <button
            onClick={() => { setMode("login"); setSuccessMessage(""); }}
            style={{
              flex: 1,
              padding: "1.1rem",
              background: mode === "login" ? "rgba(255,255,255,0.04)" : "transparent",
              border: "none",
              borderBottom: mode === "login" ? "2px solid var(--accent-blue)" : "2px solid transparent",
              color: mode === "login" ? "var(--text-primary)" : "var(--text-secondary)",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.25s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode("register"); setSuccessMessage(""); }}
            style={{
              flex: 1,
              padding: "1.1rem",
              background: mode === "register" ? "rgba(255,255,255,0.04)" : "transparent",
              border: "none",
              borderBottom: mode === "register" ? "2px solid var(--accent-purple)" : "2px solid transparent",
              color: mode === "register" ? "var(--text-primary)" : "var(--text-secondary)",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.25s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}
          >
            Create Account
          </button>
        </div>

        <div style={{ padding: "2rem" }}>

          {/* Header Title */}
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {mode === "login" ? (
                <>Welcome back to <span className="gradient-text">Capacity Connect</span></>
              ) : (
                <>Join <span className="gradient-text">Capacity Connect</span></>
              )}
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.35rem" }}>
              {mode === "login" 
                ? "Select your portal role below to access your workspace" 
                : "Register your account and start building enterprise capacity"}
            </p>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div style={{
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#34d399",
              padding: "0.85rem 1.25rem",
              borderRadius: "12px",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.9rem",
              fontWeight: 600
            }}>
              <CheckCircle2 size={20} />
              {successMessage}
            </div>
          )}

          {/* Role Selector Cards */}
          <div style={{ marginBottom: "1.75rem" }}>
            <label style={{ 
              fontSize: "0.8rem", 
              fontWeight: 700, 
              color: "var(--text-secondary)", 
              textTransform: "uppercase", 
              letterSpacing: "0.05em",
              display: "block",
              marginBottom: "0.75rem" 
            }}>
              Select Account Role:
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              {roles.map((r) => {
                const IconComp = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    style={{
                      background: isSelected ? r.bg : "rgba(255,255,255,0.02)",
                      border: "1.5px solid " + (isSelected ? r.borderColor : "var(--border-default)"),
                      borderRadius: "14px",
                      padding: "0.85rem 0.6rem",
                      cursor: "pointer",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.4rem",
                      transition: "all 0.25s ease",
                      boxShadow: isSelected ? `0 4px 15px ${r.bg}` : "none"
                    }}
                  >
                    <div style={{
                      padding: "0.4rem",
                      borderRadius: "10px",
                      background: isSelected ? r.color : "rgba(255,255,255,0.05)",
                      color: isSelected ? "#fff" : "var(--text-secondary)"
                    }}>
                      <IconComp size={18} />
                    </div>
                    <span style={{ 
                      fontSize: "0.85rem", 
                      fontWeight: 700, 
                      color: isSelected ? "var(--text-primary)" : "var(--text-secondary)" 
                    }}>
                      {r.title.split(" ")[0]}
                    </span>
                    <span style={{ 
                      fontSize: "0.68rem", 
                      padding: "0.15rem 0.4rem", 
                      borderRadius: "999px",
                      background: isSelected ? "rgba(255,255,255,0.15)" : "transparent",
                      color: isSelected ? r.color : "var(--text-muted)",
                      fontWeight: 600
                    }}>
                      {r.badge}
                    </span>
                  </button>
                );
              })}
            </div>
            <div style={{ 
              marginTop: "0.6rem", 
              padding: "0.5rem 0.75rem", 
              borderRadius: "8px", 
              background: "rgba(255,255,255,0.02)", 
              border: "1px solid var(--border-default)",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <Sparkles size={14} color={currentRoleObj.color} />
              <span>{currentRoleObj.description}</span>
            </div>
          </div>

          {/* Google Sign-In / Sign-Up Button */}
          <div style={{ marginBottom: "1.5rem" }}>
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={googleLoading}
              style={{
                width: "100%",
                padding: "0.85rem",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                transition: "all 0.25s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")}
            >
              {/* Official Google SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              {googleLoading 
                ? "Connecting Google..." 
                : mode === "login" ? "Sign in with Google" : "Sign up with Google"}
            </button>
          </div>

          {/* Divider */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "1rem", 
            marginBottom: "1.5rem",
            color: "var(--text-muted)",
            fontSize: "0.8rem"
          }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border-default)" }} />
            <span>OR CONTINUE WITH EMAIL</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border-default)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            
            {/* Full Name for Signup */}
            {mode === "register" && (
              <div>
                <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>Full Name</label>
                <div style={{ position: "relative" }}>
                  <User size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem 0.8rem 2.75rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border-default)",
                      borderRadius: "12px",
                      color: "var(--text-primary)",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>Official Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={`name@${selectedRole}.capacityconnect.gov`}
                  required
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem 0.8rem 2.75rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "12px",
                    color: "var(--text-primary)",
                    fontSize: "0.95rem"
                  }}
                />
              </div>
            </div>

            {/* Role Specific Field (Department or Admin Key) */}
            {selectedRole === "admin" ? (
              <div>
                <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>Admin Authorization Key</label>
                <div style={{ position: "relative" }}>
                  <Lock size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="password"
                    name="adminKey"
                    value={formData.adminKey}
                    onChange={handleInputChange}
                    placeholder="Enter security key"
                    required={selectedRole === "admin"}
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem 0.8rem 2.75rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border-default)",
                      borderRadius: "12px",
                      color: "var(--text-primary)",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>
              </div>
            ) : mode === "register" ? (
              <div>
                <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>Department / Organization Unit</label>
                <div style={{ position: "relative" }}>
                  <Building size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="e.g. Digital Infrastructure & Security"
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem 0.8rem 2.75rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border-default)",
                      borderRadius: "12px",
                      color: "var(--text-primary)",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>
              </div>
            ) : null}

            {/* Password Input */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Password</label>
                {mode === "login" && (
                  <a href="#" style={{ fontSize: "0.8rem", color: "var(--accent-blue-light)", textDecoration: "none" }}>
                    Forgot password?
                  </a>
                )}
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  required
                  style={{
                    width: "100%",
                    padding: "0.8rem 2.75rem 0.8rem 2.75rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "12px",
                    color: "var(--text-primary)",
                    fontSize: "0.95rem"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer"
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password for Register */}
            {mode === "register" && (
              <div>
                <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••••••"
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem 0.8rem 2.75rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border-default)",
                      borderRadius: "12px",
                      color: "var(--text-primary)",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.9rem",
                marginTop: "0.5rem",
                borderRadius: "14px",
                background: currentRoleObj.color,
                border: "none",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: `0 4px 20px ${currentRoleObj.bg}`,
                transition: "all 0.25s ease"
              }}
            >
              {loading ? (
                "Authenticating..."
              ) : mode === "login" ? (
                <>Sign In as {currentRoleObj.title.split(" ")[0]} <ArrowRight size={18} /></>
              ) : (
                <>Register as {currentRoleObj.title.split(" ")[0]} <ArrowRight size={18} /></>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
