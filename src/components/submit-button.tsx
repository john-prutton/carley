"use client"

import { useFormStatus } from "react-dom"

import { Button, ButtonProps } from "@/components/ui/button"

import { Spinner } from "./spinner"

export function SubmitButton({
  content,
  pendingContent,
  ...props
}: {
  content: React.ReactNode
  pendingContent?: React.ReactNode
} & ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button {...props} disabled={pending}>
      {pending && pendingContent !== undefined ? pendingContent : content}
      {pending ? <Spinner className="ml-2" /> : null}
    </Button>
  )
}
