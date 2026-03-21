/** Deterministic [0,1) from index — stable layout, no Math.random in React render. */
function hash01(i: number, salt: number): number {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Fibonacci-ish sphere distribution for sparse point shells. */
export function createShellPositions(
  count: number,
  rMin: number,
  rSpread: number,
  ySquish: number,
  salt = 0,
): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = hash01(i, salt);
    const v = hash01(i, salt + 1);
    const phi = Math.acos(2 * u - 1);
    const theta = v * Math.PI * 2;
    const r = rMin + hash01(i, salt + 2) * rSpread;
    const sp = Math.sin(phi);
    arr[i * 3] = r * sp * Math.cos(theta);
    arr[i * 3 + 1] = r * sp * Math.sin(theta) * ySquish;
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}
