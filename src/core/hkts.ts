// ----------------------------------------------------------------------------
// Interface
// ----------------------------------------------------------------------------

export type HKT0 = HKT<never>
export type HKT1 = HKT<0>
export type HKT2 = HKT<0 | 1>
export type HKT3 = HKT<0 | 1 | 2>
export type HKT4 = HKT<0 | 1 | 2 | 3>
export type HKT5 = HKT<0 | 1 | 2 | 3 | 4>
export type HKT6 = HKT<0 | 1 | 2 | 3 | 4 | 5>

/** Evaluates a HKT. Usage is `$<H, A1>`, `$<H, A1, A2>`, ... */
export type $<
  H extends HKT,
  A0 = _,
  A1 = _,
  A2 = _,
  A3 = _,
  A4 = _,
  A5 = _,
  A6 = _
> = EVAL<H, TakeUnboundArgsFromArray<H, [A0, A1, A2, A3, A4, A5, A6]>>

/** Wildcard operator for HKTs. Usage is `$<H, A1, _, A2>` */
export type _ = Unique<typeof _>

export declare const DEF: unique symbol
export declare const ARGS: unique symbol
export declare const CONSTRAINTS: unique symbol
export type DEF = typeof DEF
export type ARGS = typeof ARGS
export type CONSTRAINTS = typeof CONSTRAINTS

// ----------------------------------------------------------------------------
// Implementation
// ----------------------------------------------------------------------------

type BaseArgNames = number

type HKT<ArgNames extends BaseArgNames = BaseArgNames> = {
  [DEF]: unknown
  [ARGS]: { [argName in ArgNames]: unknown }
}

declare const _: unique symbol
// Helper for better error messages
type Unique<T> = T & { _unique_tag: never }

/*
  Takes the n-th unbound arg of a HKT from the n-th position of the ArgArray.
  For example if H is from HKT4 with args 0 and 2 already bound
  then ArrayOfUnboundArgNames<H> is [1, 3] and this will return
    {
      1: ArgArray[0]
      3: ArgArray[1]
    }
*/
type TakeUnboundArgsFromArray<H extends HKT, ArgArray extends any[]> = {
  [k in ArrayKeyof<ArrayOfUnboundArgNames<H>> as k extends keyof ArgArray
    ? ArrayOfUnboundArgNames<H>[k]
    : never]: ArgArray[k]
}

type EVAL<H extends HKT, Args> =
  // prettier-ignore
  PickBoundEntries<Args> extends PickUnboundEntries<H[ARGS]>
    ? (H & { [ARGS]: Args })[DEF]
    : PARTIAL<H, Args>

type PARTIAL<H extends HKT, Args> =
  // prettier-ignore
  PickUnboundEntries<Args> extends PickUnboundEntries<H[ARGS]>
    ? H
    : MergeArgs<H, Args>

type MergeArgs<H extends HKT, Args> = H & {
  [ARGS]: {
    // prettier-ignore
    [k in keyof H[ARGS]]:
      k extends keyof Args
        ? UnboundAsUnknown<Args[k]>
        : H[ARGS][k]
  }
}

type _UNBOUND = _ & unknown
type UnboundAsUnknown<X> = _UNBOUND extends X ? unknown : X

type PickBoundEntries<Args> = {
  [k in keyof Args as _UNBOUND extends Args[k] ? never : k]: Args[k]
}

type PickUnboundEntries<Args> = {
  [k in keyof Args as _UNBOUND extends Args[k] ? k : never]: Args[k]
}

type ArrayOfUnboundArgNames<
  H extends HKT,
  ACC extends any[] = [],
  LEN extends number[] = []
> =
  // prettier-ignore
  LEN["length"] extends MAX_LENGTH
    ? ACC
    : LEN["length"] extends keyof H[ARGS]
      ? ArrayOfUnboundArgNames<
          H,
          _UNBOUND extends H[ARGS][LEN["length"]]
            ? [...ACC, LEN["length"]]
            : ACC,
          [...LEN, 1]
        >
      : ACC

type MAX_LENGTH = 7

// Helper to have a proper `keyof` for calculated small arrays such as [1, 3, 5]
type ArrayKeyof<T> = {
  [k in keyof Omit<T, number>]: EnsureInt<k>
}[keyof Omit<T, number>]

type EnsureInt<T> = T extends `${infer Digit extends number}` ? Digit : never
