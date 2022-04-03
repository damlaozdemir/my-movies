import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@model/user.model';
import { AuthService } from 'app/services/auth.service';
import * as md5 from 'md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  passwordEyeClosed: boolean = true;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    const user = new User(this.form.value.username, md5(this.form.value.password));
    this.authService.login(user);
  }

  togglePassword(): void {
    this.passwordEyeClosed = !this.passwordEyeClosed;
  }
}
