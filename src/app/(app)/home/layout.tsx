import { Metadata, Viewport } from "next"

import { createAI } from "ai/rsc"

import { ClientMessage, ServerMessage } from "@/lib/core/domain/entities/Chat"

import { tryContinueConversation } from "./lib/actions"

const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    tryContinueConversation
  },
  initialAIState: [],
  initialUIState: []
})

export const viewport: Viewport = {
  themeColor: "white"
}
export const metadata: Metadata = { title: "Home" }

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AI>{children}</AI>
}
