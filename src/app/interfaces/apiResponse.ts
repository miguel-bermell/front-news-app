export interface ApiResponse<T> {
  success: boolean
  data: T | null
  message: string
  status: number
}
