type TBallState = {
  action: "fall" | "bounce" | "collides"
}

export let state: TBallState = {
  action: "fall",
}
