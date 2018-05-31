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
  value: string = '';
  error: string;

  constructor(private route: Router, private router: ActivatedRoute, private auth: AuthService, private pokemonService: PokemonService) { }

  ngOnInit() {
  }

  onSubmit() {
    //TODO: return error
    if (this.value != '' && !(Number(this.value) >= 802)) {
      if (isNaN(Number(this.value))) {
        this.value = this.value.toLowerCase();
      }
      this.route.navigate(['pokemon', this.value]);
      this.error = "";
    } else {
      this.error = "Pokemon not found";
    }
    this.value = '';
  }

  login() {
    this.auth.login();
  }


}
