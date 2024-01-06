
import { HttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
 import { Router } from '@angular/router';
 import { HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  msg:any;
  error:any
  changePasswordForm: FormGroup;
  forgetPasswordForm:any= FormGroup;
  submitted = false;
  showLoginCodeInput: boolean = false;
  showSignupCodeInput: boolean = false;
  showLoginMsg: any = '';
  showErrorMsg: any = '';
  userRole: any = '';
  authLoad: boolean = false;
  isToggled:any =''
  useremail=localStorage.getItem("email")
  id: any;
  email: any;
  data: any;
  current_password:any;
  new_password:any;
  confirm_Password:any;
  passwordMismatch: any = false;
  u_email:any
  constructor(private fb: FormBuilder,private router: Router,
    private http:HttpClient,
    // @Inject(MAT_DIALOG_DATA) public data: any
    )
  {
  
    {
      this.email = localStorage.getItem('email')
      // console.log("data.password_email", this.email)
      this.http.get<any>(`http://localhost:5000/api/get_user_by_email?email=${this.email}`).
        subscribe(
          (result) => {
            console.log("email",this.email)
            this.u_email = result.data.email
            this.current_password = result.data.currentPassword
            this.new_password = result.data.newPassword       
            this.confirm_Password = result.data.confirmPassword
            this.changePasswordForm.patchValue({
              email :this.u_email ,
              currentPassword :this.current_password ,
              newPassword :this.new_password   ,      
              confirmPassword :this.confirm_Password 
              // Patch other form controls if needed
            });
  
            console.log('API Response update:', result.data.currentPassword);
  
  
            console.log('API Response update:', result.data.newPassword);
          },
          (error) => {
            console.error('API Error:', error);
          }
        );
      this.changePasswordForm = this.fb.group({
          // email: ['', [Validators.required, Validators.email]],
          newPassword: ['', [Validators.required,]],
      confirmPassword: ['', [Validators.required,]],
      currentPassword: ['', [Validators.required,]],
      email:this.email
    
      });
    }

  }
  onsubmit(): void {
    this.submitted = true;
    console.log(this.changePasswordForm.value)
    if (this.changePasswordForm.valid) {
      this.http.put<any>(`http://localhost:5000/api/change_password`, this.changePasswordForm.value).subscribe(
        (result) => {
          console.log('UPDATE API Response:', result);
          if(result.success==false  )
          {
            // console.log("hii")
            this.passwordMismatch=false;
            this.error=result.msg;

          }
          else{
            this.passwordMismatch=true;
            this.error=result.msg;

          }
        },
        (error) => {
          console.error('UPDATE API Error:', error);
        }
        
      ); 
    }
  }
  onInputChange() {
    this.submitted = false;
  const password = this.changePasswordForm.get('newPassword')?.value;
  const cpassword = this.changePasswordForm.get('confirmPassword')?.value;
  this.passwordMismatch = password !== cpassword;

  if(this.passwordMismatch)
  {
    // this.submitted = true;
  
    this.passwordMismatch='password mis match'
  }}
  get fc() {
    const retvalue=this.changePasswordForm.controls;
    console.log(retvalue)
    return this.changePasswordForm.controls;
  }
  // forgetToggle(){
  //   this.isToggled = true;
  // }
  // forgetPassword(){

  // }
}
























// =========================================================
// import { HttpClient } from '@angular/common/http';
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
//  import { Router } from '@angular/router';
//  import { HttpHeaders } from '@angular/common/http';

// @Component({
//   selector: 'app-change-password',
//   templateUrl: './change-password.component.html',
//   styleUrls: ['./change-password.component.css']
// })
// export class ChangePasswordComponent {
//   msg:any;
//   changePasswordForm: FormGroup;
//   submitted = false;
//   showLoginCodeInput: boolean = false;
//   showSignupCodeInput: boolean = false;
//   showLoginMsg: any = '';
//   showErrorMsg: any = '';
//   userRole: any = '';
//   authLoad: boolean = false;
//   useremail=localStorage.getItem("email")
//   constructor(private fb: FormBuilder,private router: Router)
//   {
  
//     this.changePasswordForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       newPassword: ['', [Validators.required,]],

//       confirmPassword: ['', [Validators.required,]],
//       currentPassword: ['', [Validators.required,]],

    
  
//     });
//   }
//   currentPassword: any;
//   newPassword: any;
//   confirmNewPassword: any;
//   submittedUpdate:boolean = false;
//   // ngOnInit(): void {    console.log("hii")

//   //   // this.createForm()
//   //   // this.changePassword()
//   //   const useremail=localStorage.getItem('email')
//   //   console.log("useremail=>",useremail)
//   //   this.changePassword();
//   // }

//   onsubmit() {
//     console.log("changePasswordForm",this.changePasswordForm.value);
//     this.submitted = true;
//     const data={
//       "email":this.changePasswordForm.get('email')?.value,
//       "password":this.changePasswordForm.get('password')?.value,
//     }
     
// //     this.userservice.LoginUser(data).subscribe(
// //     (response) => {
// //       this.authservice.setToken(response.token);
// //       // localStorage.setItem('authToken', response.token);
// //       console.log('API Response:', response);

// //       //  const tokent = localStorage.setItem(response.tokent);
// //         this.userservice.setUserDetails(data.email).subscribe( (data:any) => {
// //           const name=data.name
// //           const id=data._id
// //           this.router.navigateByUrl(`/uhome/${name}/${id}`);
// // })
// //     },
// //     (error) => {
// //       this.msg="Incorrect Credentials"

// //       console.error('API Error:', error);
// //       // Handle errors as needed
// //     }
// //   )
//   }
//   get fc() {
//     const retvalue=this.changePasswordForm.controls;
//     console.log(retvalue)
//     return this.changePasswordForm.controls;
//   }
// }