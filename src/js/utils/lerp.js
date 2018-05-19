/**
 * a: starting value
 * b: destination value
 * n: normal value (between 0 and 1) to control the Linear Interpolation
 */
export function lerp(a, b, n){
    return (1 - n) * a + n * b;
}