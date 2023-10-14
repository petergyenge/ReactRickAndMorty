import axios, { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

const client = axios.create({
  baseURL: "https://rickandmortyapi.com",
});

const getCharacter = async (page?: number): Promise<AxiosResponse | null> => {
  try {
    const response = await client.get("/api/character", { params: {page: page} });
    return response;
  } catch (error) {
    return (error as AxiosError).response || null;
  }
};

const CharacterApiSchema = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev:  z.string().nullable()
  }),
  results: z.object({
      id: z.number(),
      name: z.string(),
      status: z.string(),
      species: z.string(),
      type: z.string(),
      gender: z.string(),
      origin: z.object({
        name: z.string(),
        url: z.string(),
      }),
      location: z.object({
        name: z.string(),
        url: z.string(),
      }),
      image: z.string(),
      episode: z.string().array(),
      url: z.string(),
      created: z.string()
    })
    .array(),
});

export type Character = z.infer<typeof CharacterApiSchema>;

const validateCharacter = (response: AxiosResponse): Character | null => {
  const result = CharacterApiSchema.safeParse(response.data);
  if (!result.success) {
    console.log(result.error.issues);
    return null;
  }
  return result.data;
};

type Response<Type> =
  | {
      data: Type;
      status: number;
      success: true;
    }
  | {
      status: number;
      success: false;
    };

export const loadCharacters = async (title?: number): Promise<Response<Character>> => {
  const response = await getCharacter(title);
  if (!response) return { success: false, status: 0 };
  if (response.status !== 200)
    return { success: false, status: response.status };
  const data = validateCharacter(response);
  if (!data) return { success: false, status: response.status };
  return { success: true, status: response.status, data };
};
