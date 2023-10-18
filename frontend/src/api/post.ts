import axios, { AxiosError, AxiosResponse } from "axios"
import { z } from "zod"

const client = axios.create({
  baseURL: "http://localhost:8080"
})

const _postMessage = async (imageUrl: string, name: string): Promise<AxiosResponse | null> => {
  try {
    const response = await client.post("/api/messages", { "name": name, "imageUrl": imageUrl})
    return response
  } catch (error) {
    return (error as AxiosError).response || null
  }
}

const MessageSchema = z.object({
  name: z.string(),
  imageUrl: z.string()
})

export type Message = z.infer<typeof MessageSchema>

const validateMessage = (response: AxiosResponse): Message | null => {
  const result = MessageSchema.safeParse(response.data)
  if (!result.success) {
    return null
  }
  return result.data
}

type Response<Type> = {
  data: Type
  status: number
  success: true
} | {
  status: number
  success: false
}

export const postMessage = async (name: string, imageUrl: string): Promise<Response<Message>> => {
  const response = await _postMessage(imageUrl, name)
  if (!response)
    return { success: false, status: 0  }
  if (response.status !== 200)
    return { success: false, status: response.status  }
  const data = validateMessage(response)
  if (!data)
    return { success: false, status: response.status  }
  return { success: true, status: response.status, data }
}