import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services1/role.service';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  role = 'admin'
  constructor(private router: Router,
    private roleService: RoleService
  ) {
    // this.roleService.setUserRole('admin')
  }

}
