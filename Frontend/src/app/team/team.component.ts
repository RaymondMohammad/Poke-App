import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Trainer } from '../models/trainer';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  trainers: Trainer[] = [];

  constructor(private pokemonService: PokemonService, private auth: AuthService) { }

  ngOnInit() {
  }

  getTrainers() {
    this.pokemonService.getAllTrainers()
      .subscribe(res => this.trainers = this.trainers.concat(res));//this.trainers.concat(res)

    console.log(localStorage.getItem("access_token"));
    console.log(localStorage.getItem("id_token"));
  }

}
