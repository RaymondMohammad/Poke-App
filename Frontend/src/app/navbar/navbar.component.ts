import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  value: string = '';

  constructor(private router: Router, private auth: AuthService, private pokemonService: PokemonService) { }

  ngOnInit() {
  }

  onSubmit() {
    //TODO: return error
    if (this.value != '' && !(Number(this.value) >= 802))
      this.router.navigate(['pokemon', this.value]);
    this.value = '';
  }

  login() {
    this.auth.login();
  }


}
