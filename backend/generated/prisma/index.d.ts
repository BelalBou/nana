
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Aid
 * 
 */
export type Aid = $Result.DefaultSelection<Prisma.$AidPayload>
/**
 * Model Condition
 * 
 */
export type Condition = $Result.DefaultSelection<Prisma.$ConditionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Aid
 * const aid = await prisma.aid.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Aid
   * const aid = await prisma.aid.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.aid`: Exposes CRUD operations for the **Aid** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Aid
    * const aid = await prisma.aid.findMany()
    * ```
    */
  get aid(): Prisma.AidDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.condition`: Exposes CRUD operations for the **Condition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conditions
    * const conditions = await prisma.condition.findMany()
    * ```
    */
  get condition(): Prisma.ConditionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.1
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Aid: 'Aid',
    Condition: 'Condition'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "aid" | "condition"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Aid: {
        payload: Prisma.$AidPayload<ExtArgs>
        fields: Prisma.AidFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AidFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AidPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AidFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AidPayload>
          }
          findFirst: {
            args: Prisma.AidFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AidPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AidFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AidPayload>
          }
          findMany: {
            args: Prisma.AidFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AidPayload>[]
          }
          create: {
            args: Prisma.AidCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AidPayload>
          }
          createMany: {
            args: Prisma.AidCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AidCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AidPayload>[]
          }
          delete: {
            args: Prisma.AidDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AidPayload>
          }
          update: {
            args: Prisma.AidUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AidPayload>
          }
          deleteMany: {
            args: Prisma.AidDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AidUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AidUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AidPayload>[]
          }
          upsert: {
            args: Prisma.AidUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AidPayload>
          }
          aggregate: {
            args: Prisma.AidAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAid>
          }
          groupBy: {
            args: Prisma.AidGroupByArgs<ExtArgs>
            result: $Utils.Optional<AidGroupByOutputType>[]
          }
          count: {
            args: Prisma.AidCountArgs<ExtArgs>
            result: $Utils.Optional<AidCountAggregateOutputType> | number
          }
        }
      }
      Condition: {
        payload: Prisma.$ConditionPayload<ExtArgs>
        fields: Prisma.ConditionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConditionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConditionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConditionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConditionPayload>
          }
          findFirst: {
            args: Prisma.ConditionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConditionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConditionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConditionPayload>
          }
          findMany: {
            args: Prisma.ConditionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConditionPayload>[]
          }
          create: {
            args: Prisma.ConditionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConditionPayload>
          }
          createMany: {
            args: Prisma.ConditionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConditionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConditionPayload>[]
          }
          delete: {
            args: Prisma.ConditionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConditionPayload>
          }
          update: {
            args: Prisma.ConditionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConditionPayload>
          }
          deleteMany: {
            args: Prisma.ConditionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConditionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConditionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConditionPayload>[]
          }
          upsert: {
            args: Prisma.ConditionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConditionPayload>
          }
          aggregate: {
            args: Prisma.ConditionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCondition>
          }
          groupBy: {
            args: Prisma.ConditionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConditionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConditionCountArgs<ExtArgs>
            result: $Utils.Optional<ConditionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    aid?: AidOmit
    condition?: ConditionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AidCountOutputType
   */

  export type AidCountOutputType = {
    conditions: number
  }

  export type AidCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conditions?: boolean | AidCountOutputTypeCountConditionsArgs
  }

  // Custom InputTypes
  /**
   * AidCountOutputType without action
   */
  export type AidCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AidCountOutputType
     */
    select?: AidCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AidCountOutputType without action
   */
  export type AidCountOutputTypeCountConditionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConditionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Aid
   */

  export type AggregateAid = {
    _count: AidCountAggregateOutputType | null
    _avg: AidAvgAggregateOutputType | null
    _sum: AidSumAggregateOutputType | null
    _min: AidMinAggregateOutputType | null
    _max: AidMaxAggregateOutputType | null
  }

  export type AidAvgAggregateOutputType = {
    id: number | null
  }

  export type AidSumAggregateOutputType = {
    id: number | null
  }

  export type AidMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    region: string | null
    link: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AidMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    region: string | null
    link: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AidCountAggregateOutputType = {
    id: number
    title: number
    description: number
    region: number
    link: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AidAvgAggregateInputType = {
    id?: true
  }

  export type AidSumAggregateInputType = {
    id?: true
  }

  export type AidMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    region?: true
    link?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AidMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    region?: true
    link?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AidCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    region?: true
    link?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AidAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aid to aggregate.
     */
    where?: AidWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aid to fetch.
     */
    orderBy?: AidOrderByWithRelationInput | AidOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AidWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aid from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aid.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Aid
    **/
    _count?: true | AidCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AidAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AidSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AidMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AidMaxAggregateInputType
  }

  export type GetAidAggregateType<T extends AidAggregateArgs> = {
        [P in keyof T & keyof AggregateAid]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAid[P]>
      : GetScalarType<T[P], AggregateAid[P]>
  }




  export type AidGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AidWhereInput
    orderBy?: AidOrderByWithAggregationInput | AidOrderByWithAggregationInput[]
    by: AidScalarFieldEnum[] | AidScalarFieldEnum
    having?: AidScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AidCountAggregateInputType | true
    _avg?: AidAvgAggregateInputType
    _sum?: AidSumAggregateInputType
    _min?: AidMinAggregateInputType
    _max?: AidMaxAggregateInputType
  }

  export type AidGroupByOutputType = {
    id: number
    title: string
    description: string
    region: string
    link: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: AidCountAggregateOutputType | null
    _avg: AidAvgAggregateOutputType | null
    _sum: AidSumAggregateOutputType | null
    _min: AidMinAggregateOutputType | null
    _max: AidMaxAggregateOutputType | null
  }

  type GetAidGroupByPayload<T extends AidGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AidGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AidGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AidGroupByOutputType[P]>
            : GetScalarType<T[P], AidGroupByOutputType[P]>
        }
      >
    >


  export type AidSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    region?: boolean
    link?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conditions?: boolean | Aid$conditionsArgs<ExtArgs>
    _count?: boolean | AidCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aid"]>

  export type AidSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    region?: boolean
    link?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aid"]>

  export type AidSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    region?: boolean
    link?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aid"]>

  export type AidSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    region?: boolean
    link?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AidOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "region" | "link" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["aid"]>
  export type AidInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conditions?: boolean | Aid$conditionsArgs<ExtArgs>
    _count?: boolean | AidCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AidIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AidIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AidPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Aid"
    objects: {
      conditions: Prisma.$ConditionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      region: string
      link: string
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aid"]>
    composites: {}
  }

  type AidGetPayload<S extends boolean | null | undefined | AidDefaultArgs> = $Result.GetResult<Prisma.$AidPayload, S>

  type AidCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AidFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AidCountAggregateInputType | true
    }

  export interface AidDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Aid'], meta: { name: 'Aid' } }
    /**
     * Find zero or one Aid that matches the filter.
     * @param {AidFindUniqueArgs} args - Arguments to find a Aid
     * @example
     * // Get one Aid
     * const aid = await prisma.aid.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AidFindUniqueArgs>(args: SelectSubset<T, AidFindUniqueArgs<ExtArgs>>): Prisma__AidClient<$Result.GetResult<Prisma.$AidPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Aid that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AidFindUniqueOrThrowArgs} args - Arguments to find a Aid
     * @example
     * // Get one Aid
     * const aid = await prisma.aid.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AidFindUniqueOrThrowArgs>(args: SelectSubset<T, AidFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AidClient<$Result.GetResult<Prisma.$AidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Aid that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AidFindFirstArgs} args - Arguments to find a Aid
     * @example
     * // Get one Aid
     * const aid = await prisma.aid.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AidFindFirstArgs>(args?: SelectSubset<T, AidFindFirstArgs<ExtArgs>>): Prisma__AidClient<$Result.GetResult<Prisma.$AidPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Aid that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AidFindFirstOrThrowArgs} args - Arguments to find a Aid
     * @example
     * // Get one Aid
     * const aid = await prisma.aid.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AidFindFirstOrThrowArgs>(args?: SelectSubset<T, AidFindFirstOrThrowArgs<ExtArgs>>): Prisma__AidClient<$Result.GetResult<Prisma.$AidPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Aid that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AidFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Aid
     * const aid = await prisma.aid.findMany()
     * 
     * // Get first 10 Aid
     * const aid = await prisma.aid.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aidWithIdOnly = await prisma.aid.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AidFindManyArgs>(args?: SelectSubset<T, AidFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Aid.
     * @param {AidCreateArgs} args - Arguments to create a Aid.
     * @example
     * // Create one Aid
     * const Aid = await prisma.aid.create({
     *   data: {
     *     // ... data to create a Aid
     *   }
     * })
     * 
     */
    create<T extends AidCreateArgs>(args: SelectSubset<T, AidCreateArgs<ExtArgs>>): Prisma__AidClient<$Result.GetResult<Prisma.$AidPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Aid.
     * @param {AidCreateManyArgs} args - Arguments to create many Aid.
     * @example
     * // Create many Aid
     * const aid = await prisma.aid.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AidCreateManyArgs>(args?: SelectSubset<T, AidCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Aid and returns the data saved in the database.
     * @param {AidCreateManyAndReturnArgs} args - Arguments to create many Aid.
     * @example
     * // Create many Aid
     * const aid = await prisma.aid.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Aid and only return the `id`
     * const aidWithIdOnly = await prisma.aid.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AidCreateManyAndReturnArgs>(args?: SelectSubset<T, AidCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AidPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Aid.
     * @param {AidDeleteArgs} args - Arguments to delete one Aid.
     * @example
     * // Delete one Aid
     * const Aid = await prisma.aid.delete({
     *   where: {
     *     // ... filter to delete one Aid
     *   }
     * })
     * 
     */
    delete<T extends AidDeleteArgs>(args: SelectSubset<T, AidDeleteArgs<ExtArgs>>): Prisma__AidClient<$Result.GetResult<Prisma.$AidPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Aid.
     * @param {AidUpdateArgs} args - Arguments to update one Aid.
     * @example
     * // Update one Aid
     * const aid = await prisma.aid.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AidUpdateArgs>(args: SelectSubset<T, AidUpdateArgs<ExtArgs>>): Prisma__AidClient<$Result.GetResult<Prisma.$AidPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Aid.
     * @param {AidDeleteManyArgs} args - Arguments to filter Aid to delete.
     * @example
     * // Delete a few Aid
     * const { count } = await prisma.aid.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AidDeleteManyArgs>(args?: SelectSubset<T, AidDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Aid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AidUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Aid
     * const aid = await prisma.aid.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AidUpdateManyArgs>(args: SelectSubset<T, AidUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Aid and returns the data updated in the database.
     * @param {AidUpdateManyAndReturnArgs} args - Arguments to update many Aid.
     * @example
     * // Update many Aid
     * const aid = await prisma.aid.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Aid and only return the `id`
     * const aidWithIdOnly = await prisma.aid.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AidUpdateManyAndReturnArgs>(args: SelectSubset<T, AidUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AidPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Aid.
     * @param {AidUpsertArgs} args - Arguments to update or create a Aid.
     * @example
     * // Update or create a Aid
     * const aid = await prisma.aid.upsert({
     *   create: {
     *     // ... data to create a Aid
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Aid we want to update
     *   }
     * })
     */
    upsert<T extends AidUpsertArgs>(args: SelectSubset<T, AidUpsertArgs<ExtArgs>>): Prisma__AidClient<$Result.GetResult<Prisma.$AidPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Aid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AidCountArgs} args - Arguments to filter Aid to count.
     * @example
     * // Count the number of Aid
     * const count = await prisma.aid.count({
     *   where: {
     *     // ... the filter for the Aid we want to count
     *   }
     * })
    **/
    count<T extends AidCountArgs>(
      args?: Subset<T, AidCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AidCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Aid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AidAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AidAggregateArgs>(args: Subset<T, AidAggregateArgs>): Prisma.PrismaPromise<GetAidAggregateType<T>>

    /**
     * Group by Aid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AidGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AidGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AidGroupByArgs['orderBy'] }
        : { orderBy?: AidGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AidGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAidGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Aid model
   */
  readonly fields: AidFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Aid.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AidClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conditions<T extends Aid$conditionsArgs<ExtArgs> = {}>(args?: Subset<T, Aid$conditionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConditionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Aid model
   */
  interface AidFieldRefs {
    readonly id: FieldRef<"Aid", 'Int'>
    readonly title: FieldRef<"Aid", 'String'>
    readonly description: FieldRef<"Aid", 'String'>
    readonly region: FieldRef<"Aid", 'String'>
    readonly link: FieldRef<"Aid", 'String'>
    readonly active: FieldRef<"Aid", 'Boolean'>
    readonly createdAt: FieldRef<"Aid", 'DateTime'>
    readonly updatedAt: FieldRef<"Aid", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Aid findUnique
   */
  export type AidFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aid
     */
    select?: AidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aid
     */
    omit?: AidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AidInclude<ExtArgs> | null
    /**
     * Filter, which Aid to fetch.
     */
    where: AidWhereUniqueInput
  }

  /**
   * Aid findUniqueOrThrow
   */
  export type AidFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aid
     */
    select?: AidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aid
     */
    omit?: AidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AidInclude<ExtArgs> | null
    /**
     * Filter, which Aid to fetch.
     */
    where: AidWhereUniqueInput
  }

  /**
   * Aid findFirst
   */
  export type AidFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aid
     */
    select?: AidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aid
     */
    omit?: AidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AidInclude<ExtArgs> | null
    /**
     * Filter, which Aid to fetch.
     */
    where?: AidWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aid to fetch.
     */
    orderBy?: AidOrderByWithRelationInput | AidOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Aid.
     */
    cursor?: AidWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aid from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aid.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Aid.
     */
    distinct?: AidScalarFieldEnum | AidScalarFieldEnum[]
  }

  /**
   * Aid findFirstOrThrow
   */
  export type AidFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aid
     */
    select?: AidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aid
     */
    omit?: AidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AidInclude<ExtArgs> | null
    /**
     * Filter, which Aid to fetch.
     */
    where?: AidWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aid to fetch.
     */
    orderBy?: AidOrderByWithRelationInput | AidOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Aid.
     */
    cursor?: AidWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aid from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aid.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Aid.
     */
    distinct?: AidScalarFieldEnum | AidScalarFieldEnum[]
  }

  /**
   * Aid findMany
   */
  export type AidFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aid
     */
    select?: AidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aid
     */
    omit?: AidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AidInclude<ExtArgs> | null
    /**
     * Filter, which Aid to fetch.
     */
    where?: AidWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aid to fetch.
     */
    orderBy?: AidOrderByWithRelationInput | AidOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Aid.
     */
    cursor?: AidWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aid from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aid.
     */
    skip?: number
    distinct?: AidScalarFieldEnum | AidScalarFieldEnum[]
  }

  /**
   * Aid create
   */
  export type AidCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aid
     */
    select?: AidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aid
     */
    omit?: AidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AidInclude<ExtArgs> | null
    /**
     * The data needed to create a Aid.
     */
    data: XOR<AidCreateInput, AidUncheckedCreateInput>
  }

  /**
   * Aid createMany
   */
  export type AidCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Aid.
     */
    data: AidCreateManyInput | AidCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Aid createManyAndReturn
   */
  export type AidCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aid
     */
    select?: AidSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Aid
     */
    omit?: AidOmit<ExtArgs> | null
    /**
     * The data used to create many Aid.
     */
    data: AidCreateManyInput | AidCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Aid update
   */
  export type AidUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aid
     */
    select?: AidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aid
     */
    omit?: AidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AidInclude<ExtArgs> | null
    /**
     * The data needed to update a Aid.
     */
    data: XOR<AidUpdateInput, AidUncheckedUpdateInput>
    /**
     * Choose, which Aid to update.
     */
    where: AidWhereUniqueInput
  }

  /**
   * Aid updateMany
   */
  export type AidUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Aid.
     */
    data: XOR<AidUpdateManyMutationInput, AidUncheckedUpdateManyInput>
    /**
     * Filter which Aid to update
     */
    where?: AidWhereInput
    /**
     * Limit how many Aid to update.
     */
    limit?: number
  }

  /**
   * Aid updateManyAndReturn
   */
  export type AidUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aid
     */
    select?: AidSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Aid
     */
    omit?: AidOmit<ExtArgs> | null
    /**
     * The data used to update Aid.
     */
    data: XOR<AidUpdateManyMutationInput, AidUncheckedUpdateManyInput>
    /**
     * Filter which Aid to update
     */
    where?: AidWhereInput
    /**
     * Limit how many Aid to update.
     */
    limit?: number
  }

  /**
   * Aid upsert
   */
  export type AidUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aid
     */
    select?: AidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aid
     */
    omit?: AidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AidInclude<ExtArgs> | null
    /**
     * The filter to search for the Aid to update in case it exists.
     */
    where: AidWhereUniqueInput
    /**
     * In case the Aid found by the `where` argument doesn't exist, create a new Aid with this data.
     */
    create: XOR<AidCreateInput, AidUncheckedCreateInput>
    /**
     * In case the Aid was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AidUpdateInput, AidUncheckedUpdateInput>
  }

  /**
   * Aid delete
   */
  export type AidDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aid
     */
    select?: AidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aid
     */
    omit?: AidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AidInclude<ExtArgs> | null
    /**
     * Filter which Aid to delete.
     */
    where: AidWhereUniqueInput
  }

  /**
   * Aid deleteMany
   */
  export type AidDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aid to delete
     */
    where?: AidWhereInput
    /**
     * Limit how many Aid to delete.
     */
    limit?: number
  }

  /**
   * Aid.conditions
   */
  export type Aid$conditionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionInclude<ExtArgs> | null
    where?: ConditionWhereInput
    orderBy?: ConditionOrderByWithRelationInput | ConditionOrderByWithRelationInput[]
    cursor?: ConditionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConditionScalarFieldEnum | ConditionScalarFieldEnum[]
  }

  /**
   * Aid without action
   */
  export type AidDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aid
     */
    select?: AidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aid
     */
    omit?: AidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AidInclude<ExtArgs> | null
  }


  /**
   * Model Condition
   */

  export type AggregateCondition = {
    _count: ConditionCountAggregateOutputType | null
    _avg: ConditionAvgAggregateOutputType | null
    _sum: ConditionSumAggregateOutputType | null
    _min: ConditionMinAggregateOutputType | null
    _max: ConditionMaxAggregateOutputType | null
  }

  export type ConditionAvgAggregateOutputType = {
    id: number | null
    aidId: number | null
    order: number | null
  }

  export type ConditionSumAggregateOutputType = {
    id: number | null
    aidId: number | null
    order: number | null
  }

  export type ConditionMinAggregateOutputType = {
    id: number | null
    aidId: number | null
    question: string | null
    field: string | null
    type: string | null
    operator: string | null
    value: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConditionMaxAggregateOutputType = {
    id: number | null
    aidId: number | null
    question: string | null
    field: string | null
    type: string | null
    operator: string | null
    value: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConditionCountAggregateOutputType = {
    id: number
    aidId: number
    question: number
    field: number
    type: number
    operator: number
    value: number
    order: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConditionAvgAggregateInputType = {
    id?: true
    aidId?: true
    order?: true
  }

  export type ConditionSumAggregateInputType = {
    id?: true
    aidId?: true
    order?: true
  }

  export type ConditionMinAggregateInputType = {
    id?: true
    aidId?: true
    question?: true
    field?: true
    type?: true
    operator?: true
    value?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConditionMaxAggregateInputType = {
    id?: true
    aidId?: true
    question?: true
    field?: true
    type?: true
    operator?: true
    value?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConditionCountAggregateInputType = {
    id?: true
    aidId?: true
    question?: true
    field?: true
    type?: true
    operator?: true
    value?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConditionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Condition to aggregate.
     */
    where?: ConditionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conditions to fetch.
     */
    orderBy?: ConditionOrderByWithRelationInput | ConditionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConditionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conditions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conditions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conditions
    **/
    _count?: true | ConditionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConditionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConditionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConditionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConditionMaxAggregateInputType
  }

  export type GetConditionAggregateType<T extends ConditionAggregateArgs> = {
        [P in keyof T & keyof AggregateCondition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCondition[P]>
      : GetScalarType<T[P], AggregateCondition[P]>
  }




  export type ConditionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConditionWhereInput
    orderBy?: ConditionOrderByWithAggregationInput | ConditionOrderByWithAggregationInput[]
    by: ConditionScalarFieldEnum[] | ConditionScalarFieldEnum
    having?: ConditionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConditionCountAggregateInputType | true
    _avg?: ConditionAvgAggregateInputType
    _sum?: ConditionSumAggregateInputType
    _min?: ConditionMinAggregateInputType
    _max?: ConditionMaxAggregateInputType
  }

  export type ConditionGroupByOutputType = {
    id: number
    aidId: number
    question: string
    field: string
    type: string
    operator: string
    value: string
    order: number
    createdAt: Date
    updatedAt: Date
    _count: ConditionCountAggregateOutputType | null
    _avg: ConditionAvgAggregateOutputType | null
    _sum: ConditionSumAggregateOutputType | null
    _min: ConditionMinAggregateOutputType | null
    _max: ConditionMaxAggregateOutputType | null
  }

  type GetConditionGroupByPayload<T extends ConditionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConditionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConditionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConditionGroupByOutputType[P]>
            : GetScalarType<T[P], ConditionGroupByOutputType[P]>
        }
      >
    >


  export type ConditionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aidId?: boolean
    question?: boolean
    field?: boolean
    type?: boolean
    operator?: boolean
    value?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aid?: boolean | AidDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["condition"]>

  export type ConditionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aidId?: boolean
    question?: boolean
    field?: boolean
    type?: boolean
    operator?: boolean
    value?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aid?: boolean | AidDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["condition"]>

  export type ConditionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aidId?: boolean
    question?: boolean
    field?: boolean
    type?: boolean
    operator?: boolean
    value?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aid?: boolean | AidDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["condition"]>

  export type ConditionSelectScalar = {
    id?: boolean
    aidId?: boolean
    question?: boolean
    field?: boolean
    type?: boolean
    operator?: boolean
    value?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConditionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "aidId" | "question" | "field" | "type" | "operator" | "value" | "order" | "createdAt" | "updatedAt", ExtArgs["result"]["condition"]>
  export type ConditionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aid?: boolean | AidDefaultArgs<ExtArgs>
  }
  export type ConditionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aid?: boolean | AidDefaultArgs<ExtArgs>
  }
  export type ConditionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aid?: boolean | AidDefaultArgs<ExtArgs>
  }

  export type $ConditionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Condition"
    objects: {
      aid: Prisma.$AidPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      aidId: number
      question: string
      field: string
      type: string
      operator: string
      value: string
      order: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["condition"]>
    composites: {}
  }

  type ConditionGetPayload<S extends boolean | null | undefined | ConditionDefaultArgs> = $Result.GetResult<Prisma.$ConditionPayload, S>

  type ConditionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConditionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConditionCountAggregateInputType | true
    }

  export interface ConditionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Condition'], meta: { name: 'Condition' } }
    /**
     * Find zero or one Condition that matches the filter.
     * @param {ConditionFindUniqueArgs} args - Arguments to find a Condition
     * @example
     * // Get one Condition
     * const condition = await prisma.condition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConditionFindUniqueArgs>(args: SelectSubset<T, ConditionFindUniqueArgs<ExtArgs>>): Prisma__ConditionClient<$Result.GetResult<Prisma.$ConditionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Condition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConditionFindUniqueOrThrowArgs} args - Arguments to find a Condition
     * @example
     * // Get one Condition
     * const condition = await prisma.condition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConditionFindUniqueOrThrowArgs>(args: SelectSubset<T, ConditionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConditionClient<$Result.GetResult<Prisma.$ConditionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Condition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConditionFindFirstArgs} args - Arguments to find a Condition
     * @example
     * // Get one Condition
     * const condition = await prisma.condition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConditionFindFirstArgs>(args?: SelectSubset<T, ConditionFindFirstArgs<ExtArgs>>): Prisma__ConditionClient<$Result.GetResult<Prisma.$ConditionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Condition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConditionFindFirstOrThrowArgs} args - Arguments to find a Condition
     * @example
     * // Get one Condition
     * const condition = await prisma.condition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConditionFindFirstOrThrowArgs>(args?: SelectSubset<T, ConditionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConditionClient<$Result.GetResult<Prisma.$ConditionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conditions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConditionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conditions
     * const conditions = await prisma.condition.findMany()
     * 
     * // Get first 10 Conditions
     * const conditions = await prisma.condition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conditionWithIdOnly = await prisma.condition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConditionFindManyArgs>(args?: SelectSubset<T, ConditionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConditionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Condition.
     * @param {ConditionCreateArgs} args - Arguments to create a Condition.
     * @example
     * // Create one Condition
     * const Condition = await prisma.condition.create({
     *   data: {
     *     // ... data to create a Condition
     *   }
     * })
     * 
     */
    create<T extends ConditionCreateArgs>(args: SelectSubset<T, ConditionCreateArgs<ExtArgs>>): Prisma__ConditionClient<$Result.GetResult<Prisma.$ConditionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conditions.
     * @param {ConditionCreateManyArgs} args - Arguments to create many Conditions.
     * @example
     * // Create many Conditions
     * const condition = await prisma.condition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConditionCreateManyArgs>(args?: SelectSubset<T, ConditionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conditions and returns the data saved in the database.
     * @param {ConditionCreateManyAndReturnArgs} args - Arguments to create many Conditions.
     * @example
     * // Create many Conditions
     * const condition = await prisma.condition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conditions and only return the `id`
     * const conditionWithIdOnly = await prisma.condition.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConditionCreateManyAndReturnArgs>(args?: SelectSubset<T, ConditionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConditionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Condition.
     * @param {ConditionDeleteArgs} args - Arguments to delete one Condition.
     * @example
     * // Delete one Condition
     * const Condition = await prisma.condition.delete({
     *   where: {
     *     // ... filter to delete one Condition
     *   }
     * })
     * 
     */
    delete<T extends ConditionDeleteArgs>(args: SelectSubset<T, ConditionDeleteArgs<ExtArgs>>): Prisma__ConditionClient<$Result.GetResult<Prisma.$ConditionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Condition.
     * @param {ConditionUpdateArgs} args - Arguments to update one Condition.
     * @example
     * // Update one Condition
     * const condition = await prisma.condition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConditionUpdateArgs>(args: SelectSubset<T, ConditionUpdateArgs<ExtArgs>>): Prisma__ConditionClient<$Result.GetResult<Prisma.$ConditionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conditions.
     * @param {ConditionDeleteManyArgs} args - Arguments to filter Conditions to delete.
     * @example
     * // Delete a few Conditions
     * const { count } = await prisma.condition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConditionDeleteManyArgs>(args?: SelectSubset<T, ConditionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conditions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConditionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conditions
     * const condition = await prisma.condition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConditionUpdateManyArgs>(args: SelectSubset<T, ConditionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conditions and returns the data updated in the database.
     * @param {ConditionUpdateManyAndReturnArgs} args - Arguments to update many Conditions.
     * @example
     * // Update many Conditions
     * const condition = await prisma.condition.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conditions and only return the `id`
     * const conditionWithIdOnly = await prisma.condition.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConditionUpdateManyAndReturnArgs>(args: SelectSubset<T, ConditionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConditionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Condition.
     * @param {ConditionUpsertArgs} args - Arguments to update or create a Condition.
     * @example
     * // Update or create a Condition
     * const condition = await prisma.condition.upsert({
     *   create: {
     *     // ... data to create a Condition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Condition we want to update
     *   }
     * })
     */
    upsert<T extends ConditionUpsertArgs>(args: SelectSubset<T, ConditionUpsertArgs<ExtArgs>>): Prisma__ConditionClient<$Result.GetResult<Prisma.$ConditionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conditions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConditionCountArgs} args - Arguments to filter Conditions to count.
     * @example
     * // Count the number of Conditions
     * const count = await prisma.condition.count({
     *   where: {
     *     // ... the filter for the Conditions we want to count
     *   }
     * })
    **/
    count<T extends ConditionCountArgs>(
      args?: Subset<T, ConditionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConditionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Condition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConditionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConditionAggregateArgs>(args: Subset<T, ConditionAggregateArgs>): Prisma.PrismaPromise<GetConditionAggregateType<T>>

    /**
     * Group by Condition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConditionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConditionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConditionGroupByArgs['orderBy'] }
        : { orderBy?: ConditionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConditionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConditionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Condition model
   */
  readonly fields: ConditionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Condition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConditionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aid<T extends AidDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AidDefaultArgs<ExtArgs>>): Prisma__AidClient<$Result.GetResult<Prisma.$AidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Condition model
   */
  interface ConditionFieldRefs {
    readonly id: FieldRef<"Condition", 'Int'>
    readonly aidId: FieldRef<"Condition", 'Int'>
    readonly question: FieldRef<"Condition", 'String'>
    readonly field: FieldRef<"Condition", 'String'>
    readonly type: FieldRef<"Condition", 'String'>
    readonly operator: FieldRef<"Condition", 'String'>
    readonly value: FieldRef<"Condition", 'String'>
    readonly order: FieldRef<"Condition", 'Int'>
    readonly createdAt: FieldRef<"Condition", 'DateTime'>
    readonly updatedAt: FieldRef<"Condition", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Condition findUnique
   */
  export type ConditionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionInclude<ExtArgs> | null
    /**
     * Filter, which Condition to fetch.
     */
    where: ConditionWhereUniqueInput
  }

  /**
   * Condition findUniqueOrThrow
   */
  export type ConditionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionInclude<ExtArgs> | null
    /**
     * Filter, which Condition to fetch.
     */
    where: ConditionWhereUniqueInput
  }

  /**
   * Condition findFirst
   */
  export type ConditionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionInclude<ExtArgs> | null
    /**
     * Filter, which Condition to fetch.
     */
    where?: ConditionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conditions to fetch.
     */
    orderBy?: ConditionOrderByWithRelationInput | ConditionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conditions.
     */
    cursor?: ConditionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conditions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conditions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conditions.
     */
    distinct?: ConditionScalarFieldEnum | ConditionScalarFieldEnum[]
  }

  /**
   * Condition findFirstOrThrow
   */
  export type ConditionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionInclude<ExtArgs> | null
    /**
     * Filter, which Condition to fetch.
     */
    where?: ConditionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conditions to fetch.
     */
    orderBy?: ConditionOrderByWithRelationInput | ConditionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conditions.
     */
    cursor?: ConditionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conditions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conditions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conditions.
     */
    distinct?: ConditionScalarFieldEnum | ConditionScalarFieldEnum[]
  }

  /**
   * Condition findMany
   */
  export type ConditionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionInclude<ExtArgs> | null
    /**
     * Filter, which Conditions to fetch.
     */
    where?: ConditionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conditions to fetch.
     */
    orderBy?: ConditionOrderByWithRelationInput | ConditionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conditions.
     */
    cursor?: ConditionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conditions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conditions.
     */
    skip?: number
    distinct?: ConditionScalarFieldEnum | ConditionScalarFieldEnum[]
  }

  /**
   * Condition create
   */
  export type ConditionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionInclude<ExtArgs> | null
    /**
     * The data needed to create a Condition.
     */
    data: XOR<ConditionCreateInput, ConditionUncheckedCreateInput>
  }

  /**
   * Condition createMany
   */
  export type ConditionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conditions.
     */
    data: ConditionCreateManyInput | ConditionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Condition createManyAndReturn
   */
  export type ConditionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * The data used to create many Conditions.
     */
    data: ConditionCreateManyInput | ConditionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Condition update
   */
  export type ConditionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionInclude<ExtArgs> | null
    /**
     * The data needed to update a Condition.
     */
    data: XOR<ConditionUpdateInput, ConditionUncheckedUpdateInput>
    /**
     * Choose, which Condition to update.
     */
    where: ConditionWhereUniqueInput
  }

  /**
   * Condition updateMany
   */
  export type ConditionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conditions.
     */
    data: XOR<ConditionUpdateManyMutationInput, ConditionUncheckedUpdateManyInput>
    /**
     * Filter which Conditions to update
     */
    where?: ConditionWhereInput
    /**
     * Limit how many Conditions to update.
     */
    limit?: number
  }

  /**
   * Condition updateManyAndReturn
   */
  export type ConditionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * The data used to update Conditions.
     */
    data: XOR<ConditionUpdateManyMutationInput, ConditionUncheckedUpdateManyInput>
    /**
     * Filter which Conditions to update
     */
    where?: ConditionWhereInput
    /**
     * Limit how many Conditions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Condition upsert
   */
  export type ConditionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionInclude<ExtArgs> | null
    /**
     * The filter to search for the Condition to update in case it exists.
     */
    where: ConditionWhereUniqueInput
    /**
     * In case the Condition found by the `where` argument doesn't exist, create a new Condition with this data.
     */
    create: XOR<ConditionCreateInput, ConditionUncheckedCreateInput>
    /**
     * In case the Condition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConditionUpdateInput, ConditionUncheckedUpdateInput>
  }

  /**
   * Condition delete
   */
  export type ConditionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionInclude<ExtArgs> | null
    /**
     * Filter which Condition to delete.
     */
    where: ConditionWhereUniqueInput
  }

  /**
   * Condition deleteMany
   */
  export type ConditionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conditions to delete
     */
    where?: ConditionWhereInput
    /**
     * Limit how many Conditions to delete.
     */
    limit?: number
  }

  /**
   * Condition without action
   */
  export type ConditionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Condition
     */
    select?: ConditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Condition
     */
    omit?: ConditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConditionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AidScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    region: 'region',
    link: 'link',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AidScalarFieldEnum = (typeof AidScalarFieldEnum)[keyof typeof AidScalarFieldEnum]


  export const ConditionScalarFieldEnum: {
    id: 'id',
    aidId: 'aidId',
    question: 'question',
    field: 'field',
    type: 'type',
    operator: 'operator',
    value: 'value',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConditionScalarFieldEnum = (typeof ConditionScalarFieldEnum)[keyof typeof ConditionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AidWhereInput = {
    AND?: AidWhereInput | AidWhereInput[]
    OR?: AidWhereInput[]
    NOT?: AidWhereInput | AidWhereInput[]
    id?: IntFilter<"Aid"> | number
    title?: StringFilter<"Aid"> | string
    description?: StringFilter<"Aid"> | string
    region?: StringFilter<"Aid"> | string
    link?: StringFilter<"Aid"> | string
    active?: BoolFilter<"Aid"> | boolean
    createdAt?: DateTimeFilter<"Aid"> | Date | string
    updatedAt?: DateTimeFilter<"Aid"> | Date | string
    conditions?: ConditionListRelationFilter
  }

  export type AidOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    region?: SortOrder
    link?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conditions?: ConditionOrderByRelationAggregateInput
  }

  export type AidWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AidWhereInput | AidWhereInput[]
    OR?: AidWhereInput[]
    NOT?: AidWhereInput | AidWhereInput[]
    title?: StringFilter<"Aid"> | string
    description?: StringFilter<"Aid"> | string
    region?: StringFilter<"Aid"> | string
    link?: StringFilter<"Aid"> | string
    active?: BoolFilter<"Aid"> | boolean
    createdAt?: DateTimeFilter<"Aid"> | Date | string
    updatedAt?: DateTimeFilter<"Aid"> | Date | string
    conditions?: ConditionListRelationFilter
  }, "id">

  export type AidOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    region?: SortOrder
    link?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AidCountOrderByAggregateInput
    _avg?: AidAvgOrderByAggregateInput
    _max?: AidMaxOrderByAggregateInput
    _min?: AidMinOrderByAggregateInput
    _sum?: AidSumOrderByAggregateInput
  }

  export type AidScalarWhereWithAggregatesInput = {
    AND?: AidScalarWhereWithAggregatesInput | AidScalarWhereWithAggregatesInput[]
    OR?: AidScalarWhereWithAggregatesInput[]
    NOT?: AidScalarWhereWithAggregatesInput | AidScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Aid"> | number
    title?: StringWithAggregatesFilter<"Aid"> | string
    description?: StringWithAggregatesFilter<"Aid"> | string
    region?: StringWithAggregatesFilter<"Aid"> | string
    link?: StringWithAggregatesFilter<"Aid"> | string
    active?: BoolWithAggregatesFilter<"Aid"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Aid"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Aid"> | Date | string
  }

  export type ConditionWhereInput = {
    AND?: ConditionWhereInput | ConditionWhereInput[]
    OR?: ConditionWhereInput[]
    NOT?: ConditionWhereInput | ConditionWhereInput[]
    id?: IntFilter<"Condition"> | number
    aidId?: IntFilter<"Condition"> | number
    question?: StringFilter<"Condition"> | string
    field?: StringFilter<"Condition"> | string
    type?: StringFilter<"Condition"> | string
    operator?: StringFilter<"Condition"> | string
    value?: StringFilter<"Condition"> | string
    order?: IntFilter<"Condition"> | number
    createdAt?: DateTimeFilter<"Condition"> | Date | string
    updatedAt?: DateTimeFilter<"Condition"> | Date | string
    aid?: XOR<AidScalarRelationFilter, AidWhereInput>
  }

  export type ConditionOrderByWithRelationInput = {
    id?: SortOrder
    aidId?: SortOrder
    question?: SortOrder
    field?: SortOrder
    type?: SortOrder
    operator?: SortOrder
    value?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    aid?: AidOrderByWithRelationInput
  }

  export type ConditionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ConditionWhereInput | ConditionWhereInput[]
    OR?: ConditionWhereInput[]
    NOT?: ConditionWhereInput | ConditionWhereInput[]
    aidId?: IntFilter<"Condition"> | number
    question?: StringFilter<"Condition"> | string
    field?: StringFilter<"Condition"> | string
    type?: StringFilter<"Condition"> | string
    operator?: StringFilter<"Condition"> | string
    value?: StringFilter<"Condition"> | string
    order?: IntFilter<"Condition"> | number
    createdAt?: DateTimeFilter<"Condition"> | Date | string
    updatedAt?: DateTimeFilter<"Condition"> | Date | string
    aid?: XOR<AidScalarRelationFilter, AidWhereInput>
  }, "id">

  export type ConditionOrderByWithAggregationInput = {
    id?: SortOrder
    aidId?: SortOrder
    question?: SortOrder
    field?: SortOrder
    type?: SortOrder
    operator?: SortOrder
    value?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConditionCountOrderByAggregateInput
    _avg?: ConditionAvgOrderByAggregateInput
    _max?: ConditionMaxOrderByAggregateInput
    _min?: ConditionMinOrderByAggregateInput
    _sum?: ConditionSumOrderByAggregateInput
  }

  export type ConditionScalarWhereWithAggregatesInput = {
    AND?: ConditionScalarWhereWithAggregatesInput | ConditionScalarWhereWithAggregatesInput[]
    OR?: ConditionScalarWhereWithAggregatesInput[]
    NOT?: ConditionScalarWhereWithAggregatesInput | ConditionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Condition"> | number
    aidId?: IntWithAggregatesFilter<"Condition"> | number
    question?: StringWithAggregatesFilter<"Condition"> | string
    field?: StringWithAggregatesFilter<"Condition"> | string
    type?: StringWithAggregatesFilter<"Condition"> | string
    operator?: StringWithAggregatesFilter<"Condition"> | string
    value?: StringWithAggregatesFilter<"Condition"> | string
    order?: IntWithAggregatesFilter<"Condition"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Condition"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Condition"> | Date | string
  }

  export type AidCreateInput = {
    title: string
    description: string
    region: string
    link: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conditions?: ConditionCreateNestedManyWithoutAidInput
  }

  export type AidUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    region: string
    link: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conditions?: ConditionUncheckedCreateNestedManyWithoutAidInput
  }

  export type AidUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conditions?: ConditionUpdateManyWithoutAidNestedInput
  }

  export type AidUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conditions?: ConditionUncheckedUpdateManyWithoutAidNestedInput
  }

  export type AidCreateManyInput = {
    id?: number
    title: string
    description: string
    region: string
    link: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AidUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AidUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConditionCreateInput = {
    question: string
    field: string
    type: string
    operator: string
    value: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    aid: AidCreateNestedOneWithoutConditionsInput
  }

  export type ConditionUncheckedCreateInput = {
    id?: number
    aidId: number
    question: string
    field: string
    type: string
    operator: string
    value: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConditionUpdateInput = {
    question?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    operator?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aid?: AidUpdateOneRequiredWithoutConditionsNestedInput
  }

  export type ConditionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    aidId?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    operator?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConditionCreateManyInput = {
    id?: number
    aidId: number
    question: string
    field: string
    type: string
    operator: string
    value: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConditionUpdateManyMutationInput = {
    question?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    operator?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConditionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    aidId?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    operator?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ConditionListRelationFilter = {
    every?: ConditionWhereInput
    some?: ConditionWhereInput
    none?: ConditionWhereInput
  }

  export type ConditionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AidCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    region?: SortOrder
    link?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AidAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AidMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    region?: SortOrder
    link?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AidMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    region?: SortOrder
    link?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AidSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AidScalarRelationFilter = {
    is?: AidWhereInput
    isNot?: AidWhereInput
  }

  export type ConditionCountOrderByAggregateInput = {
    id?: SortOrder
    aidId?: SortOrder
    question?: SortOrder
    field?: SortOrder
    type?: SortOrder
    operator?: SortOrder
    value?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConditionAvgOrderByAggregateInput = {
    id?: SortOrder
    aidId?: SortOrder
    order?: SortOrder
  }

  export type ConditionMaxOrderByAggregateInput = {
    id?: SortOrder
    aidId?: SortOrder
    question?: SortOrder
    field?: SortOrder
    type?: SortOrder
    operator?: SortOrder
    value?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConditionMinOrderByAggregateInput = {
    id?: SortOrder
    aidId?: SortOrder
    question?: SortOrder
    field?: SortOrder
    type?: SortOrder
    operator?: SortOrder
    value?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConditionSumOrderByAggregateInput = {
    id?: SortOrder
    aidId?: SortOrder
    order?: SortOrder
  }

  export type ConditionCreateNestedManyWithoutAidInput = {
    create?: XOR<ConditionCreateWithoutAidInput, ConditionUncheckedCreateWithoutAidInput> | ConditionCreateWithoutAidInput[] | ConditionUncheckedCreateWithoutAidInput[]
    connectOrCreate?: ConditionCreateOrConnectWithoutAidInput | ConditionCreateOrConnectWithoutAidInput[]
    createMany?: ConditionCreateManyAidInputEnvelope
    connect?: ConditionWhereUniqueInput | ConditionWhereUniqueInput[]
  }

  export type ConditionUncheckedCreateNestedManyWithoutAidInput = {
    create?: XOR<ConditionCreateWithoutAidInput, ConditionUncheckedCreateWithoutAidInput> | ConditionCreateWithoutAidInput[] | ConditionUncheckedCreateWithoutAidInput[]
    connectOrCreate?: ConditionCreateOrConnectWithoutAidInput | ConditionCreateOrConnectWithoutAidInput[]
    createMany?: ConditionCreateManyAidInputEnvelope
    connect?: ConditionWhereUniqueInput | ConditionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ConditionUpdateManyWithoutAidNestedInput = {
    create?: XOR<ConditionCreateWithoutAidInput, ConditionUncheckedCreateWithoutAidInput> | ConditionCreateWithoutAidInput[] | ConditionUncheckedCreateWithoutAidInput[]
    connectOrCreate?: ConditionCreateOrConnectWithoutAidInput | ConditionCreateOrConnectWithoutAidInput[]
    upsert?: ConditionUpsertWithWhereUniqueWithoutAidInput | ConditionUpsertWithWhereUniqueWithoutAidInput[]
    createMany?: ConditionCreateManyAidInputEnvelope
    set?: ConditionWhereUniqueInput | ConditionWhereUniqueInput[]
    disconnect?: ConditionWhereUniqueInput | ConditionWhereUniqueInput[]
    delete?: ConditionWhereUniqueInput | ConditionWhereUniqueInput[]
    connect?: ConditionWhereUniqueInput | ConditionWhereUniqueInput[]
    update?: ConditionUpdateWithWhereUniqueWithoutAidInput | ConditionUpdateWithWhereUniqueWithoutAidInput[]
    updateMany?: ConditionUpdateManyWithWhereWithoutAidInput | ConditionUpdateManyWithWhereWithoutAidInput[]
    deleteMany?: ConditionScalarWhereInput | ConditionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ConditionUncheckedUpdateManyWithoutAidNestedInput = {
    create?: XOR<ConditionCreateWithoutAidInput, ConditionUncheckedCreateWithoutAidInput> | ConditionCreateWithoutAidInput[] | ConditionUncheckedCreateWithoutAidInput[]
    connectOrCreate?: ConditionCreateOrConnectWithoutAidInput | ConditionCreateOrConnectWithoutAidInput[]
    upsert?: ConditionUpsertWithWhereUniqueWithoutAidInput | ConditionUpsertWithWhereUniqueWithoutAidInput[]
    createMany?: ConditionCreateManyAidInputEnvelope
    set?: ConditionWhereUniqueInput | ConditionWhereUniqueInput[]
    disconnect?: ConditionWhereUniqueInput | ConditionWhereUniqueInput[]
    delete?: ConditionWhereUniqueInput | ConditionWhereUniqueInput[]
    connect?: ConditionWhereUniqueInput | ConditionWhereUniqueInput[]
    update?: ConditionUpdateWithWhereUniqueWithoutAidInput | ConditionUpdateWithWhereUniqueWithoutAidInput[]
    updateMany?: ConditionUpdateManyWithWhereWithoutAidInput | ConditionUpdateManyWithWhereWithoutAidInput[]
    deleteMany?: ConditionScalarWhereInput | ConditionScalarWhereInput[]
  }

  export type AidCreateNestedOneWithoutConditionsInput = {
    create?: XOR<AidCreateWithoutConditionsInput, AidUncheckedCreateWithoutConditionsInput>
    connectOrCreate?: AidCreateOrConnectWithoutConditionsInput
    connect?: AidWhereUniqueInput
  }

  export type AidUpdateOneRequiredWithoutConditionsNestedInput = {
    create?: XOR<AidCreateWithoutConditionsInput, AidUncheckedCreateWithoutConditionsInput>
    connectOrCreate?: AidCreateOrConnectWithoutConditionsInput
    upsert?: AidUpsertWithoutConditionsInput
    connect?: AidWhereUniqueInput
    update?: XOR<XOR<AidUpdateToOneWithWhereWithoutConditionsInput, AidUpdateWithoutConditionsInput>, AidUncheckedUpdateWithoutConditionsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ConditionCreateWithoutAidInput = {
    question: string
    field: string
    type: string
    operator: string
    value: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConditionUncheckedCreateWithoutAidInput = {
    id?: number
    question: string
    field: string
    type: string
    operator: string
    value: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConditionCreateOrConnectWithoutAidInput = {
    where: ConditionWhereUniqueInput
    create: XOR<ConditionCreateWithoutAidInput, ConditionUncheckedCreateWithoutAidInput>
  }

  export type ConditionCreateManyAidInputEnvelope = {
    data: ConditionCreateManyAidInput | ConditionCreateManyAidInput[]
    skipDuplicates?: boolean
  }

  export type ConditionUpsertWithWhereUniqueWithoutAidInput = {
    where: ConditionWhereUniqueInput
    update: XOR<ConditionUpdateWithoutAidInput, ConditionUncheckedUpdateWithoutAidInput>
    create: XOR<ConditionCreateWithoutAidInput, ConditionUncheckedCreateWithoutAidInput>
  }

  export type ConditionUpdateWithWhereUniqueWithoutAidInput = {
    where: ConditionWhereUniqueInput
    data: XOR<ConditionUpdateWithoutAidInput, ConditionUncheckedUpdateWithoutAidInput>
  }

  export type ConditionUpdateManyWithWhereWithoutAidInput = {
    where: ConditionScalarWhereInput
    data: XOR<ConditionUpdateManyMutationInput, ConditionUncheckedUpdateManyWithoutAidInput>
  }

  export type ConditionScalarWhereInput = {
    AND?: ConditionScalarWhereInput | ConditionScalarWhereInput[]
    OR?: ConditionScalarWhereInput[]
    NOT?: ConditionScalarWhereInput | ConditionScalarWhereInput[]
    id?: IntFilter<"Condition"> | number
    aidId?: IntFilter<"Condition"> | number
    question?: StringFilter<"Condition"> | string
    field?: StringFilter<"Condition"> | string
    type?: StringFilter<"Condition"> | string
    operator?: StringFilter<"Condition"> | string
    value?: StringFilter<"Condition"> | string
    order?: IntFilter<"Condition"> | number
    createdAt?: DateTimeFilter<"Condition"> | Date | string
    updatedAt?: DateTimeFilter<"Condition"> | Date | string
  }

  export type AidCreateWithoutConditionsInput = {
    title: string
    description: string
    region: string
    link: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AidUncheckedCreateWithoutConditionsInput = {
    id?: number
    title: string
    description: string
    region: string
    link: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AidCreateOrConnectWithoutConditionsInput = {
    where: AidWhereUniqueInput
    create: XOR<AidCreateWithoutConditionsInput, AidUncheckedCreateWithoutConditionsInput>
  }

  export type AidUpsertWithoutConditionsInput = {
    update: XOR<AidUpdateWithoutConditionsInput, AidUncheckedUpdateWithoutConditionsInput>
    create: XOR<AidCreateWithoutConditionsInput, AidUncheckedCreateWithoutConditionsInput>
    where?: AidWhereInput
  }

  export type AidUpdateToOneWithWhereWithoutConditionsInput = {
    where?: AidWhereInput
    data: XOR<AidUpdateWithoutConditionsInput, AidUncheckedUpdateWithoutConditionsInput>
  }

  export type AidUpdateWithoutConditionsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AidUncheckedUpdateWithoutConditionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConditionCreateManyAidInput = {
    id?: number
    question: string
    field: string
    type: string
    operator: string
    value: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConditionUpdateWithoutAidInput = {
    question?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    operator?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConditionUncheckedUpdateWithoutAidInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    operator?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConditionUncheckedUpdateManyWithoutAidInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    operator?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}