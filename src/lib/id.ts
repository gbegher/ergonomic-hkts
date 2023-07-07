import type { $, DEF, ARGS, _, HKT1 } from "../core/hkts"

declare module "../types" {
  export type Id<X = _> = $<HKT.Id, X>

  export namespace HKT {
    interface Id extends HKT1 {
      [DEF]: this[ARGS][0]
    }
  }
}

export {}
