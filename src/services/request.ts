export type Options = {
  withCredentials?: boolean;
  headers?: {
    Authorization: string;
  };
}

export async function getCORS(url: string, options: Options = {}): Promise<any> {
  try {
    const response = await fetch(url, options);
  const answer = await response.json();
  if (response.ok) return answer;
  throw answer.message || answer.error || answer.errors || answer;
  } catch (e) {
    throw e;
  }
}
