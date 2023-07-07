export type Assert<T extends true> = T

export type EQ<T, U> =
  // prettier-ignore
  (<V>() => V extends T ? 1 : 2) extends
  (<V>() => V extends U ? 1 : 2) ? true :
  { error: "Types are not equal"; type1: T; type2: U }

/** Tests if the Assert and EQ types behave as intended */
type SelfTest = [
  // @ts-expect-no-error
  Assert<EQ<1, 1>>,
  // @ts-expect-error
  Assert<EQ<1, 2>>,
  // @ts-expect-error
  Assert<EQ<never, 1>>
]
