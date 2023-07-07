import type { Assert, EQ } from "./test-utils"

import type { _, $, Id, Functor, DEF, HKT1, ARGS, HKT } from "../src"
import type { List, Mor } from "../src"

// ----------------------------------------------------------------------------
// Id
// ----------------------------------------------------------------------------

type IdTests = [
  // @ts-expect-no-error
  Assert<EQ<$<HKT.Id, 1>, 1>>,
  // @ts-expect-no-error
  Assert<EQ<$<HKT.Id, 2>, 2>>
]

// ----------------------------------------------------------------------------
// List
// ----------------------------------------------------------------------------

type ListTests = [
  // @ts-expect-no-error
  Assert<EQ<List<1>, 1[]>>,
  // @ts-expect-no-error
  Assert<EQ<$<List, 1>, 1[]>>
]

// ----------------------------------------------------------------------------
// Mor
// ----------------------------------------------------------------------------

type MorTests = [
  // full evaluation
  [
    // @ts-expect-no-error
    Assert<EQ<Mor<1, 2>, (s: 1) => 2>>,
    // @ts-expect-no-error
    Assert<EQ<$<Mor, 1, 2>, (s: 1) => 2>>
  ],
  // partial evaluation
  [
    // @ts-expect-no-error
    Assert<EQ<$<Mor<1, _>, 2>, (s: 1) => 2>>,
    // @ts-expect-no-error
    Assert<EQ<$<Mor<_, 2>, 1>, (s: 1) => 2>>,
    // @ts-expect-no-error
    Assert<EQ<$<$<Mor, 1, _>, 2>, (s: 1) => 2>>,
    // @ts-expect-no-error
    Assert<EQ<$<$<Mor, _, 2>, 1>, (s: 1) => 2>>
  ]
]

// ----------------------------------------------------------------------------
// Functor
// ----------------------------------------------------------------------------

type FunctorTests = [
  // @ts-expect-no-error
  Assert<EQ<Functor<Id, Mor, Mor>, <S, T>(fn: Mor<S, T>) => Mor<S, T>>>
]

type XX = $<HKT.Functor, Id, Mor, Mor>

const ff: XX = <S, T>(fn: Mor<S, T>) => fn
