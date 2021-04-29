import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Subject} from "rxjs";

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.css']
})
export class CourseModalComponent implements OnInit {
  course;
  public onClose: Subject<any> = new Subject<any>();

  constructor(private bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    if (!this.course) {
      this.course = {
        name: ''
      };
    } else {
      this.course = JSON.parse(JSON.stringify(this.course));
    }
  }

  onSubmit() {
    let action = 'create';
    if (this.course['_id']) {
      action = 'update';
    }
    this.onClose.next({data: this.course, action: action});
  }

  public onCancel(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

}
