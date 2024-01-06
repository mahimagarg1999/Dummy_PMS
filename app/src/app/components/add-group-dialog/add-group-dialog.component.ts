import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GroupComponent } from '../group/group.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.css']
})
export class AddGroupDialogComponent {
  addGroupForm: any = FormGroup
  arrayData: any = []
  arrayForData: any;
  submittedAdd: boolean = false;
  messege: any
  arrayGroupMember: any = []

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<GroupComponent>,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    // this.getGroupMemberData();
    this.addGroupData();
    this.getGroupMember();


  }

  addGroupData() {
    this.addGroupForm = this.fb.group({
      group_name: ['', Validators.required],
      group_member: [''],
    });
  }
  get fc() { return this.addGroupForm.controls; }

  // submitAddForm() {
  //   console.log("ArrayDtaa", this.arrayData)
  //   const data = {
  //     "group_name": this.addGroupForm.value.group_name,
  //     "group_member": this.addGroupForm.value.group_member,
  //   };
  //   if (this.addGroupForm.valid) {
  //     this.http.post('http://localhost:5000/api/group', data).subscribe(
  //       (result) => {
  //         console.log("postt data", result)
  //         console.log('POST API Response---:', data.group_member);
  //       },
  //       (error) => {
  //         console.error('POST API Error:', error);
  //       }
  //     );
  //     //  this.dialogRef.close();
  //   }
  // }
  submitAddForm() {
    this.submittedAdd = true;
    if (this.addGroupForm.invalid) {
      return;
    }
    this.http.post('http://localhost:5000/api/group', this.addGroupForm.value).subscribe(
      // this.apiSvc.postService(this.constantSvc.APIConfig.ADMINHEADERPOPUPMENU, this.addForm.value).subscribe(
      (res: any) => {
        if (res.success == true) {
          this.submittedAdd = false;
          // this.messege = res.msg
          this.snackbarService.openSnackBar(res.msg);
          // this.getGroupMemberData();
          // this.addForm.reset();
          // this.resetForm();
        } else {
          this.snackbarService.openSnackBar(res.msg);
        }
      }, err => {
      }
    );
  }




  getGroupMember() {
console.log("undertdsusifgsiuf")
    this.http.get<any>('http://localhost:5000/api/group-member').subscribe(
      (result:any) => {
        console.log("undertdsusifgsiuf")

        console.log("result add", result)
        // this.arrayGroupMember = result.data
        // this.addGroupForm.patchValue({
        //   group_member: result.group_member,
        // });
        const getData=result.data
        for (let i of getData) {
          console.log("result add new data", i.group_member)

          // console.log("result add new---+++", result.data[i])

          this.arrayData.push(i.group_member)
         
        }

      },
      (error) => {
        console.error('API Error:', error);
      }
    );




    setTimeout(() => {
      console.log("this.aaray data new---",this.arrayData)    }, 1000);

  }


  // getGroupMembersname() {
  //   this.http.get<any>('http://localhost:5000/api/group/id?id=6565d17dde14abaca3f90ca6').subscribe(
  //     (result) => {

  //     })
  // }


  // onClick(): void {
  //   const newMember = this.addGroupForm.get('group_member').value;
  //   console.log(newMember)
  //   this.arrayData.push(newMember);
  // }
  goBack(): void {
    // this.router.navigate(['/group-member'])
    this.dialogRef.close();


  }
}



// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-add-group-dialog',
//   templateUrl: './add-group-dialog.component.html',
//   styleUrls: ['./add-group-dialog.component.css']
// })
// export class AddGroupDialogComponent {
//   addGroupForm: any = FormGroup
//   arrayData: any = []

//   constructor(private fb: FormBuilder,
//     private router: Router,
//     private http: HttpClient) { }

//   ngOnInit() {
//     this.addGroupData();
//   }

//   addGroupData() {
//     this.addGroupForm = this.fb.group({
//       group_name: ['', Validators.required],
//       group_member: [''],
//     });
//   }
//   get fc() { return this.addGroupForm.controls; }

//   submitAddForm() {
//     const data = {
//       "group_name": this.addGroupForm.value.group_name,
//       "group_member": this.addGroupForm.value.group_member,
//     };

//     if (this.addGroupForm.valid) {
//       this.http.post('http://localhost:5000/api/group', data).subscribe(
//         (result) => {
//           console.log('POST API Response:', result);
//         },
//         (error) => {
//           console.error('POST API Error:', error);
//         }
//       );
//     }
//   }


//   onClick(): void {
//     const newMember = this.addGroupForm.get('group_member').value;
//     console.log(newMember)
//     this.arrayData.push(newMember);
//   }
//   goBack() {
//     this.router.navigate(['/group'])
//   }
// }
// console.log("this.aaray data new---",this.arrayData)