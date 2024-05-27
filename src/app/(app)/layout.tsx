import { Navbar } from "@/components/layout/navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-svh flex-col">
      <Navbar />
      {children}
    </div>
  )
}
