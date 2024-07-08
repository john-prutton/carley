import Link from "next/link"

import { SplashLogo } from "@/components/layout/splash-logo"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="group mx-auto flex w-fit flex-col items-center gap-y-8 py-32">
      <SplashLogo />

      <h1 className="text-center text-4xl font-bold">
        <span className="text-primary">Stop guessing</span> your nutrition
      </h1>

      <p className="text-center text-2xl tracking-wider">
        Effortlessly track your nutrition with AI{" "}
        <br className="hidden sm:block" />
        and get personalized insights to reach your goals
      </p>

      <div className="flex w-[150%] max-w-[90svw] flex-col gap-2 md:flex-row">
        <Button
          asChild
          className="w-full animate-pulse py-6 text-xl group-hover:animate-none"
        >
          <Link href="/home">Get Started</Link>
        </Button>

        <Button asChild variant={"link"} className="w-full py-6 text-xl">
          <Link href="https://youtu.be/gj-Z_B9WII4" target="_blank">
            Watch Demo Video
          </Link>
        </Button>
      </div>
    </section>
  )
}
