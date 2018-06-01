import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { ApiService } from './api.service';
import { Trainer } from '../models/trainer';

@Injectable()
export class AuthService {
  userProfile: any;
  user: any;
  trainer: Trainer;
  errors: string;

  auth0 = new auth0.WebAuth({
    clientID: 'hp8sKWt5V4i79Q68yYQMQ6HesKTssPx2',
    domain: 'login-webapp.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'http://localhost:50915/api/auth0',
    redirectUri: 'http://localhost:4200/',
    scope: 'openid profile isTrainer'
  });

  constructor(private http: Http, public router: Router, public api: ApiService) { }

  public login(): void {
    this.auth0.authorize();
  }

  public getTrainer() {
    if (this.user && !this.trainer) {
      this.api.getTrainer(this.user).subscribe(res => {
        this.trainer = res;
        localStorage.setItem('trainer_id', String(res.trainerId));
        this.router.navigate(['']);
      },
        errors => this.router.navigate(['trainer'])
      );
    }
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);

        this.getProfile((err, profile) => {
          this.userProfile = profile;
          this.user = profile.sub.substr((profile.sub.indexOf("|") + 1));
          localStorage.setItem('user_id', this.user);
          this.router.navigate(['trainer']);
          //this.getTrainer();
        });

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
    localStorage.removeItem('user_id');
    localStorage.removeItem('trainer_id');
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
