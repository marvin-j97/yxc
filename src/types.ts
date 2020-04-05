export type VoidFunc = (val: any, key: string[], root: any) => void;
export type Mutation = (val: any, key: string[], root: any) => any;
export type Rule<T = any> = (
  val: T,
  key: string[],
  root: any
) => boolean | string;
