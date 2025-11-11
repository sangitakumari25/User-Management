import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ViewUsersComponent } from './view-users/view-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { OfflineComponent } from './offline/offline.component';
import { FeedbackComponent } from './feedback/feedback.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
    {path:'dashboard',component:DashboardComponent},
      {path:'view-users',component:ViewUsersComponent},
      {path:'add-user', component:AddUserComponent},
      {path:'offline',component:OfflineComponent},
       {path:'feedback',component:FeedbackComponent},
      { path: '**', redirectTo: 'dashboard' },
     
];
