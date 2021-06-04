import { Component, OnInit } from '@angular/core';
import { CourseAppService } from '../services/course-app.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-violation-report',
  templateUrl: './violation-report.component.html',
  styleUrls: ['./violation-report.component.css']
})
export class ViolationReportComponent implements OnInit {
  reports:any[]= [];
  courses:any[] = [];
  apps = [];
  courseAppId;
  constructor(private courseAppsService: CourseAppService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.getAllCoursesAndAppearances();
  }

  private getAllCoursesAndAppearances() {
    this.courseService.getAllCourses().toPromise().then(res => {
      console.log(res);
      this.courses= res.courses;
      this.courses.forEach(element => {
        console.log(element);
        
        element.appearances.forEach(app => {
          console.log(app);
          this.apps.push(app);
        });
      });

 
    })
  }

  private getAllReportData() {
      this.courseAppsService.getCourseAppReport(this.courseAppId).subscribe(res =>{
        this.reports=res;
      })
  }
}
