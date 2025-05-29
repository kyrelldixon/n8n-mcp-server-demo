import { expect, test } from "bun:test";
import { add } from "./add";

test("1 + 2", () => {
  expect(add(1, 2)).toBe(3);
});
