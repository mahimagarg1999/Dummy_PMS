import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoryComponent } from './components/category/category.component';
import { CourcesComponent } from './components/cources/cources.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamComponent } from './components/team/team.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { UpdateDialogBoxComponent } from './components/update-dialog-box/update-dialog-box.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditAdminProfileComponent } from './components/edit-admin-profile/edit-admin-profile.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { GroupComponent } from './components/group/group.component';
import { GroupMemberComponent } from './components/group-member/group-member.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

  },
  {
    path: 'manage-user',
    component: ManageUserComponent,

  },
  {
    path: 'admin-page',
    component: AdminPageComponent,
  },
  {
    path: 'update',
    component: UpdateDialogBoxComponent,

  },
  
  {
    path: 'change-password',
    component: ChangePasswordComponent,

  },
  {
    path: 'user',
    component: UserPageComponent,

  },
  {
    path: 'contact',
    component: ContactComponent,

  },
  {
    path: 'about',
    component: AboutComponent,

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'footer',
    component: FooterComponent,

  },
  {
    path: 'navbar/:role',
    component: NavbarComponent,

  },
  {
    path: 'category',
    component: CategoryComponent,

  },
  {
    path: 'cources',
    component: CourcesComponent,

  },
  {
    path: 'register',
    component: RegisterComponent,

  },
  {
    path: 'team',
    component: TeamComponent,

  },
  {
    path: 'testimonial',
    component: TestimonialComponent,

  },
  {
    path: 'blog',
    component: BlogComponent,

  },
  {
    path: 'edit-profile',
    component: EditAdminProfileComponent,

  },
  {
    path: 'forget-change-password/:email',
    component: ForgetPasswordComponent,

  },
  {
    path: 'group',
    component: GroupComponent,

  },
  {
    path: 'group-member',
    component: GroupMemberComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
