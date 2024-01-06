import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { ManageProjectComponent } from '../manage-project/manage-project.component';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-update-dialog-box',
  templateUrl: './update-dialog-box.component.html',
  styleUrls: ['./update-dialog-box.component.css']
})
export class UpdateDialogBoxComponent {
  @Input() element: any;
  submittedUpdate: boolean = false;
  updateForm!: FormGroup;
  dataSource: any;
  pname: any;
  desc: any;
  start_dt: any;
  end_dt: any;
  id: any;
  pmanager: any;
  teamMembers: any;
  domain_data: any;constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<UpdateDialogBoxComponent>,

    private router: Router,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.update_id,
    console.log("id---",this.id)
    console.log("data.update_id", data.update_id)
    this.http.get<any>(`http://localhost:5000/api/manage-project/id?id=${data.update_id}`).
      subscribe(
        (result) => {
          this.pname = result.data.project_name
          this.desc = result.data.description
          this.start_dt = this.datePipe.transform(new Date(), result.data.startDate, 'yyyy-MM-dd');
          this.end_dt = this.datePipe.transform(new Date(),result.data.endDate, 'yyyy-MM-dd');
          this.pmanager = result.data.project_manager
          this.teamMembers = result.data.team_members
          this.domain_data = result.data.domain

          this.updateForm.patchValue({
            project_name: this.pname,
            description: this.desc,
            startDate: this.start_dt,
            endDate: this.end_dt,
            project_manager: this.pmanager,
            team_members: this.teamMembers,
            domain: this.domain_data,
            // Patch other form controls if needed
          });

          console.log('API Response update:', result.data.project_name);


          console.log('API Response update:', result.data.project_name);
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    this.updateForm = this.formBuilder.group({
      project_name: ['', Validators.required],
      description: [''],
      startDate: [''],
      endDate: [''],
      project_manager: [''],
      team_members: [''],
      domain: [''],
      role:[''],
      id: this.id
    });       
  }
  submitUpdateForm(): void {
    this.submittedUpdate = true;
    console.log(this.updateForm.value)
    if (this.updateForm.valid) {
      this.http.put<any>(`http://localhost:5000/api/manage-project`, this.updateForm.value).subscribe(
        (result) => {
          console.log('UPDATE API Response:', result);
          // this.router.navigate(['/manage_project']);
          // this.closeForm();
          this.dialogRef.close(); // Close the dialog if dialogRef is defined
          // location.reload()
          window.location.reload()

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
    // window.location.reload()

    this.dialogRef.close(); // Close the dialog
    // Additional logic if needed after closing the dialog...
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
