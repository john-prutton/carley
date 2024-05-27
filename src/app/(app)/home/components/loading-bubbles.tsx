import { MessageBubble } from "./message-bubble"

export function LoadingBubbles() {
  return (
    <MessageBubble
      message={{
        id: "loading",
        role: "assistant",
        display: (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                style={{ animationDelay: `${i * 0.1}s` }}
                className="inline-block size-2 animate-bounce rounded-full bg-gray-500 [&:nth-child(2)]:mx-2"
              />
            ))}
          </>
        )
      }}
    />
  )
}
