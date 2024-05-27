import { Navbar } from "@/components/layout/navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen max-h-svh flex-col">
      <Navbar />
      {children}
    </div>
  )
}
