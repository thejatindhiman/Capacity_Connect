import { Suspense } from "react";
import { AuthPageContainer } from "../../../components/auth/AuthPageContainer";

export const metadata = {
  title: "Create Account | Capacity Connect",
  description: "Register for Capacity Connect portal as Trainee, Trainer, or Administrator.",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
        Loading Auth Portal...
      </div>
    }>
      <AuthPageContainer initialMode="register" />
    </Suspense>
  );
}
