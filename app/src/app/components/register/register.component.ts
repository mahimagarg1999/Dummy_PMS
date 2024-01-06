import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerMsg: any = '';
  submitted: boolean = false;
  regMessage: any;
  RegisterForm: any = FormGroup
  constructor(private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.RegisterForm = this.formBuilder.group({
      fname: ['', Validators.required],
      // fname: ['', [Validators.required, Validators.pattern('^[a-z0-9_-]{8,15}$')]],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      standard: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      // role:['',Validators.required]
    });
    // this.onSubmit()
  }


  get fc() { return this.RegisterForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.RegisterForm.valid) {
      const loginData = this.RegisterForm.value;
      console.log("loginData", loginData);
      console.log("this.RegisterForm.value", this.RegisterForm.value);

      this.http.post<any>('http://localhost:5000/api/signup', loginData)
        .subscribe(
          response => {
            console.log(response);
            this.regMessage = response.msg
            this.snackbarService.openSnackBar(this.regMessage);
          },
          error => {
            console.error(error);
          }
        );
    }
  }
  navigateToLogin() {
    this.router.navigate(['/login']);

  }

}
