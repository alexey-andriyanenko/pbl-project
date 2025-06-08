import { HttpMessage } from "./http-message";

type HttpClientInterceptor = (request: XMLHttpRequest) => void;

type HttpClientConfig = {
  baseUrl: string;
  anonymous?: boolean;
  interceptors?: HttpClientInterceptor[];
};

export class HttpClient {
  constructor(private _config: HttpClientConfig) {}

  public get anonymous(): boolean {
    return this._config.anonymous ?? false;
  }

  public get interceptors(): HttpClientInterceptor[] {
    return this._config.interceptors ?? [];
  }

  public static token: string | null = localStorage.getItem("token");

  public get<Response, Path extends string = string>(url: Path) {
    return HttpMessage.create<never, Response, "get", Path>(
      (this._config.baseUrl + url) as Path,
      "get",
      this,
    );
  }

  public post<Request, Response, Path extends string = string>(url: Path) {
    return HttpMessage.create<Request, Response, "post", Path>(
      (this._config.baseUrl + url) as Path,
      "post",
      this,
    );
  }

  public put<Request, Response, Path extends string = string>(url: Path) {
    return HttpMessage.create<Request, Response, "put", Path>(
      (this._config.baseUrl + url) as Path,
      "put",
      this,
    );
  }

  public delete<Response, Path extends string = string>(url: Path) {
    return HttpMessage.create<never, Response, "delete", Path>(
      (this._config.baseUrl + url) as Path,
      "delete",
      this,
    );
  }
}
