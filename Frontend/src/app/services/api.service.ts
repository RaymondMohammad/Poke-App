import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Pokemon } from '../models/pokemon';
import { PokemonInfo } from '../models/pokemonInfo';
import { BaseService } from '../services/base.service';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Trainer } from '../models/trainer';

@Injectable()
export class ApiService extends BaseService {
  private baseApi: string = 'http://localhost:50915/api/';

  constructor(private http: Http) {
    super();
  }

  getTrainer(id: string): Observable<Trainer> {
    const authToken = localStorage.getItem('access_token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseApi + 'trainer/user/' + id, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  createTrainer(userId: string, name: string, caught: number = 0): Observable<Trainer> {
    let body = JSON.stringify({ name, caught, userId });
    const headers = new Headers();
    const authToken = localStorage.getItem('access_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseApi + 'trainer', body, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  addPokemon(pokemon: PokemonInfo) {
    //let body = JSON.stringify({ name, caught, userId });
    console.log(pokemon);
    const headers = new Headers();
    const authToken = localStorage.getItem('access_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseApi + 'trainer', pokemon, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  capturePokemon(id: number) {
    const trainerId = localStorage.getItem('trainer_id');
    const headers = new Headers();
    const authToken = localStorage.getItem('access_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseApi + 'trainer/' + trainerId + '/add/' + id, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
