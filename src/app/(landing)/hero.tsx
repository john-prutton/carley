import Link from "next/link"

import { SplashLogo } from "@/components/layout/splash-logo"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="group mx-auto flex w-fit flex-col items-center gap-y-8 py-32">
      <SplashLogo />

      <h1 className="text-center text-2xl tracking-wider">
        Effortlessly track your nutrition
      </h1>

      <Button
        asChild
        className="w-[150%] max-w-[90svw] animate-pulse py-6 text-xl group-hover:animate-none"
      >
        <Link href="/home">Get Started</Link>
      </Button>
    </section>
  )
}
