import { ExtractParams } from "./http-message.types";
import { HttpClient } from "./http-client";
import { httpClient } from "./index.ts";

export class HttpMessage<
  RequestBody,
  ResponseBody,
  Method extends "get" | "post" | "put" | "delete",
  Path extends string = string,
> {
  private _request: XMLHttpRequest = new XMLHttpRequest();

  private constructor(
    private _url: string,
    private _method: Method,
    private _httpClient: HttpClient,
  ) {}

  public static create<
    Request,
    Response,
    Method extends "get" | "post" | "put" | "delete",
    Path extends string = string,
  >(
    url: Path,
    method: Method,
    httpClient: HttpClient,
  ): HttpMessage<Request, Response, Method, Path> {
    return new HttpMessage<Request, Response, Method, Path>(url, method, httpClient);
  }
  public setSearchParams(qp: Record<string, string | number>): Omit<this, "setSearchParams"> {
    const params = new URLSearchParams(this._stringifySearchParams(qp));
    this._url += `?${params.toString()}`;

    return this;
  }

  public setRouteParams(params: ExtractParams<Path>): Omit<this, "setRouteParams"> {
    const paramKeys = Object.keys(params);

    for (const key of paramKeys) {
      // @ts-expect-error TS cannot infer params type here
      this._url = this._url.replace(`:${key}`, params[key]);
    }

    return this;
  }

  public send<T extends Method>(
    body?: T extends "get" | "delete" ? never : RequestBody,
    headers?: Record<string, string>,
  ): Promise<ResponseBody> {
    return new Promise((resolve, reject) => {
      this._request.open(this._method, this._url);

      this._request.setRequestHeader("Content-Type", "application/json");

      if (!this._httpClient.anonymous)
        this._request.setRequestHeader("Authorization", `Bearer ${HttpClient.token}`);

      if (headers) {
        for (const key in headers) {
          this._request.setRequestHeader(key, headers[key]);
        }
      }

      this._request.onload = () => {
        httpClient.interceptors.forEach((interceptor) => {
          interceptor(this._request);
        });

        if (this._request.status >= 200 && this._request.status < 300) {
          const responseText = this._request.responseText ? this._request.responseText : "{}";
          resolve(JSON.parse(responseText));
        } else {
          try {
            const result = JSON.parse(this._request.responseText);
            reject(result);
          } catch (e) {
            console.error("Error parsing response:", e);
            reject(this._request);
          }
        }
      };

      this._request.onerror = () => {
        try {
          const result = JSON.parse(this._request.responseText);
          reject(result);
        } catch (e) {
          console.error("Error parsing error response:", e);
          reject(this._request);
        }
      };

      this._request.send(JSON.stringify(body));
    });
  }

  private _stringifySearchParams(params: Record<string, string | number>): Record<string, string> {
    return Object.keys(params).reduce(
      (acc, key) => {
        if (params[key] === undefined || params[key] === null) return acc;
        acc[key] = String(params[key]);
        return acc;
      },
      {} as Record<string, string>,
    );
  }
}
