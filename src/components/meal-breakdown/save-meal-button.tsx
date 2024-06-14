"use client"

import { useState } from "react"

import { LucideCheck } from "lucide-react"

import { MealBreakdown } from "@/lib/core/domain/entities/MealBreakdown"

import { Spinner } from "../spinner"
import { Button } from "../ui/button"
import { trySaveMeal } from "./actions"

export function SaveMealButton({
  mealBreakdown
}: {
  mealBreakdown: MealBreakdown
}) {
  const [pending, setPending] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSaveMeal = async () => {
    setPending(true)
    const { error } = await trySaveMeal({ mealBreakdown })
    setPending(false)

    if (error) return alert(error)

    setSaved(true)
  }
  return (
    <Button
      onClick={handleSaveMeal}
      disabled={pending || saved}
      variant={saved ? "outline" : "default"}
    >
      {saved ? (
        <>
          Saved
          <LucideCheck className="ml-2" />
        </>
      ) : pending ? (
        <>
          Saving...
          <Spinner className="ml-2" />
        </>
      ) : (
        "Save meal"
      )}
    </Button>
  )
}
