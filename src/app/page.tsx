import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="grid h-svh place-content-center">
      <main className="group flex w-fit flex-col items-center gap-y-8">
        <span className="block text-6xl font-black">Carley</span>
        <Button className="w-[200%] animate-pulse py-6 text-xl group-hover:animate-none">
          Get Started <span className="ml-2 -scale-x-150 scale-y-150">🍍</span>
        </Button>
      </main>
    </div>
  )
}
