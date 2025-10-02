import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-background md:p-10">
      <div className="flex flex-col w-full max-w-sm gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
