export type TContactForm = {
  name: string
  email: string
  subject: string
  message: string
}

export type TEmailResult = {
  success: boolean
  error?: string
}
