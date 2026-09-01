import { Suspense } from "react";
import { AuthPageContainer } from "../../../components/auth/AuthPageContainer";

export const metadata = {
  title: "Sign In | Capacity Connect",
  description: "Sign in to Capacity Connect portal as Trainee, Trainer, or Administrator.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
        Loading Auth Portal...
      </div>
    }>
      <AuthPageContainer initialMode="login" />
    </Suspense>
  );
}
