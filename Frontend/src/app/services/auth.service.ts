import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'hp8sKWt5V4i79Q68yYQMQ6HesKTssPx2',
    domain: 'login-webapp.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'http://localhost:50915/api/auth0',
    redirectUri: 'http://localhost:4200/signin',
    scope: 'openid profile isTrainer'
  });

  constructor(private http: Http, public router: Router) { }

  /* public request() {
    const url = 'https://login-webapp.eu.auth0.com/authorize?audience=http://localhost:50915/api/auth0&scope=openid profile isTrainer&response_type=id_token token&client_id=hp8sKWt5V4i79Q68yYQMQ6HesKTssPx2&nonce=fsd5f4sd51f5sd1f85sd';
    const headers = new Headers();
    const authToken = localStorage.getItem("id_token");
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);
    const options = new RequestOptions({
      headers: headers,
      body:
        {
          grant_type: 'client_credentials',
          client_id: 'hp8sKWt5V4i79Q68yYQMQ6HesKTssPx2',
          client_secret: 'CH8OgUp0cxn4F4jF1ADSC7ZZpnXV7Pj4bG0MMNsZEuLD3YF-RZlrdKY5aGym3xMJ',
          audience: 'http://localhost:50915/api/auth0'
        }
    });

    return this.http.get(url)
      .map(response => response.json())
      .catch(error => <any>console.log(error));
  } */

  public request() {

  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['']);
      } else if (err) {
        this.router.navigate(['']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

}
