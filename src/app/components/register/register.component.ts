import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserI }              from '@model/user.model';
import Swal from 'sweetalert2';

import { UserService } from '@service/auth/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  error:string= "";
  private subscription: Subscription = new Subscription();
  emailPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  formRegister = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', Validators.required)
  })

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required]
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  handleRegister(): void{
    console.log(`this.name?.value`, this.name?.value)
    const user: UserI = {
      name: this.name?.value,
      email: this.email?.value,
      password: this.password?.value
    }
    console.log(`user`, user)
    this.subscription.add(
      this.userService.register(user)
      .subscribe(
        (res => {
          Swal.fire('Exito', 'Usuario registrado con exito', 'success')
        }),
        (err => {
          Swal.fire('Error', err.error.text, 'error')
          return
        })
      )
    )
  }

  get name(){
    return this.formRegister.get('name')
  }

  get email(){
    return this.formRegister.get('email')
  }
  get password(){
    return this.formRegister.get('password')
  }
  
}
