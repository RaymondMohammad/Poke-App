import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Trainer } from '../models/trainer';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../models/team';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PokemonInfo } from '../models/pokemonInfo';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./trainer-page.component.css']
})
export class TrainerPageComponent implements OnInit {
  private subscription: Subscription;
  selectedValueAdd: number;
  selectedValueRemove: number;
  closeResult: string;
  errors: string;
  value: string;
  user: any;
  trainerId: any;
  teams: Team[] = [];
  pokemon: PokemonInfo[] = [];
  teamName: string;
  account = true;
  trainer: Trainer;

  constructor(private auth: AuthService, private route: ActivatedRoute, public router: Router, public api: ApiService, private modalService: NgbModal) { }

  ngOnInit() {

    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.user = localStorage.getItem('user_id');
        this.getTrainer();
      });
  }

  getTrainer() {
    this.api.getTrainer(this.user).subscribe(res => {
      this.trainer = res;
      this.teams = res.teams;
      this.pokemon = res.pokemons;
      localStorage.setItem('trainer_id', String(res.trainerId));
      this.account = true;
    },
      errors => {
        this.errors = errors;
        this.account = false;
      }
    );
  }

  onSubmit() {
    this.api.createTrainer(this.user, this.value)
      .subscribe(res => {
        this.trainer = res;
        localStorage.setItem('trainer_id', String(res.trainerId));
        this.account = true;
      },
        errors => this.errors = errors
      );
  }

  addTeam() {
    this.api.addTeam(this.teamName)
      .subscribe(res => {
        this.teams.push(res);
      });
  }

  deleteTeam(id: number) {
    this.api.deleteTeam(id)
      .subscribe(res => {
        this.getTrainer();
      });
  }

  addPokemonToTeam(pokemonId: number, teamId: number) {
    this.api.addPokemonToTeam(teamId, pokemonId)
      .subscribe(res => {
        this.getTrainer();
      });

  }

  removePokemonFromTeam(pokemonId: number, teamId: number) {
    this.api.removePokemonFromTeam(teamId, pokemonId)
      .subscribe(res => {
        this.getTrainer();
      });
  }

  openModal(content) {
    this.modalService.open(content);
  }

}
