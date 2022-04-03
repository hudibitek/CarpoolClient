export class MathHelper {
  /**
    * Returns a random number between two values
    *
    * @remarks
    * The `max` is exclusive and the `min` is inclusive
    *
    * @param min - The first input number
    * @param max - The second input number
    * @returns Random number between `min` and `max`
    *
    */
  static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
