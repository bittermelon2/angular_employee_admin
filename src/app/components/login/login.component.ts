import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service'
import { LoginForm } from '../../models/Login.type'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validateForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, 
              public loginService: LoginService,
              private router: Router) {}

  ngOnInit(): void {
    // TODO: remove default value
    this.validateForm = this.fb.group({
      userName: ['leo', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
      password: ['123456', [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      //validation is of success
      console.log('submit', this.validateForm.value);

      const {userName, password} = this.validateForm.value
      const loginParams: LoginForm = {
         identifier: userName,
         password
      }
      this.loginService.login(loginParams).subscribe((res:any)=>{
         console.log('Login success', res)
         
         //save token
         localStorage.setItem('itcast-jwt', res.jwt)

         //jump to home page
         this.router.navigate(['/home'])
      })

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        //console.log('control', control)
        //validation is of failure
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


}
