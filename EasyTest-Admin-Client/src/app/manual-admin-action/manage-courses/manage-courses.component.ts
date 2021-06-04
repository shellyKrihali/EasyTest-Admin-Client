import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseService} from "../../services/course.service";
import {forkJoin} from "rxjs";
import {UserService} from "../../services/user.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {AppearanceModalComponent} from "../../modals/appearance-modal/appearance-modal.component";
import {CourseModalComponent} from "../../modals/course-modal/course-modal.component";

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {
  private modalRef: any;
  courses: any[] = [];
  course = {
    _id: '',
    name: ''
  };
  courseApps = [];
  students = [];
  appearance = {
    name: '',
    couresId: '',
    exams: {
      exam: new Date(),
      remake: new Date(),
      withMaterials: false,
      duration: 0
    },
    students: [],
  };
  selectedCourse;
  selectedStudent: any;
  search: any;

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getCoursesData();
  }

  private getCoursesData() {
    forkJoin([this.courseService.getAllCourses(), this.userService.getAll()]).subscribe(res => {
      this.courses = res [0]?.courses;
      this.students = res  [1]?.users;

      this.courses.forEach(c => {
        c.students = c.followers.map(id => {
          return this.students.find(s => {
            return s._id == id;
          })?.name;
        });
        c.appearances=[];
        this.courseService.getAllCourseAppearances(c._id).subscribe(res => {
          res.appearances.forEach(element => {
           c.appearances.push(element);
          });
        })
      });
    });

  }

  delete(c: any) {
    this.courseService.delete(c).subscribe(res => {
      this.getCoursesData();
    });
  }

  save() {
  }

  addAppearance(c: any) {
  }


  saveApearaance(appearance) {
    var ca = {
      name: appearance.name,
      examDuration: appearance.exams.duration,
      examsDateA: appearance.exams.exam,
      examsDateB: appearance.exams.remake,
      isExamWithMatearials: appearance.exams.withMaterials,
      couresId: appearance.couresId
    };
    //appearance.exams.remake = appearance.exams.exam;
    //appearance.students = appearance.students.map(s => s._id);
    if (appearance['_id']) {

      this.courseService.updateAppearance(ca,appearance['_id']).subscribe(res => {
        this.modalRef.hide();
        this.getCoursesData();
      });
    } else {
      this.courseService.createAppearance(ca).subscribe(res => {
        this.modalRef.hide();
        this.getCoursesData();
      });
    }
  }

  openAppearanceModal(courseId, appearance?) {
    console.log(appearance);
    console.log(this.students);
    const state = {backdrop: true, initialState: {appearance: appearance, students: this.students, courseId}};
    this.modalRef = this.modalService.show(AppearanceModalComponent, state);
    // if (appearance) {
    //
    //   this.modalRef = this.modalService.show(AppearanceModalComponent, state);
    // } else {
    //   this.modalRef = this.modalService.show(AppearanceModalComponent, state);
    // }

    this.modalRef.content.onClose.subscribe(result => {
      if (!result) {
        this.modalRef.hide();
        return;
      }
      this.saveApearaance(result.data);
    });
  }

  openCOurseModal(course?) {
    const state = {backdrop: true, initialState: {course}};
    this.modalRef = this.modalService.show(CourseModalComponent, state);
    this.modalRef.content.onClose.subscribe(result => {
      if (!result) {
        this.modalRef.hide();
        return;
      }
      if (result.action == 'update') {
        this.courseService.updateCourse(result.data).subscribe((res) => {
          this.modalRef.hide();
          this.getCoursesData();
        }, (err) => {
          alert('Course update failed');
        });
      } else {
        this.courseService.createCourse(result.data).subscribe((res) => {
          this.modalRef.hide();
          this.getCoursesData();
        }, (err) => {
          alert('Course create failed');
        });
      }

    });
  }
}
