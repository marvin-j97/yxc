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
    test(rule: Rule<T>): Handler;
    check(rule: Rule<T>): Handler;
    use(rule: Rule<T>): Handler;
    rule(rule: Rule<T>): Handler;
    custom(rule: Rule<T>): Handler;
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

declare abstract class AtomicHandler<T = string | number | boolean> extends BaseHandler {
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
    notEmpty(): StringHandler;
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
    any(pred: (v: unknown, k: string, obj: any) => boolean): this;
    all(pred: (v: unknown, k: string, obj: any) => boolean): this;
    some(pred: (v: unknown, k: string, obj: any) => boolean): this;
    every(pred: (v: unknown, k: string, obj: any) => boolean): this;
    partial(): this;
    arbitrary(): this;
    numKeys(num: number): this;
    validate(value: unknown, key?: string[], root?: unknown): IValidationResult[];
}

declare class NumberHandler extends AtomicHandler<number> {
    constructor();
    natural(opts?: Partial<{
        withZero: boolean;
    }>): NumberHandler;
    int(): NumberHandler;
    integer(): NumberHandler;
    negative(opts?: Partial<{
        withZero: boolean;
    }>): NumberHandler;
    positive(opts?: Partial<{
        withZero: boolean;
    }>): NumberHandler;
    between(min: number, max: number): NumberHandler;
    min(min: number): NumberHandler;
    max(max: number): NumberHandler;
}

declare class BooleanHandler extends AtomicHandler<boolean> {
    constructor();
    true(): BooleanHandler;
    false(): BooleanHandler;
}

declare class ArrayHandler<T extends Handler> extends BaseHandler {
    _type: Array<Infer<T>>;
    _handler: Handler;
    constructor(handler: T);
    any(pred: (v: T, i: number, arr: T[]) => boolean): ArrayHandler<T>;
    all(pred: (v: T, i: number, arr: T[]) => boolean): ArrayHandler<T>;
    some(pred: (v: T, i: number, arr: T[]) => boolean): ArrayHandler<T>;
    every(pred: (v: T, i: number, arr: T[]) => boolean): ArrayHandler<T>;
    length(num: number): ArrayHandler<T>;
    len(num: number): ArrayHandler<T>;
    notEmpty(): ArrayHandler<T>;
    between(min: number, max: number): ArrayHandler<T>;
    min(min: number): ArrayHandler<T>;
    max(max: number): ArrayHandler<T>;
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
export { ISchemaDefinition, IValidationResult, Infer, Rule, createExecutableSchema, createSchema, is };
