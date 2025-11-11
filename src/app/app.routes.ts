import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ViewUsersComponent } from './view-users/view-users.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent},
      {path:'view-users',component:ViewUsersComponent},
      {path:'add-user', component:AddUserComponent},
];
