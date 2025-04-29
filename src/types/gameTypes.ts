export type TStatus = "checkins" | "standby" | "running" | "paused" | "gameover"

export interface IGameStore {
  status: TStatus
  setStatus: (status: TStatus) => void
}
