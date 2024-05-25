import { Joke } from "./schema"

export function JokeComponent({ joke }: { joke: Joke }) {
  return (
    <div>
      <div>{joke.setup}</div>
      <div className="font-bold">{joke.punchline}</div>
    </div>
  )
}
