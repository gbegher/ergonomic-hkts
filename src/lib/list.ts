import { HKT1, $, DEF, ARGS, _ } from "../core/hkts"

declare module "../types" {
  export type List<A = _> = $<HKT.List, A>

  namespace HKT {
    interface List extends HKT1 {
      [DEF]: this[ARGS][0][]
    }
  }
}

export {}
