declare type AsyncIterator<T> = {
    next(value?: any): Promise<IteratorResult<T>>;
};
export declare const createAsyncIterator: <T = any>(lazyFactory: Promise<AsyncIterator<T>>, filterFn: Function) => Promise<AsyncIterator<T>>;
export {};
