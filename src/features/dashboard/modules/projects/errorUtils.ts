export function parseApiErrors(err: any) {
  const data = err?.response?.data
  const fieldErrors: Record<string, string[]> = data?.errors ?? {}
  const message: string = data?.message ?? err?.message ?? 'Unknown error'
  return { fieldErrors, message }
}
