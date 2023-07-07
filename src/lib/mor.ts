import { HKT2, $, DEF, ARGS, _ } from "../core/hkts"

declare module "../types" {
  export type Mor<S = _, T = _> = $<HKT.Mor, S, T>

  export namespace HKT {
    export interface Mor extends HKT2 {
      [DEF]: (s: this[ARGS][0]) => this[ARGS][1]
    }
  }
}

export {}
