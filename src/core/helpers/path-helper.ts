export class PathHelper {
    static combine(paths: string[]): string {
        let path = '';
        for (const p of paths) {
            if (p === undefined) {
                throw new Error('Invalid path.');
            }
            path += '/' + p;
        }
        path = '/' + path;
        while (path.includes('//')) {
            path = path.replace('//', '/');
        }
        return path;
    }

    static getObjectNestedProperty(object: any, propertyPath: string): any {
        if (object && propertyPath) {
            const props = propertyPath.split('.');
            props.forEach(propertyName => {
                if (!object || !propertyName) {
                    return undefined;
                }
                object = object[propertyName];
            });
            return object;
        }
        return undefined;
    }
}
