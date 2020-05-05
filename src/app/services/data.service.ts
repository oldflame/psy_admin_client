import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  sendGET(url: string, headers?: HttpHeaders) {
    return this.http.get(url, { headers, observe: "response" });
  }

  sendPOST(url: string, body?: any, headers?: HttpHeaders) {
    return this.http.post(url, body, { headers, observe: "response" });
  }

  sendPUT(url: string, body?: any, headers?: HttpHeaders) {
    return this.http.put(url, body, { headers, observe: "response" });
  }

  sendDELETE(url: string, headers?: HttpHeaders) {
    return this.http.delete(url, { headers, observe: "response" });
  }
}
