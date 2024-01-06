import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoryComponent } from './components/category/category.component';
import { CourcesComponent } from './components/cources/cources.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamComponent } from './components/team/team.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatDrawerModule } from '@angular/material/drawer';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { UpdateDialogBoxComponent } from './components/update-dialog-box/update-dialog-box.component';
import { DatePipe } from '@angular/common';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditAdminProfileComponent } from './components/edit-admin-profile/edit-admin-profile.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { GroupComponent } from './components/group/group.component';
import { AddGroupDialogComponent } from './components/add-group-dialog/add-group-dialog.component';

import { MatSelectModule } from '@angular/material/select';
import { GroupMemberComponent } from './components/group-member/group-member.component';

import { MatPaginatorModule } from '@angular/material/paginator';


import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    CategoryComponent,
    CourcesComponent,
    RegisterComponent,
    TeamComponent,
    TestimonialComponent,
    BlogComponent,
    HomeComponent,
    AboutComponent,
    TopbarComponent,
    LoginComponent,
    AdminPageComponent,
    ContactComponent,
    UserPageComponent,
    ManageUserComponent,
    UpdateDialogBoxComponent,
    ChangePasswordComponent,
    EditAdminProfileComponent,
    ForgetPasswordComponent,
    GroupComponent,
    AddGroupDialogComponent,
    GroupMemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
MatButtonModule,
 MatMenuModule ,
 MatToolbarModule ,MatSnackBarModule ,
MatSidenavModule ,
MatListModule ,
MatExpansionModule ,
 MatDialogModule ,
 MatTableModule ,
 MatFormFieldModule,
 MatInputModule,
 MatSelectModule,
 MatPaginatorModule,
 MatAutocompleteModule,
 CommonModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]                                   
})
export class AppModule { }
