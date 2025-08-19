import { compare, hash } from "bcryptjs";

export function doHash(value: string, saltValue: string|number) {
    const result = hash(value, saltValue);
    return result
}

export function doHashValidation(value: string, hashedValue: string) {
    const result = compare(value, hashedValue);
    return result
}