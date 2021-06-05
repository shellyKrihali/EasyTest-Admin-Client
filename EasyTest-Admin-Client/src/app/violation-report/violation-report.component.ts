import { Component, OnInit } from '@angular/core';
import { CourseAppService } from '../services/course-app.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-violation-report',
  templateUrl: './violation-report.component.html',
  styleUrls: ['./violation-report.component.css']
})
export class ViolationReportComponent implements OnInit {
  reports: any[] = [];
  courses: any[] = [];
  apps = [];
  selectedApp
  constructor(private courseAppsService: CourseAppService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.getAllCoursesAndAppearances();
  }

  getAllCoursesAndAppearances() {
    this.courseService.getAllCourses().toPromise().then(res => {
      console.log(res);
      this.courses = res.courses;
      this.courses.forEach(element => {
        console.log(element);

        element.appearances.forEach(app => {
          console.log(app);

          this.apps.push(app);

        });
      });


    })
  }

  reloadTable() {

    if (this.selectedApp != undefined) {
      this.courseAppsService.getCourseAppReport(this.selectedApp._id).toPromise().then(res => {
        console.log(res)
        res.students.forEach(element => {
          var new_dates = [];
          element.loginDates.forEach(date => {
            var temp_date = new Date(date)
            var min = temp_date.getHours();
            var hr = temp_date.getMinutes();
            date = min + ":" + hr
            console.log(min)
            new_dates.push(date)

          });
          res.students[res.students.indexOf(element)].loginDates = new_dates


        });
        this.reports = res.students;

      })
    }
  }
}
