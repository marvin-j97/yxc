declare type Rule<T = any> = (val: T, key: string[], root: any) => boolean | string;
interface IValidationResult {
    key: string[];
    message: string | boolean;
}
interface ISchemaDefinition {
    [key: string]: Handler;
}
declare type Infer<T extends Handler> = T["_type"];

declare abstract class Handler<T = any> {
    _type: any;
    protected _rules: Rule<T>[];
    test(rule: Rule<T>): this;
    check(rule: Rule<T>): this;
    use(rule: Rule<T>): this;
    rule(rule: Rule<T>): this;
    custom(rule: Rule<T>): this;
    validate(value: unknown, key?: string[], root?: unknown): IValidationResult[];
}

declare class OptionalHandler extends Handler {
    _type: undefined;
    constructor();
    nullable(): UnionHandler<[this, NullHandler]>;
}

declare class NullHandler extends Handler {
    _type: null;
    constructor();
    optional(): UnionHandler<[this, OptionalHandler]>;
}

declare class UnionHandler<T extends [Handler, Handler, ...Handler[]]> extends Handler {
    _type: T[number]["_type"];
    nullable(): UnionHandler<[this, NullHandler]>;
    optional(): UnionHandler<[this, OptionalHandler]>;
    constructor(handlers: T);
}

declare abstract class BaseHandler<T = any> extends Handler<T> {
    nullable(): UnionHandler<[this, NullHandler]>;
    optional(): UnionHandler<[this, OptionalHandler]>;
}

declare abstract class AtomicHandler<T = string | number | boolean> extends BaseHandler<T> {
    _type: T;
    equals(expected: T): this;
    eq(expected: T): this;
    equal(expected: T): this;
    enum(values: T[]): this;
}

declare class StringHandler extends AtomicHandler<string> {
    constructor();
    prefix(substr: string): this;
    suffix(substr: string): this;
    endsWith(substr: string): this;
    beginsWith(substr: string): this;
    startsWith(substr: string): this;
    email(): this;
    numeric(): this;
    alphanum(allowSpaces?: boolean): this;
    regex(regexp: RegExp): this;
    match(regexp: RegExp): this;
    pattern(regexp: RegExp): this;
    length(num: number): this;
    len(num: number): this;
    notEmpty(): this;
    between(min: number, max: number): this;
    min(min: number): this;
    max(max: number): this;
}

declare class ObjectHandler<T extends Record<string, Handler>> extends BaseHandler {
    _type: {
        [K in keyof T]: Infer<T[K]>;
    };
    private _keys;
    private _arbitrary;
    private _partial;
    constructor(keys?: T);
    any(pred: (v: unknown, k: string, obj: {
        [K in keyof T]: Infer<T[K]>;
    }) => boolean): this;
    all(pred: (v: unknown, k: string, obj: {
        [K in keyof T]: Infer<T[K]>;
    }) => boolean): this;
    some(pred: (v: unknown, k: string, obj: {
        [K in keyof T]: Infer<T[K]>;
    }) => boolean): this;
    every(pred: (v: unknown, k: string, obj: {
        [K in keyof T]: Infer<T[K]>;
    }) => boolean): this;
    partial(): this;
    arbitrary(): this;
    numKeys(num: number): this;
    validate(value: unknown, key?: string[], root?: unknown): IValidationResult[];
}

declare class NumberHandler extends AtomicHandler<number> {
    constructor();
    natural(opts?: Partial<{
        withZero: boolean;
    }>): this;
    int(): this;
    integer(): this;
    negative(opts?: Partial<{
        withZero: boolean;
    }>): this;
    positive(opts?: Partial<{
        withZero: boolean;
    }>): this;
    between(min: number, max: number): this;
    min(min: number): this;
    max(max: number): this;
}

declare class BooleanHandler extends AtomicHandler<boolean> {
    constructor();
    true(): this;
    false(): this;
}

declare class ArrayHandler<T extends Handler> extends BaseHandler {
    _type: Array<Infer<T>>;
    _handler: Handler;
    constructor(handler: T);
    any(pred: (v: Infer<T>, i: number, arr: Array<Infer<T>>) => boolean): this;
    all(pred: (v: Infer<T>, i: number, arr: Array<Infer<T>>) => boolean): this;
    some(pred: (v: Infer<T>, i: number, arr: Array<Infer<T>>) => boolean): this;
    every(pred: (v: Infer<T>, i: number, arr: Array<Infer<T>>) => boolean): this;
    length(num: number): this;
    len(num: number): this;
    notEmpty(): this;
    between(min: number, max: number): this;
    min(min: number): this;
    max(max: number): this;
    validate(value: unknown, key?: string[], root?: unknown): IValidationResult[];
}

declare class AnyHandler extends AtomicHandler<any> {
    constructor();
    truthy(): this;
    falsy(): this;
}

declare class RecordHandler<T extends Handler> extends BaseHandler {
    _type: Record<string, Infer<T>>;
    private _schema;
    constructor(schema: T);
    any(pred: (v: Infer<T>, k: string, obj: any) => boolean): this;
    all(pred: (v: Infer<T>, k: string, obj: any) => boolean): this;
    some(pred: (v: Infer<T>, k: string, obj: any) => boolean): this;
    every(pred: (v: Infer<T>, k: string, obj: any) => boolean): this;
    numKeys(num: number): this;
    validate(value: unknown, key?: string[], root?: unknown): IValidationResult[];
}

declare function createExecutableSchema(handler: Handler): (value: unknown) => {
    ok: boolean;
    errors: IValidationResult[];
};
declare function createSchema(def: ISchemaDefinition): (value: unknown) => {
    ok: boolean;
    errors: IValidationResult[];
};
declare function is<T extends Handler>(value: unknown, handler: T): value is Infer<T>;

declare const _default: {
    object: <T extends ISchemaDefinition>(schema?: T | undefined) => ObjectHandler<T>;
    record: <T_1 extends Handler<any>>(schema: T_1) => RecordHandler<T_1>;
    string: () => StringHandler;
    number: () => NumberHandler;
    boolean: () => BooleanHandler;
    array: <T_2 extends Handler<any>>(handler: T_2) => ArrayHandler<T_2>;
    any: () => AnyHandler;
    union: <T_3 extends [Handler<any>, Handler<any>, ...Handler<any>[]]>(handlers: T_3) => UnionHandler<T_3>;
    null: () => NullHandler;
    optional: () => OptionalHandler;
    undefined: () => OptionalHandler;
};

export default _default;
export { AnyHandler, ArrayHandler, BooleanHandler, Handler, ISchemaDefinition, IValidationResult, Infer, NullHandler, NumberHandler, ObjectHandler, OptionalHandler, RecordHandler, Rule, StringHandler, UnionHandler, createExecutableSchema, createSchema, is };
