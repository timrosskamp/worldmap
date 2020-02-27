/**
 * 
 * @param a | starting value
 * @param b | destination value
 * @param n | normal value (0 <=> 1)
 */
export function lerp(a: number, b: number, n: number): number {
    return (1 - n) * a + n * b;
}