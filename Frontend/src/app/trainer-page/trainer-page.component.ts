import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Trainer } from '../models/trainer';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css']
})
export class TrainerPageComponent implements OnInit {
  private subscription: Subscription;
  errors: string;
  value: string;
  user: any;
  trainerId: any;
  account = true;
  trainer: Trainer;

  constructor(private auth: AuthService, private route: ActivatedRoute, public router: Router, public api: ApiService) { }

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

}
