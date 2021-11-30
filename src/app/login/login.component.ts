import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { CardService } from '../services/card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: boolean = false;

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(null),
      senha: new FormControl(null),
    });
  }
  onSubmit(): void {
    this.login();
  }

  login(): void {
    this.cardService
      .requestAuthorization(
        this.loginForm.value.login,
        this.loginForm.value.senha
      )
      .subscribe((token) => {
        if (token) {
          this.cardService.setAuth(token);
          this.router.navigateByUrl('/kanban-board');
          this.loginError = false;
        } else {
          this.loginError = true;
          this.router.navigateByUrl('/error');
          this.loginForm.reset();
          this.cardService.clearAuth();
        }
      });
  }

  logout(): void {
    this.router.navigateByUrl('/login');
    this.cardService.clearAuth();
  }
}
