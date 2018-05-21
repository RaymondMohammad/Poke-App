import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonInfo } from '../models/pokemonInfo';
import { map } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';

@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemon-page.component.html',
  styleUrls: ['./pokemon-page.component.css']
})
export class PokemonPageComponent implements OnInit {

  private subscription: Subscription;
  pokemonInfo: PokemonInfo = new PokemonInfo();
  id: number;
  errors: string;
  isLoading: boolean = false;
  pokemon: any;
  pokemonImg: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/';

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private cacheService: CacheService) { }

  ngOnInit() {
    this.pokemonInfo = JSON.parse(localStorage.getItem('pokemonInfo'));
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.pokemonImg += this.id + '.png';
        //this.getPokemon()
        this.pokemon = this.cacheService.get(String(this.id), this.pokemonService.getPokemonById(this.id));
        this.pokemon.subscribe(res => this.pokemonInfo = res);
      });

  }

  getPokemon() {
    this.isLoading = true;
    this.pokemonService.getPokemonById(this.id)
      .finally(() => this.isLoading = false)
      .subscribe(
        res => {
          console.log(res);
          this.pokemonInfo = res;
          localStorage.setItem('pokemonInfo', JSON.stringify(this.pokemonInfo));
          console.log(this.pokemonInfo);

        },
        errors => this.errors = errors
      );
  }
}
