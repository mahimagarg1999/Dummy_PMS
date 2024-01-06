import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { ManageProjectComponent } from '../manage-project/manage-project.component';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-edit-admin-profile',
  templateUrl: './edit-admin-profile.component.html',
  styleUrls: ['./edit-admin-profile.component.css']
})
export class EditAdminProfileComponent {
  @Input() element: any;
  submittedUpdate: boolean = false;
  updateForm!: FormGroup;
  dataSource: any;

  domain_data: any;
  admin_id: any
  u_email: any;
  f_name: any;
  l_name: any;
  u_password: any;
  u_standard: any;
  u_dob: any;
  u_gender: any;
  u_address: any;
  u_city: any;
  u_state: any;
  u_role: any;
  u_status: any;
  id: any;
  email: string | null;
  editMsg:any = '';
  constructor(private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private http: HttpClient,
    // private dialogRef: MatDialogRef<EditAdminProfileComponent>,

    private router: Router,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.email = localStorage.getItem('email')
    this.admin_id = localStorage.getItem('id')
    // console.log("data.password_email", this.email)
    this.http.get<any>(`http://localhost:5000/api/get_user_by_email?email=${this.email}`).
      subscribe(
        (result) => {
         
          this.f_name = result.data.fname
          this.l_name = result.data.lname,
            this.u_email = result.data.email,
            this.u_password = result.data.password
          this.u_dob = result.data.dob,
            this.u_gender = result.data.gender,
            this.u_standard = result.data.standard,
            this.u_address = result.data.address,
            this.u_city = result.data.city,
            this.u_state = result.data.state,
            // this.u_role = result.data.role,
            // this.u_status = result.data.status

          this.updateForm.patchValue({
           
            fname: this.f_name,
            lname: this.l_name,
            email: this.u_email,
            password: this.u_password,
            dob: this.u_dob,
            gender: this.u_gender,
            standard: this.u_standard,
            address: this.u_address,
            city: this.u_city,
            state: this.u_state,
            // role: this.u_role,
            // status: this.u_status
          });
          console.log('API Response update:', result.data.fname);
          console.log('API Response update:', result.data.fname);
        },
        (error) => {
          console.error('API Error:', error);
        });
    this.updateForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: [''],
      email: [''],
      password: [''],
      dob: [''],
      gender: [''],
      standard: [''],
      address: [''],
      city: [''],
      state: [''],
      role: [''],
      status: [''],
      id: this.admin_id
    });
  }
  submitUpdateForm(): void {
    this.submittedUpdate = true;
    console.log(this.updateForm.value)
    if (this.updateForm.valid) {
      this.http.put<any>(`http://localhost:5000/api/signup`, this.updateForm.value).subscribe(
        (result) => {
          console.log('Admin UPDATE API Response:', result);
          this.snackbarService.openSnackBar('Edit Admin successful!');
          // this.router.navigate(['/manage_project']);
          // this.closeForm();
          // this.dialogRef.close(); // Close the dialog if dialogRef is defined
          // location.reload()
          // window.location.reload()

          // this.router.navigate(['/manage_project']);
        },
        (error) => {
          console.error('UPDATE API Error:', error);
        }

      );
    }
  }
  // closeForm(){
  //   this.dialogRef.close();
  // }
  // goBack(): void {
  //   this.location.back();
  // }
  goBack(): void {
      this.router.navigate(['/admin-page']);
    
  }

  // submitUpdateForm(): void {
  //   this.submittedUpdate = true;
  //   console.log(this.updateForm.value)
  //   if (this.updateForm.valid) {
  //     this.http.put<any>(`http://localhost:5000/api/manage-project`, this.updateForm.value).subscribe(
  //       (result) => {
  //         console.log('UPDATE API Response:', result);

  //       },
  //       (error) => {
  //         console.error('UPDATE API Error:', error);
  //       }
  //     );
  //   }
  // }

}
