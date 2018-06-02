import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private subscription: Subscription;
  trainerId: any;
  value: string = '';
  error: string;

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {

      });
  }

  onSubmit() {
    //TODO: return error
    if (this.value != '' && !(Number(this.value) >= 802)) {
      if (isNaN(Number(this.value))) {
        this.value = this.value.toLowerCase();
      }
      this.router.navigate(['pokemon', this.value]);
      this.error = "";
    } else {
      this.error = "Pokemon not found";
    }
    this.value = '';
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  pokedex() {
    if (localStorage.getItem('trainer_id')) {
      this.trainerId = localStorage.getItem('trainer_id');
      this.router.navigate(['trainer', this.trainerId, 'pokedex']);
    }

  }
}
