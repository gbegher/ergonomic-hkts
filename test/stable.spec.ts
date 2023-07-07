import type { Assert, EQ } from "./test-utils"

import type { $, _, DEF, ARGS, HKT1, HKT2, HKT3, HKT4 } from "../src"

// ----------------------------------------------------------------------------
// HKT1
// ----------------------------------------------------------------------------

/** A type to test the functionality of HKT1: X -> [X] */
interface H1 extends HKT1 {
  [DEF]: [this[ARGS][0]]
}

// Evaluation via $

type HKT1_$ = [
  // @ts-expect-no-error
  Assert<EQ<$<H1, "1">, ["1"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<H1, "2">, ["2"]>>
]

// Wildcard operator

type HKT1_Wildcard = [
  // @ts-expect-no-error
  Assert<EQ<$<H1, _>, H1>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H1, _>, "1">, ["1"]>>
]

// Definitions using the wildcard operator

type H1_Def<X> = $<H1, X>
type H1D = H1_Def<_>

type HKT1_Wildcard_Def_Test = [
  // @ts-expect-no-error
  Assert<EQ<$<H1D, 1>, [1]>>
]

// ----------------------------------------------------------------------------
// HKT2
// ----------------------------------------------------------------------------

/** A type to test the functionality of HKT2: (X,Y) -> [X,Y] */
interface H2 extends HKT2 {
  [DEF]: [this[ARGS][0], this[ARGS][1]]
}

// Evaluation via $

type HKT2_$ = [
  // @ts-expect-no-error
  Assert<EQ<$<H2, "1", "2">, ["1", "2"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<H2, "3", "4">, ["3", "4"]>>
]

// Wildcard operator

type HKT2_Wildcard = [
  // @ts-expect-no-error
  Assert<EQ<$<H2, _, _>, H2>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H2, 1, _>, 2>, [1, 2]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H2, _, 2>, 1>, [1, 2]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H2, _, _>, 1, 2>, [1, 2]>>
]

// Definitions: Mixing generics and wildcards

type H2_DefL<X> = $<H2, X, _>
type H2DL = H2_DefL<_>

type H2_DefR<X> = $<H2, _, X>

interface H2_DR extends HKT1 {
  [DEF]: $<H2, _, this[ARGS][0]>
}

type HKT2_Wildcard_Def_Test = [
  // @ts-expect-no-error
  Assert<EQ<$<H2_DefL<"L">, "R">, ["L", "R"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H2DL, "L">, "R">, ["L", "R"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<H2_DefR<"R">, "L">, ["L", "R"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H2_DR, "R">, "L">, ["L", "R"]>>
]

// Definitions: Problematic cases when mixing generics and wildcards

type H2_DR_Bad = H2_DefR<_>

type HKT2_Wildcard_Def_Problematic_Cases = [
  // @ts-expect-error
  Assert<EQ<$<$<H2_DR_Bad, "R">, "L">, ["L", "R"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H2_DR_Bad, "R">, "L">, ["R", "L"]>>
]

// ----------------------------------------------------------------------------
// HKT3
// ----------------------------------------------------------------------------

interface H3 extends HKT3 {
  [DEF]: [this[ARGS][0], this[ARGS][1], this[ARGS][2]]
}

// Evaluation via $

type HKT3_$ = [
  // @ts-expect-no-error
  Assert<EQ<$<H3, "1", "2", "3">, ["1", "2", "3"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<H3, "3", "4", "5">, ["3", "4", "5"]>>
]

// Wildcard operator

type HKT3_Wildcard = [
  // @ts-expect-no-error
  Assert<EQ<$<H3, _, _, _>, H3>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H3, 1, _, _>, 2, 3>, [1, 2, 3]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H3, _, 2, _>, 1, 3>, [1, 2, 3]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H3, _, _, 3>, 1, 2>, [1, 2, 3]>>
]

// Definitions: Mixing generics and wildcards

type H3_DefL<X> = $<H3, X, _, _>
type H3_DefM<X> = $<H3, _, X, _>
type H3_DefR<X> = $<H3, _, _, X>

type H3DL = H3_DefL<_>

type HKT3_Wildcard_Def = [
  // @ts-expect-no-error
  Assert<EQ<$<H3_DefL<"L">, "M", "R">, ["L", "M", "R"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H3DL, "L">, "M", "R">, ["L", "M", "R"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<H3_DefM<"M">, "L", "R">, ["L", "M", "R"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<H3_DefR<"R">, "L", "M">, ["L", "M", "R"]>>
]

// Definitions: Problematic cases when mixing generics and wildcards

type H3DM_Bad = H3_DefM<_>
type H3DR_Bad = H3_DefR<_>

type HKT3_Wildcard_Def_Problematic_Cases = [
  // @ts-expect-error
  Assert<EQ<$<$<H3DM_Bad, "M">, "L", "R">, ["L", "M", "R"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H3DM_Bad, "M">, "L", "R">, ["M", "L", "R"]>>,
  // @ts-expect-error
  Assert<EQ<$<$<H3DR_Bad, "R">, "L", "M">, ["L", "M", "R"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H3DR_Bad, "R">, "L", "M">, ["R", "L", "M"]>>
]

// ----------------------------------------------------------------------------
// HKT4
// ----------------------------------------------------------------------------

interface H4 extends HKT4 {
  [DEF]: [this[ARGS][0], this[ARGS][1], this[ARGS][2], this[ARGS][3]]
}

// Evaluation via $

type HKT4_$ = [
  // @ts-expect-no-error
  Assert<EQ<$<H4, "1", "2", "3", "4">, ["1", "2", "3", "4"]>>,
  // @ts-expect-no-error
  Assert<EQ<$<H4, "3", "4", "5", "6">, ["3", "4", "5", "6"]>>
]

// Wildcard operator

type HKT4_Wildcard = [
  // @ts-expect-no-error
  Assert<EQ<$<H4, _, _, _, _>, H4>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H4, 1, _, _, _>, 2, 3, 4>, [1, 2, 3, 4]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H4, _, 2, _, _>, 1, 3, 4>, [1, 2, 3, 4]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H4, _, _, 3, _>, 1, 2, 4>, [1, 2, 3, 4]>>,
  // @ts-expect-no-error
  Assert<EQ<$<$<H4, _, _, _, 4>, 1, 2, 3>, [1, 2, 3, 4]>>
]
