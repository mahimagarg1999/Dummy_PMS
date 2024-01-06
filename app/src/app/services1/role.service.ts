import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  data: any;
  role: any;
  fetchData() {
    const role = this.data;
    this.data = localStorage.getItem('role')
    // console.log("this.data fetchdata",this.data)
    //

    return this.data ;

  }

  setRole(role: any) {
    console.log("role setrole",role)
    this.data = role;
    const test=localStorage.setItem('role', this.data);
    // console.log("setRole.",test)

  }

  // fetchData(): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     // Simulating an asynchronous operation (e.g., API call)
  //     // setTimeout(() => {
  //       const data = 'admin  ';
  //       resolve(data);
  //       // or reject(new Error('Failed to fetch data'));
  //     // }, 10);
  //   });
  // }

  // // correct
  // fetchData(){
  //   const data='user'
  //   return  data;
  // }
  // // correct



  // fetchData(role: string): string {
  //   // You can implement logic here to return different data based on the role
  //   switch (role) {
  //     case 'admin':
  //       return 'Admin data';
  //     case 'user':
  //       return 'User data';
  //     default:
  //       return 'Default data';
  //   }
  // }

  //   private userRole: string = '';
  //   setUserRole(role: string) {
  //     this.userRole = role;
  //     console.log("Service this.userRole", this.userRole);
  //   }
  //    fetchData(): string {
  //     // You can implement logic here to return different data based on the role
  //     switch (this.userRole) {
  //       case 'admin':
  //         return 'Admin data';
  //       case 'user':
  //         return 'User data';
  //       default:
  //         return 'Default data';
  //     }
  //   }
}
