import Link from "next/link"

import { SplashLogo } from "@/components/layout/splash-logo"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="grid h-svh place-content-center">
      <main className="group flex w-fit flex-col items-center gap-y-8">
        <SplashLogo />
        <Button
          asChild
          className="w-[150%] max-w-[90svw] animate-pulse py-6 text-xl group-hover:animate-none"
        >
          <Link href="/home">Get Started</Link>
        </Button>
      </main>
    </div>
  )
}
