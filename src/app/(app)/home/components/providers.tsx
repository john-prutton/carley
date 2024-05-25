import { createAI } from "ai/rsc"

import { continueConversation } from "../actions"
import { ClientMessage, ServerMessage } from "../types"

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation
  },
  initialAIState: [],
  initialUIState: []
})
