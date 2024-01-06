import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import {AddDialogBoxComponent} from '../add-dialog-box/add-dialog-box.component'
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateDialogBoxComponent } from '../update-dialog-box/update-dialog-box.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {
  displayedColumns: string[] = ['project_name','description','startDate','endDate','project_manager','team_members','domain','action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dialogRef: MatDialogRef<UpdateDialogBoxComponent> | undefined 
  data: any;

  constructor(private dialog: MatDialog,
    private http: HttpClient,) {
}
ngOnInit(): void {
  this.dataSource = new MatTableDataSource();
  // this.getData();

  this.http.get<any>('http://localhost:5000/api/manage-project').subscribe(
    (result) => {
      // this.data = result;
      // this.dataSource.data = this.data;
      this.dataSource.data = result.data; // Set data on dataSource

      console.log("result---", this.data)
      console.log('API Response:', result);
    },
    (error) => {
      console.error('API Error:', error);
    }
  );
}
// openDialogUpdate(id: any){
// }

deleteItem(id: string): void {
  const isConfirmed = confirm('Are you sure you want to delete this project?');
  if (!isConfirmed) {
    return;
  }

  this.http.delete<any>(`http://localhost:5000/api/manage-project?id=${id}`).subscribe(
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
  
openDialogUpdate(id: any): void {
  this.dialogRef = this.dialog.open(UpdateDialogBoxComponent, {
    width: '50%',
    maxWidth: 2000,
    data: { update_id: id }
  });
}

}
