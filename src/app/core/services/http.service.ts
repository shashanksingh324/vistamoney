import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = 'https://uat.theworldwidecard.net';

  constructor(
    private http: HttpClient
  ) { }


  get(url: string) {
    const finalUrl = `${this.baseUrl}/${url}`;
    return this.http.get(url);
  }

  post() {

  }

  put() {

  }

  delete() {

  }

}
