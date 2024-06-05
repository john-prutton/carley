import { createAI } from "ai/rsc"

import { tryContinueConversation } from "./actions"
import { ClientMessage, ServerMessage } from "./types"

const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    tryContinueConversation
  },
  initialAIState: [],
  initialUIState: []
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AI>{children}</AI>
}
