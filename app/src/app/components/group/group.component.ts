import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddGroupDialogComponent } from '../add-group-dialog/add-group-dialog.component'
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  displayedColumns: string[] = ['group_name', 'group_member', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  updateGroupForm: any = FormGroup;
  data: any;
  istoggle: any = '';
  id: any;
  teamName: any;
  teamMember: any
  n: any;
  groupName: any;
  groupMember: any;
  arrayData: any = []
  arrayForData: any;
  arrayGroupMember: any;
  submittedgroupUpdate: boolean = false;
  setGroupMember: string = '';
  upadteareey: any;
  selectedGroupMembers: any[] = [];
  groupId: any
  messege: any
  dialogRef: MatDialogRef<AddGroupDialogComponent> | undefined
  role: any
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) { }


  ngOnInit(): void {
    // this.getGroupMembersname()
    // this.groupId='6565d166de14abaca3f90ca4',
    this.dataSource = new MatTableDataSource();
    this.getGroupMemberData();
    this.getData();
    this.getGroupMember()
    this.updateGroupData();

  }

  // getGroupMembersname() {
  //   this.http.get<any>('http://localhost:5000/api/group/id?id=6565d17dde14abaca3f90ca6').subscribe(
  //     (result) => {

  //     })
  // }

  getData() {
    this.http.get<any>('http://localhost:5000/api/group').subscribe(
      (result) => {
        this.data = result.data;
        // this.dataSource.data = this.data;
        this.dataSource.data = this.data; // Set data on dataSource

        // console.log("result---", this.data)
        // console.log('API Response:', result.data[0].group_member);
        //         this.arrayForData = result.data[0].group_member
        // console.log("-----------",this.arrayForData)
        // for (let i in this.arrayForData) {
        //   const newMember = this.arrayForData
        //   // console.log(newMember)
        //   // Add the new member to the array (replace this logic with your actual data update)
        //   this.arrayData.push(newMember);
        //   // console.log("for loop", this.arrayForData[i])
        // }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
  openDialogUpdate(value: any) {
    this.istoggle = true
    this.groupId = value._id
    this.upadteareey = value.group_member
    console.log("member", this.upadteareey)

    this.updateGroupForm.patchValue({
      group_name: value.group_name,
      group_member: value.group_member,
      id: value._id
    });

  }

  deleteItem(id: string): void {
    const isConfirmed = confirm('Are you sure you want to delete this project?');
    if (!isConfirmed) {
      return;
    }

    this.http.delete<any>(`http://localhost:5000/api/group?id=${id}`).subscribe(
      (result) => {
        console.log('DELETE API Response:', result);

        if (result.success) {
          // Optionally, update your data source or perform other actions
          // For example, remove the deleted item from your local array
          this.dataSource.data = this.dataSource.data.filter(item => item._id !== id);
        }
      },
      (error) => {
        console.error('DELETE API Error:', error);
      }
    );
  }
  get fc() { return this.updateGroupForm.controls; }

  updateGroupData() {
    this.updateGroupForm = this.fb.group({
      group_name: ['', Validators.required],
      group_member: ['', Validators.required],
      id: ['']
    });
  }
  getGroupById() {

    this.id = this.groupId,
      this.http.get<any>(`http://localhost:5000/api/group/id?id=${this.groupId}`).
        subscribe(
          (result) => {
            this.groupName = result.data.group_name
            this.groupMember = result.data.group_member
            this.setGroupMember = result.data.group_member
            this.updateGroupForm.patchValue({
              group_name: this.groupName,
              group_member: this.upadteareey,

              // Patch other form controls if needed
            });



          },
          (error) => {
            console.error('API Error:', error);
          }
        );
  }









  getGroupMemberData() {
    this.http.get<any>('http://localhost:5000/api/get-group-member').subscribe(
      (result: any) => {
        this.arrayForData = result.data[0].group_member


      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  submitGroupUpdateForm() {
    console.log(this.updateGroupForm.value)
    // Assuming this.arrayForData already contains the existing group members
    // const existingMembers = this.arrayForData.slice();
    // this.selectedGroupMembers = this.arrayForData.slice();

    // Clear the arrays before adding the members
    this.upadteareey = [];
    this.arrayForData = [];
    // Add the existing group members
    this.upadteareey = this.selectedGroupMembers;
    this.arrayGroupMember = this.arrayGroupMember.filter((role: any) => !this.upadteareey.includes(role.group_member));

    this.submittedgroupUpdate = true;
    if (this.updateGroupForm.valid) {
      this.http.put<any>(`http://localhost:5000/api/group`, this.updateGroupForm.value).subscribe(
        (result) => {
          this.messege = result.msg
          this.snackbarService.openSnackBar(this.messege); 
          this.getGroupMember();
          // window.location.reload()

        },
        (error) => {
          console.error('UPDATE API Error:', error);
        }
      );
    }
  }



  onClick(): void {
    // Get the value from the form control
    const newMember = this.updateGroupForm.get('group_member').value;
    // Add the new member to the array (replace this logic with your actual data update)
    this.arrayData.push(newMember);

    // // Optional: Clear the form control after adding the member
    // this.updateGroupForm.get('group_member').setValue('');

    // // Log the updated array
    // console.log('Updated Group Members:', this.groupMembers);
  }

  openAddDialog(): void {
    this.dialogRef = this.dialog.open(AddGroupDialogComponent, {
      width: '50%',
      maxWidth: 2000,
      // data: { update_id: id }
    });
  }
  goBack() {
    // this.router.navigate(['/group'])
    this.istoggle = false

  }

  getGroupMember() {

    this.http.get<any>('http://localhost:5000/api/group-member').subscribe(
      (result) => {
        // console.log("result group member",result.data[1].group_member)
        // this.dataSource.data = result.data;
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;

        this.arrayGroupMember = result.data
        for (let i in this.arrayGroupMember) {

        }

      },
      (error) => {
        console.error('API Error:', error);
      }
    );




    setTimeout(() => {
      console.log("this.arrayGroupMember", this.arrayGroupMember)
    }, 5000);

  }

}