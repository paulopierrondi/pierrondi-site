export const PLAN_ACTION_MAX_IDS = 500
export const PLAN_ACTION_CLIENT_CHUNK_SIZE = 50

export function chunkPlanActionIds(ids: string[]) {
  const chunks: string[][] = []
  for (let index = 0; index < ids.length; index += PLAN_ACTION_CLIENT_CHUNK_SIZE) {
    chunks.push(ids.slice(index, index + PLAN_ACTION_CLIENT_CHUNK_SIZE))
  }
  return chunks
}
