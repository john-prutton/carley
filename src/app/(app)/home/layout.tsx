import { createAI } from "ai/rsc"

import { continueConversation } from "./actions"
import { ClientMessage, ServerMessage } from "./types"

const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation
  },
  initialAIState: [],
  initialUIState: []
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AI>{children}</AI>
}
