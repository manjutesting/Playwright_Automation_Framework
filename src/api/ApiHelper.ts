import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiHelper {
  private readonly request: APIRequestContext;
  private readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  private async parseResponse(response: APIResponse) {
    let status = response.status();
    let statusText = response.statusText();

    let body: any;
    try {
      body = await response.json();   // parse JSON
    } catch {
      body = await response.text();   // fallback if not JSON
    }

    return { status, statusText, body };
  }

  async get(endPoint: string, headers?: Record<string, string>) {
    let response = await this.request.get(`${this.baseURL}${endPoint}`, { headers });
    let parsed = await this.parseResponse(response);
    console.log(parsed.body, parsed.status, parsed.statusText);
    return parsed;
  }

  async post(endPoint: string, data: object, headers?: Record<string, string>) {
    let response = await this.request.post(`${this.baseURL}${endPoint}`, { headers, data });
    let parsed = await this.parseResponse(response);
    console.log(parsed.body, parsed.status, parsed.statusText);
    return parsed;
  }

  async put(endPoint: string, data: object, headers?: Record<string, string>) {
    let response = await this.request.put(`${this.baseURL}${endPoint}`, { headers, data });
    let parsed = await this.parseResponse(response);
    console.log(parsed.body, parsed.status, parsed.statusText);
    return parsed;
  }

  async delete(endPoint: string, headers?: Record<string, string>) {
    let response = await this.request.delete(`${this.baseURL}${endPoint}`, { headers });
    let status = response.status();
    let statusText = response.statusText();
    console.log(status, statusText);
    return { status, statusText }; // consistent return
  }
}
