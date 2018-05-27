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
export class PokemonService extends BaseService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/';
  private baseApi: string = 'http://localhost:50915/api/';
  private cache$: Observable<Array<Pokemon>>;
  private cache2$: Observable<Array<Pokemon>>;
  private cacheInfo: Observable<PokemonInfo>;
  private cacheUrl: Array<String> = [];
  private cache: string;
  private counter: number = 0;
  private test;
  url: string;

  constructor(private http: Http, private auth: AuthService) {
    super();
  }

  getAllTrainers(): Observable<Trainer[]> {
    /* const headers = new Headers();
    const authToken = localStorage.getItem("token");
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);
    const options = new RequestOptions({ headers: headers }); */

    return this.http.get(this.baseApi + 'trainer')
      .map((response) => { return <Trainer[]>response.json() })
      .catch(this.handleError);
  }

  getAllPokemon(offset: number, limit: number): Observable<Pokemon[]> {
    if (offset >= 792) {
      this.url = this.baseUrl + 'pokemon/' + '?offset=' + offset + '&limit=' + 10;
    } else {
      this.url = this.baseUrl + 'pokemon/' + '?offset=' + offset + '&limit=' + limit;
    }

    return this.http.get(this.url)
      .map(response => response.json().results)
      .map(items => items.map((item, idx) => {
        const id: number = idx + offset + 1;

        return {
          name: item.name,
          // sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/' + id + '.png',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png',
          id
        };
      }))
      .shareReplay(1)
      .catch(this.handleError)
  }

  /* getPokemonById(id: number): Observable<PokemonInfo> {
    if (!localStorage.getItem('pokemonInfo')) {
      this.cacheInfo = this.http.get(this.baseUrl + id)
        .map(response => response.json())
        .shareReplay(1)
        .catch(this.handleError);
    }
    return Observable.of(JSON.parse(localStorage.getItem('pokemonInfo')))
  } */

  getPokemonById(id: number): Observable<PokemonInfo> {
    return this.http.get(this.baseUrl + 'pokemon/' + id).map(response => response.json())
      .shareReplay(1)
      .catch(this.handleError);
  }
}
