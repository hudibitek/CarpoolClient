export class StringHelper {
  static upperFirstLetter(value: string): string {
    if (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }

  static lowerFirstLetter(value: string): string {
    if (value) {
      return value.charAt(0).toLowerCase() + value.slice(1);
    }
    return value;
  }

  static convertToCamelCase(value: string): string {
    return value.split('.').map((val) => StringHelper.lowerFirstLetter(val)).join('.');
  }

  static convertToPascalCase(value: string): string {
    return value.split('.').map((val) => StringHelper.upperFirstLetter(val)).join('.');
  }

  static isString(value: any): boolean {
    return (typeof value === 'string' || value instanceof String);
  }
}
