import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RoleService } from 'src/app/services1/role.service';
import { SnackbarService } from '../../services/snackbar.service';
import { AuthServiceService } from 'src/app/services1/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any = FormGroup;
  forgetPasswordForm: any = FormGroup;
  title = "login";
  submitted: boolean = false;
  forgetSubmitted: boolean = false;

  msgAdmin: any = '';
  msgUser: any = '';
  msgUnknown: any = '';
  errorMsg: any = ''
  getEmail: any = ''
  id: any;
  istoggle: any = '';
  forgetError: any = '';
  forgetSubmit: any = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private roleService: RoleService,
    private snackbarService: SnackbarService,
    private authService: AuthServiceService
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // email: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],

    });
    this.createForgetForm();
  }
  get fc() { return this.loginForm.controls; }
  get fc1() { return this.forgetPasswordForm.controls; }

  createForgetForm() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],

    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.http.post<any>('http://localhost:5000/api/login', loginData)
        .subscribe(
          response => {
            console.log("response", response);
            this.getEmail = response.user.email;
            this.id = response.user._id;
            localStorage.setItem('id', this.id)

            localStorage.setItem('token', response.authToken)

            this.getDataByEmail();
          },
          error => {
            console.error(error);
            if (error.status === 401) {
              this.errorMsg = "Authentication failed. Please check your credentials.";
            } else {
              this.errorMsg = "An unexpected error occurred. Please try again later.";
            }
          }
        );
    }
  }
  // getDataByEmail() {
  //   this.submitted = true;
  //   localStorage.setItem("email", this.getEmail)
  // //  const header= this.authService.tokenFun();
  //   this.http.get<any>(`http://localhost:5000/api/get_user_by_email?email=${this.getEmail}`)
  //     .subscribe(
  //       res => {
  //         console.log("responce inner", res)
  //         const role = res.data.role;
  //         console.log("role---", role)
  //         // Redirect based on the role
  //         if (role === 'user') {
  //           this.roleService.setRole('user')
  //           // this.router.navigate([`/navbar/${role}`]);
  //           this.router.navigate(['/user']);
  //           this.msgUser = "User Login Successful.... ";
  //         } else if (role === 'admin') {
  //           this.roleService.setRole('admin')
  //           // this.router.navigate([`/navbar/${role}`]);
  //           this.router.navigate(['/admin-page']);
  //           this.msgAdmin = "Admin Login Successful.... ";

  //         } else {
  //           // Handle other roles if needed
  //           this.errorMsg = "role not defined"
  //           console.log("unknown role else ")
  //           console.error('Unknown role:', role);
  //           this.msgUnknown = "Role information not found in the response. ";
  //         }

  //       }
  //     )
  // }
  getDataByEmail() {
    this.submitted = true;
    localStorage.setItem("email", this.getEmail)
    this.authService.tokenFun(this.getEmail).subscribe((res: any) => {

      console.log("responce inner", res)
      const role = res.data.role;
      console.log("role---", role)
      // Redirect based on the role
      if (role === 'user') {
        this.roleService.setRole('user')
        // this.router.navigate([`/navbar/${role}`]);
        this.router.navigate(['/user']);
        this.msgUser = "User Login Successful.... ";
      } else if (role === 'admin') {
        this.roleService.setRole('admin')
        // this.router.navigate([`/navbar/${role}`]);
        this.router.navigate(['/admin-page']);
        this.msgAdmin = "Admin Login Successful.... ";

      } else {
        // Handle other roles if needed
        this.errorMsg = "role not defined"
        console.log("unknown role else ")
        console.error('Unknown role:', role);
        this.msgUnknown = "Role information not found in the response. ";
      }

    }
    )

  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  forgetPassword() {
    this.forgetSubmitted = true;
    if (this.forgetPasswordForm.valid) {
      const forgetData = this.forgetPasswordForm.value;
      // localStorage.setItem("email",this.getEmail)
      this.http.put<any>('http://localhost:5000/api/send-mail-forget-password', forgetData)
        .subscribe(
          res => {
            if (res.success == false) {
              // console.log("hii")
              this.forgetSubmit = false;
              this.forgetError = res.msg;
              this.snackbarService.openSnackBar(this.forgetError);
              console.log("false", this.forgetError)

            }
            else {
              this.forgetSubmit = true;
              this.forgetError = res.msg;
              this.snackbarService.openSnackBar(this.forgetError);

              console.log("true", this.forgetError)

            }

          }
        )
    }
  }

  toggleForgetPassword() {
    this.istoggle = true
  }
}
