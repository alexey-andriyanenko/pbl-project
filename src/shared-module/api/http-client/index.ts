import { HttpClient } from "./http-client";
import { apiUrl, authApiUrl } from "src/constants";

export { HttpClient };

console.log(apiUrl, authApiUrl);

export const authHttpClient = new HttpClient({ baseUrl: authApiUrl, anonymous: true });
export const httpClient = new HttpClient({
  baseUrl: apiUrl,
  interceptors: [
    // (request: XMLHttpRequest) => {
    //   if (request.status === 401 || request.status === 403) {
    //     localStorage.removeItem("token");
    //     window.location.href = "/sign-in";
    //   }
    // },
  ],
});
