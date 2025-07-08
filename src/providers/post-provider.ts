import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostProvider {
  // URL server
  server: string = 'http://localhost/alumni/';

  constructor(public http: HttpClient) {}

  postData(body: any, file: string): Observable<any> {
    let type = 'application/json; charset=utf-8';
    let headers = new HttpHeaders({ 'Content-Type': type });

    return this.http.post(this.server + file, JSON.stringify(body), {
      headers: headers,
    }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}