import { GameOptions as G } from "../stores/game"

export function newPlatformData(i: number) {
  const color = G.platformColors[i % G.platformColors.length]
  const thetaLength =
    G.minThetaLength + Math.random() * (G.maxThetaLength - G.minThetaLength)

  const angle = Math.random() * Math.PI * 2

  const posY = G.platformGap * -i

  return {
    color,
    thetaLength,
    angle,
    posY,
  }
}
