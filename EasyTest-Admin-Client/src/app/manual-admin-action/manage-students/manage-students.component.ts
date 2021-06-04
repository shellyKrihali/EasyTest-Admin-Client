import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {SummariesService} from "../../services/summaries.service";
import {Summary} from "../../models/summary";
import {forkJoin} from "rxjs";
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/course";
import {ExamDirectory} from "../../models/examDirectory";

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
  @ViewChild('closeBtn') public closeBtn: ElementRef;
  users = [];
  summaries: Summary[] = [];
  courses: Course[] = [];

  user = {
    _id: '',
    type: 'USER',
    email: '',
    password: '',
    uploadedSummaries: [],
    examsDirectories: [],
    imageUrl: '',
    followedCourses: [],
    name: ''
  };
  selectedSummaries = [];
  selectedCourses = [];
  selectedSummary;
  selectedCourse: any;
  tempImage: any;
  search: any;

  constructor(
    private userService: UserService,
    private summariesService: SummariesService,
    private courseService: CourseService,
  ) {
    this.getUsersData();
  }

  private getUsersData() {
    forkJoin([ //call multiple api requests at the same time
      this.userService.getAll(),
      this.summariesService.getAll(),
      this.courseService.getAllCourses(),
    ]).subscribe(res => {
      this.users = res[0].users;
      this.summaries = res[1].summaries;
      this.courses = res[2].courses;

      //console.log(this.users);
     /* this.users.forEach(u => {
        u.summaries = u.uploadedSummaries.map(sid => {
          return this.summaries.find(fs => {
            return fs._id == sid;
          }).title;
        });
        u.cources = u.followedCourses.map(sid => {
          return this.courses.find(fs => {
            return fs._id == sid;
          }).name;
        });
      });*/
    });
  }

  ngOnInit(): void {
  }

  trackByIndex(index: number): any {
    return index;
  }

  getSummariesName(uploadedSummaries: string[]) {
    return uploadedSummaries.map(sid => {
      return this.summaries.find(fs => {
        return fs._id == sid;
      }).title;
    }).join(' | ');
  }

  getCourseName(cids: string[]) {
    return cids.map(id => {
      return this.courses.find(fs => {
        return fs._id == id;
      }).name;
    }).join(' | ');
  }

  addSummary() {
    if (this.selectedSummaries.indexOf(this.selectedSummary) === -1) {
      this.selectedSummaries.push(this.selectedSummary);
    }
  }

  addCourse() {
    if (this.selectedCourses.indexOf(this.selectedCourse) === -1) {
      this.selectedCourses.push(this.selectedCourse);
    }

  }

  onFileChange(file) {
    this.tempImage = file;
  }

  saveUser() {
    // this.user.followedCourses = this.selectedCourses.map(c => c._id);
    // this.user.uploadedSummaries = this.selectedSummaries.map(c => c._id);
    this.userService.create(this.user, this.tempImage).subscribe((res) => {
      this.getUsersData();
      this.closeBtn.nativeElement.click();
    });
  }

  delete(u: any) {
    this.userService.delete(u._id).subscribe((res => {
      this.getUsersData();
    }));
  }
}
