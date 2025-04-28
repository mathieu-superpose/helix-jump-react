type TBallState = {
  action: "fall" | "bounce" | "willCollide"
}

export let state: TBallState = {
  action: "fall",
}
