export interface Middleware<T = any> {
  handle: (httpRequest: T) => Promise<T>
}
