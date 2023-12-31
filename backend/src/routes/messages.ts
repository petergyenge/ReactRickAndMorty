import express from "express"
import { z } from "zod"
import { load, save } from "../utils/db"

const router = express.Router()

const QuerySchema = z.object({
  since: z.string().datetime({ offset: true }).optional(),
})

const MessageRequestSchema = z.object({
  name: z.string(),
  imageUrl: z.string()
})


const MessageSchema = MessageRequestSchema.extend({
  createdAt: z.string().datetime({ offset: true })
})

router.get("/", async (req, res) => {
  const queryParseResult = QuerySchema.safeParse(req.query)
  if (!queryParseResult.success)
    return res.sendStatus(400)
  const since = queryParseResult.data.since

  const data = await load("messages")
  const messages = MessageSchema.array().parse(data)
  return res.json(since ? messages.filter(m => m.createdAt > since) : messages)
})

router.post("/", async (req, res) => {
  const bodyParseResult = MessageRequestSchema.safeParse(req.body)
  if (!bodyParseResult.success)
    return res.sendStatus(400)
  const message = bodyParseResult.data

  const data = await load("messages")
  const messages = MessageSchema.array().parse(data)
  const newMessage = { ...message, createdAt: new Date().toISOString() }
  await save("messages", [ ...messages, newMessage ])

  return res.json(newMessage)
})

router.delete("/:name", async (req, res) => {
  const name = req.params.name;

  const data = await load("messages")
  const votes = MessageSchema.array().parse(data)
  let filteredUsers = votes.filter((vote) => vote.name !== name);
  await save("messages", filteredUsers)

  res.sendStatus(200);
});

export { router }