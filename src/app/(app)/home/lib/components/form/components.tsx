"use client"

import { LucideSend } from "lucide-react"
import { useFormStatus } from "react-dom"

import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"

export function Fieldset({
  children,
  className
}: {
  children: React.ReactNode[]
  className?: string
}) {
  const { pending } = useFormStatus()
  return (
    <fieldset className={className} disabled={pending}>
      {children}
    </fieldset>
  )
}

export function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit">{pending ? <Spinner /> : <LucideSend />}</Button>
}
