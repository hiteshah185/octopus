import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventComponent } from './dashboard/event/event.component';
import { HomeComponent } from './home.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { SettingsComponent } from './settings/settings.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [

  {
    path:"",
    component: HomeComponent,
    children:[
      {
        path:"dashboard",
        loadChildren: () => import("./dashboard/dashboard.module").then(mod=> mod.DashboardModule),
       
      },
      {
        path:"recruitment",
        component: RecruitmentComponent,
        canActivate:[AuthGuard],
        data:{
          role:["ROLE_ADMIN"]
        }
      },
      {
        path:"administration",
        loadChildren:()=> import("./admin/admin.module").then(mod=>mod.AdminModule),
        canActivate: [AuthGuard],
        data:{
          role:["ROLE_ADMIN"]
        }
      },{
        path:"calendar",
        component: EventComponent
      }
      ,{
        path:"tasks",
        loadChildren:()=> import("./tasks/tasks.module").then(mod=>mod.TasksModule),
        canActivate: [AuthGuard],
        data:{
          role:["ROLE_ADMIN","ROLE_HR", "ROLE_HM","ROLE_IN"]
        }
      }
      ,{
        path:"settings",
        component: SettingsComponent,
        canActivate: [AuthGuard],
        data:{
          role:["ROLE_ADMIN"]
        }
      }
    ],
    
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
