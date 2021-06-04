import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { MainPageComponent } from './main-page/main-page.component'
import { MoodleIntegrationComponent } from './moodle-integration/moodle-integration.component';
import { ManualAdminActionComponent } from './manual-admin-action/manual-admin-action.component'
import { ViolationReportComponent } from './violation-report/violation-report.component'
import { ManageCourseappComponent } from './manual-admin-action/manage-courseapp/manage-courseapp.component';
import { ManageCoursesComponent } from './manual-admin-action/manage-courses/manage-courses.component';
import { ManageStudentsComponent } from './manual-admin-action/manage-students/manage-students.component';

const routes: Routes = [
  { path: 'log-in', component: LoginComponent },
  
  //, { path: 'land-page', component: LandPageComponent }
  //,{ path: 'log-in', component: LoginComponent }

  { path: 'home', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'moodleIntegration', component: MoodleIntegrationComponent, canActivate: [AuthGuard] },
  { path: 'manualAction', component: ManualAdminActionComponent, canActivate: [AuthGuard] },
  { path: 'violationPage', component: ViolationReportComponent, canActivate: [AuthGuard]  },
  { path: 'manualAction/courseapp', component: ManageCourseappComponent, canActivate: [AuthGuard]  },
  { path: 'manualAction/course', component: ManageCoursesComponent, canActivate: [AuthGuard]  },
  { path: 'manualAction/students', component: ManageStudentsComponent, canActivate: [AuthGuard]  },
  { path: 'manualAction/violation', component: ViolationReportComponent }


  
  ,{ path: '**', redirectTo: 'log-in' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
