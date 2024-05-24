import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="grid h-svh place-content-center">
      <main className="group flex w-fit flex-col items-center gap-y-8">
        <div className="w-fit">
          <span className=" text-6xl font-black">Carley</span>
          <span className="-scale-x-100 text-7xl">🍍</span>
        </div>
        <Button
          asChild
          className="w-[150%] animate-pulse py-6 text-xl group-hover:animate-none"
        >
          <Link href="/home">Get Started</Link>
        </Button>
      </main>
    </div>
  )
}
