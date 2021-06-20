import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import {MainPageComponent} from './main-page/main-page.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {MoodleIntegrationComponent} from './moodle-integration/moodle-integration.component';
import {ManualAdminActionComponent} from './manual-admin-action/manual-admin-action.component';
import {ViolationReportComponent} from './violation-report/violation-report.component'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from '@angular/material/form-field';
import {ManageCoursesComponent} from './manual-admin-action/manage-courses/manage-courses.component';
import {ManageCourseappComponent} from './manual-admin-action/manage-courseapp/manage-courseapp.component';
import {ManageStudentsComponent} from './manual-admin-action/manage-students/manage-students.component';
import {ImageSelectorComponent} from "./image-selector/image-selector.component";
// import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ModalModule} from "ngx-bootstrap/modal";
import {AppearanceModalComponent} from './modals/appearance-modal/appearance-modal.component';
import {CourseModalComponent} from './modals/course-modal/course-modal.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {FilterPipe} from "./filter.pipe";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    NavBarComponent,
    MoodleIntegrationComponent,
    ManualAdminActionComponent,
    ViolationReportComponent,
    ManageCoursesComponent,
    ManageCourseappComponent,
    ManageStudentsComponent,
    ImageSelectorComponent,
    AppearanceModalComponent,
    CourseModalComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    // NgbModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
