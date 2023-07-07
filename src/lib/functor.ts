import type { $, DEF, ARGS, _, HKT1, HKT2, HKT3 } from "../core/hkts"

declare module "../types" {
  export type Functor<
    F extends HKT1 | _ = _,
    C1 extends HKT2 | _ = _,
    C2 extends HKT2 | _ = _
  > = $<HKT.Functor, F, C1, C2>

  export namespace HKT {
    export type FunctorConstraints = HKT3 & {
      [ARGS]: [HKT1, HKT2, HKT2]
    }

    export interface Functor extends FunctorConstraints {
      [DEF]: <S, T>(
        fn: $<this[ARGS][1], S, T>
      ) => $<this[ARGS][2], $<this[ARGS][0], S>, $<this[ARGS][0], T>>
    }
  }

  type XX = $<HKT.Functor, Id, Mor, Mor>
}

export {}
