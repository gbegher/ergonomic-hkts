# Ergonomic Higher Kinded Types

_UNDER CONSTRUCTION_

A type-level library for typescript that implements higher kinded types in a way that allows the composition of higher kinded types at the type level without the need for usual manual definitions.

The goal is to provide a convenient syntax for constructs such as

```(typescript)
type Kleisli<F extends Monad> = Mor<_, F<_>>
```

An initial proof of concept was successful but the exact syntax is still under development.
