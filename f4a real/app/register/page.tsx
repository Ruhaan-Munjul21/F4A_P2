import { MinimalHeader } from "@/components/minimal-header"
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#252525]">
      <MinimalHeader />
      <main>
        <RegisterForm />
      </main>
    </div>
  )
}
