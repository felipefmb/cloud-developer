import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FeedItem } from '../feed/models/feed-item.model';
import { catchError, tap, map } from 'rxjs/operators';

const CREDENTIAL_HOST = environment.credentialHost;

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  token: string;

  constructor(private http: HttpClient) {
  }

  handleError(error: Error) {
    alert(error.message);
  }

  setAuthToken(token) {
    this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${token}`);
    this.token = token;
  }

  get(endpoint): Promise<any> {
    const url = `${CREDENTIAL_HOST}${endpoint}`;
    const req = this.http.get(url, this.httpOptions).pipe(map(this.extractData));

    return req
            .toPromise()
            .catch((e) => {
              this.handleError(e);
              throw e;
            });
  }

  post(endpoint, data): Promise<any> {
    const url = `${CREDENTIAL_HOST}${endpoint}`;
    return this.http.post<HttpEvent<any>>(url, data, this.httpOptions)
            .toPromise()
            .catch((e) => {
              this.handleError(e);
              throw e;
            });
  }

  /// Utilities
  private extractData(res: HttpEvent<any>) {
    const body = res;
    return body || { };
  }
}
