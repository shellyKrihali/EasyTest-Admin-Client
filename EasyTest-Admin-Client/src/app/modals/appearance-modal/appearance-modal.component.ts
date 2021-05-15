import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Subject} from "rxjs";
import { CourseAppService } from 'src/app/services/course-app.service';
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'app-appearance-modal',
  templateUrl: './appearance-modal.component.html',
  styleUrls: ['./appearance-modal.component.css']
})
export class AppearanceModalComponent implements OnInit {
  public onClose: Subject<any> = new Subject<any>();
  appearance;
  selectedStudent: any;
  students;
  courseId;
  examTime = new Date();
  remakeTime = new Date();

  constructor(private bsModalRef: BsModalRef, private courseService: CourseService,private courseAppService:CourseAppService) {
  }

  ngOnInit(): void {
    console.log(this.appearance)
    if (!this.appearance) {
      this.appearance = {
        name: '',
        couresId: this.courseId,
        exams: {
          exam: new Date(),
          remake: new Date(),
          withMaterials: false,
          duration: 0
        },
        students: [{student:''},{loggedIn:false}],
      };
    } else {




      // this.appearance.students = this.appearance.students.map((sId) => {
      //   return this.students.find(s => s._id === sId.stutent);
      // });
      this.courseAppService.getAllCourseStudents(this.appearance._id).then(res=>{
        console.log(res)
        this.appearance.students = res.students.map((element=>{
          return element.student;
        }));
      })
      this.appearance.exams.exam = new Date(this.appearance.exams.exam);
      this.appearance.exams.remake = new Date(this.appearance.exams.remake);

      this.examTime.setHours(this.appearance.exams.exam.getHours());
      this.examTime.setMinutes(this.appearance.exams.exam.getMinutes());

      this.remakeTime.setHours(this.appearance.exams.remake.getHours());
      this.remakeTime.setMinutes(this.appearance.exams.remake.getMinutes());
      console.log(this.appearance)
    }
  }

  addStudent() {
    if (this.selectedStudent && this.appearance.students.indexOf(this.selectedStudent) === -1) {

      this.courseService.addStudentFromCourseAppearance(this.appearance._id, this.selectedStudent._id).subscribe(res => {
        this.appearance.students.push(this.selectedStudent);
      }, (err) => {
        alert('Add students failed');
      });

    }
  }

  onSubmit() {
    // stop here if form is invalid

    let action = 'create';
    if (this.appearance['_id']) {
      action = 'update';
    }

    this.appearance.exams.exam.setHours(this.examTime.getHours());
    this.appearance.exams.exam.setMinutes(this.examTime.getMinutes());

    this.appearance.exams.remake.setHours(this.remakeTime.getHours());
    this.appearance.exams.remake.setMinutes(this.remakeTime.getMinutes());
    this.onClose.next({data: this.appearance, action: action});
  }

  public onCancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

  removeStudent(s: any, index) {
    this.courseService.deleteStudentFromCourseAppearance(this.appearance._id, s._id).subscribe(res => {
      this.appearance.students.splice(index, 1);
    }, (err) => {
      alert('Delete students failed');
    });
  }
}
