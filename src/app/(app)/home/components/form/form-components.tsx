"use client"

import Image from "next/image"
import { useRef } from "react"

import { LucidePaperclip, LucideSend, LucideXCircle } from "lucide-react"
import { useFormStatus } from "react-dom"

import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function FormComponents({
  setImgBase64Url,
  imgBase64Url
}: {
  setImgBase64Url: (url: string | null) => void
  imgBase64Url: string | null
}) {
  const { pending } = useFormStatus()
  const imgSelectorRef = useRef<HTMLInputElement>(null)

  const handleImageOnChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return setImgBase64Url(null)

    const url = Buffer.from(await file.arrayBuffer()).toString("base64")
    setImgBase64Url(`data:image/png;base64,${url}`)
  }

  return (
    <div className="relative">
      {imgBase64Url && (
        <div className="absolute w-fit -translate-y-full drop-shadow-xl">
          <Image
            src={imgBase64Url}
            alt="preview of user image"
            width={128}
            height={128}
            className="mb-2 rounded"
          />

          <Button
            variant="ghost"
            onClick={() => setImgBase64Url(null)}
            className="group absolute right-0 top-0 "
            size="icon"
          >
            <LucideXCircle className="text-background group-hover:text-foreground" />
          </Button>
        </div>
      )}

      <div className="flex flex-row items-end gap-2">
        <>
          <Button
            variant="ghost"
            type="button"
            className="border"
            disabled={pending}
            onClick={() => imgSelectorRef.current?.click()}
          >
            <LucidePaperclip />
          </Button>

          <input
            name="fileInput"
            type="file"
            accept="image/*"
            hidden
            ref={imgSelectorRef}
            disabled={pending}
            onChange={handleImageOnChange}
            onReset={handleImageOnChange}
          />
        </>

        <Textarea
          name="textInput"
          rows={1}
          className="max-h-32 min-h-0 resize-none bg-white"
          disabled={pending}
        />

        <Button type="submit" disabled={pending}>
          {pending ? <Spinner /> : <LucideSend />}
        </Button>
      </div>
    </div>
  )
}
