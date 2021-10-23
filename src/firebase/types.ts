export type BookData = {
  name: string
  authors: string[]
  year: number
  rating?: number
  ISBN?: string
}

export type Book = {
  id: string
} & BookData
