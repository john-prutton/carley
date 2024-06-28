import Link from "next/link"

import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="mt-16 flex items-center justify-center gap-2 bg-gray-100 py-16">
      <div className="flex w-full">
        <Button asChild variant={"ghost"} className="ml-auto w-fit px-0">
          <Link href="https://github.com/john-prutton" target="_blank">
            John Prutton
          </Link>
        </Button>
      </div>
      <span className="text-2xl">🍍</span>
      <span className="w-full">2024</span>
    </footer>
  )
}
