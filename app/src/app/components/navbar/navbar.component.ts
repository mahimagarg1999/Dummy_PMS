import { Component ,OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoleService } from '../../services1/role.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
// export class NavbarComponent implements OnInit {
  export class NavbarComponent implements OnInit, OnDestroy {
    role:any;
    private subscription: Subscription = new Subscription();
  
    constructor(
      private route: ActivatedRoute,
      private roleService: RoleService,
      private router: Router,
    ) {}

ngOnInit() {
  this.role=  this.roleService.fetchData()
        console.log(this.role)
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  logout(){
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
    // localStorage.removeItem('key');
  }
}







// =========================================================
// import { Component ,OnInit} from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { RoleService } from '../../services1/role.service'

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit {
//   role: any;
//   firstName: any = true;
//  constructor(
//   private route: ActivatedRoute,
//   private roleService: RoleService
// ) {
//   // this.roleService.fetchData()
//   // .then((data: any) => {
//   //   this.role=data;
//   //   console.log(this.role)
//   //   this.roleService = data;
//   //   console.log('Data from the server:', data);
//   // })
//   // .catch((error: Error) => {
//   //   console.error('Error fetching data:', error.message);
//   // });
//   // ...

//   // this.roleService.getUserRole().subscribe(
//   //   (userRole: string) => {
//   //     this.role = userRole;
//   //     console.log(this.role); // Outputs the user role
//   //   },
//   //   (error: any) => {
//   //     console.error('Error fetching user role:', error);
//   //   }
//   // );
// }

//   ngOnInit() {
//   this.role=  this.roleService.fetchData()
//         // this.role=data;
//         console.log(this.role)
//         // this.roleService = data;
//         // console.log('Data from the server:', data);
//   }
//   // ngAfterViewInit() {
//   //   // Code to be executed after the component's view has been initialized
//   //   console.log('ngAfterViewInit called');
//   //   this.firstName = false
//   // }

  
//   // role: string = 'admin';

 
//   // ngOnInit() {
//   // this.role=  this.roleService.fetchData()
//   //       // this.role=data;
//   //       console.log(this.role)
//   //       // this.roleService = data;
//   //       // console.log('Data from the server:', data);
//   // }
//   // ngAfterViewInit() {
//   //   // Code to be executed after the component's view has been initialized
//   //   console.log('ngAfterViewInit called');
//   //   this.firstName = false
//   // }
//   // role: string = 'admin';
// }
