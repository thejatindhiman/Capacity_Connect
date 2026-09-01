import { AuthPageContainer } from "@/components/auth/AuthPageContainer";

export const metadata = {
  title: "Create Account | Capacity Connect",
  description: "Register for Capacity Connect portal as Trainee, Trainer, or Administrator.",
};

export default function RegisterPage() {
  return <AuthPageContainer initialMode="register" />;
}
