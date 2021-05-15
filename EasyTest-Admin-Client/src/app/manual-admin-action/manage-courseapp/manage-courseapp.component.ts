import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'app-manage-courseapp',
  templateUrl: './manage-courseapp.component.html',
  styleUrls: ['./manage-courseapp.component.css']
})
export class ManageCourseappComponent implements OnInit {
  courseApps: any[] = [];
  courseAppearance = {
    _id: '',
    name: '',
    couseId: null,
    examDate: new Date(),
    students: []
  };

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.getCouseAppearancesData();
  }

  private getCouseAppearancesData() {
    this.courseService.getAllCourseAppearances(this.courseAppearance.couseId).subscribe(res => {
      this.courseApps = res;
    });
  }

  delete(u: any) {

  }

  save() {

  }
}
