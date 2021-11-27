import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { UserService } from '@service/auth/user.service';
import { UserI } from '@model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  error: string = '';
  private subscription: Subscription = new Subscription();
  emailPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleLogin(): void {
    const user: UserI = {
      email: this.email?.value,
      password: this.password?.value,
    };
    this.subscription.add(
      this.userService.login(user).subscribe(
        (res) => {
          Swal.fire('Exito', 'Usuario ingreso con exito', 'success');
        },
        (err) => {
          console.log(`err`, err);
          Swal.fire('Error', err.error.text, 'error');
          return;
        }
      )
    );
  }

  get email() {
    return this.formLogin.get('email');
  }
  get password() {
    return this.formLogin.get('password');
  }
}
