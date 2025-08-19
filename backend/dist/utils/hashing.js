import { compare, hash } from "bcryptjs";
export function doHash(value, saltValue) {
    const result = hash(value, saltValue);
    return result;
}
export function doHashValidation(value, hashedValue) {
    const result = compare(value, hashedValue);
    return result;
}
