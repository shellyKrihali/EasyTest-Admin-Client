import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { MainPageComponent } from './main-page/main-page.component'
import { MoodleIntegrationComponent } from './moodle-integration/moodle-integration.component';
import { ManualAdminActionComponent } from './manual-admin-action/manual-admin-action.component'
import { ViolationReportComponent } from './violation-report/violation-report.component'

const routes: Routes = [
  { path: 'log-in', component: LoginComponent },
  
  //, { path: 'land-page', component: LandPageComponent }
  //,{ path: 'log-in', component: LoginComponent }

  { path: 'home', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'moodleIntegration', component: MoodleIntegrationComponent, canActivate: [AuthGuard] },
  { path: 'manualAction', component: ManualAdminActionComponent, canActivate: [AuthGuard] },
  { path: 'violationPage', component: ViolationReportComponent, canActivate: [AuthGuard]  }
  ,{ path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
