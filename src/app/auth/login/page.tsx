import { AuthPageContainer } from "@/components/auth/AuthPageContainer";

export const metadata = {
  title: "Sign In | Capacity Connect",
  description: "Sign in to Capacity Connect portal as Trainee, Trainer, or Administrator.",
};

export default function LoginPage() {
  return <AuthPageContainer initialMode="login" />;
}
