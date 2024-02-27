import {beforeAll, describe, expect, it} from "vitest";
import {SyncCache} from "../index";
import {faker} from '@faker-js/faker';

describe("Cache", () => {
    let cache: SyncCache

    beforeAll(() => {
        cache = new SyncCache(1_000_000)
    })

    it('should return null for unknown key', () => {
        expect(cache.get(faker.string.alpha())).toBeNull()
    });

    it('should set and get string value', () => {
        const [k, v] = [faker.string.alpha(), faker.string.alpha()]
        cache.set(k, v)
        expect(cache.get(k), v)
    });

    it('should throw error on set int value', () => {
        const [k, v] = [faker.string.alpha(), faker.number.int()]
        expect(() => cache.set(k, v as any)).toThrowError(/Failed to convert JavaScript value `Number \d+ ` into rust type `String`/)
    });

    it('should be able to handle int via stringify', () => {
        const [k, v] = [faker.string.alpha(), faker.number.int()]

        cache.set(k, JSON.stringify(v))
        let _v = cache.get(k)
        _v = _v ? JSON.parse(_v) : undefined
        expect(_v).toEqual(v)
    });

    it('should be able to set multiple items', () => {
        const [k1, v1] = [faker.string.alpha(), faker.string.alpha()]
        const [k2, v2] = [faker.string.alpha(), faker.string.alpha()]

        cache.mset([[k1, v1], [k2, v2]])
        expect(cache.get(k1)).toEqual(v1)
        expect(cache.get(k2)).toEqual(v2)
    });
})