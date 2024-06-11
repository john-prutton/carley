export interface ServerMessage {
  role: "user" | "assistant"
  content: string
}

export interface ClientMessage {
  id: string
  role: "user" | "assistant"
  display: React.ReactNode
}
