import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  changeForgetPasswordForm: any = FormGroup;
  error: any;
  submittedUpdate: any = false;
  email: any;
  passwordMismatch: any;
  passwordError: any;
  constructor(private fb: FormBuilder, private router: Router,
    private http: HttpClient,
    private snackbarService: SnackbarService
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.email = localStorage.getItem('email')
    this.changeForgetPasswordForm = this.fb.group({
      // email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required,]],
      confirmPassword: ['', [Validators.required,]],
      email: this.email

    });
  }


  onSubmit(): void {
    this.submittedUpdate = true;
    console.log(this.changeForgetPasswordForm.value)
    if (this.changeForgetPasswordForm.valid) {
      this.http.put<any>(`http://localhost:5000/api/forget-change-password`, this.changeForgetPasswordForm.value).subscribe(
        (result) => {
          console.log('Admin UPDATE API Response:', result);
          // this.snackbarService.openSnackBar('Edit Admin successful!');
          if (result.success == false) {
            // console.log("hii")
            this.passwordMismatch = false;
            this.passwordError = result.msg;
            this.snackbarService.openSnackBar(this.passwordError);
          }
          else {
            this.passwordMismatch = true;
            this.passwordError = result.msg;
            this.snackbarService.openSnackBar(this.passwordError);
          }

        },
        (error) => {
          console.error('UPDATE API Error:', error);
        }

      );
    }
  }
}
