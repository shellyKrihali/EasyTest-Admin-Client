export class CourseAppearance {
  _id: string;
  name: string;
  couresId: string;
  examDate: Date;
  students: [{student: string},{loggedIn:boolean}];
}
