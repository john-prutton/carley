import { createAI } from "ai/rsc"

import { tryContinueConversation } from "./lib/actions"
import { ClientMessage, ServerMessage } from "./lib/types"

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
