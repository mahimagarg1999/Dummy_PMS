import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.css']
})
export class GroupMemberComponent {

  displayedColumns: string[] = ['group_member', 'action'];
  dataSource: any = MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  addForm: any = FormGroup;
  updateForm: any = FormGroup;

  roleList: any = [];

  modalReferenceAdd: any;
  modalReferenceEdit: any;
  modalReferenceDel: any;

  submittedAdd: boolean = false;
  submittedUpdate: boolean = false;

  deleteId: any = '';
  data: any;
  message: any;
  update_id: any;
  id: any;
  g_member: any
  constructor(private router: Router,
    private fb: FormBuilder,


    private _route: ActivatedRoute,
    private http: HttpClient,
    private snackbarService: SnackbarService,

  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.createForm();
    this.createFormUpdate();
    this.getRoles();
  }

  get fc() { return this.addForm.controls; }

  createForm() {
    this.addForm = this.fb.group({
      group_member: ['', Validators.required],
    });
  }

  get fc1() { return this.updateForm.controls; }

  createFormUpdate() {
    this.updateForm = this.fb.group({
      group_member: ['', Validators.required],
      id: this.update_id
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRoles() {

    this.http.get<any>('http://localhost:5000/api/group-member').subscribe(
      (result) => {
        console.log(result)
        this.dataSource.data = result.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );



  }

  openDialogUpdate(_id: any) {
    this.update_id = _id
    console.log("this.update_id", this.update_id)
    this.http.get<any>(`http://localhost:5000/api/group-member/id?id=${_id}`).
      subscribe(
        (result) => {
          console.log("tresult", result);
          this.g_member = result.data.group_member


          this.updateForm.patchValue({
            group_member: this.g_member,
          });
          console.log('API Response update:', result.data.fname);
          console.log('API Response update:', result.data.fname);
        },
        (error) => {
          console.error('API Error:', error);
        });
  }

  addSubmit() {

    this.submittedAdd = true;
    if (this.addForm.valid) {
      const loginData = this.addForm.value;
      console.log("loginData", loginData);
      console.log("this.RegisterForm.value", this.addForm.value);

      this.http.post<any>('http://localhost:5000/api/group-member', loginData)
        .subscribe(
          response => {
            console.log(response);
            this.message = response.msg
            this.snackbarService.openSnackBar(this.message);

          },
          error => {
            console.error(error);
          }
        );
    }

  }


  submitUpdateForm() {
    console.log("mahima")
    const data = {
      "id": this.update_id,
      "group_member": this.updateForm.value.group_member
    }
    this.submittedUpdate = true;
    console.log(this.updateForm.value)
    if (this.updateForm.valid) {
      this.http.put<any>(`http://localhost:5000/api/group-member`, data).subscribe(
        (result) => {
          console.log('Admin UPDATE API Response:', result);
          this.snackbarService.openSnackBar('Edit Admin successful!');

        },
        (error) => {
          console.error('UPDATE API Error:', error);
        }

      );

    }



  }

  openDeleteDialog(id: any) {
    const isConfirmed = confirm('Are you sure you want to delete this project?');
    if (!isConfirmed) {
      return;
    }

    this.http.delete<any>(`http://localhost:5000/api/group-member?id=${id}`).subscribe(
      (result) => {
        console.log('DELETE API Response:', result);

        if (result.success) {

          this.dataSource.data = this.dataSource.data.filter((item: { _id: any; }) => item._id !== id);
        }
      },
      (error) => {
        console.error('DELETE API Error:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
