import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Course} from '../models/course';
import {HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private cookieServise: CookieService) {

  }

  public getAllCourses() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.cookieServise.get("token-admin")}`);
    const httpOptions = {
      headers: headers
    };
    return this.http.get<any>(`${environment.apiUrl}/courses/all`, httpOptions);
  }

  public async searchCourseByKeyWord(keyWord: string): Promise<any> {
    const result =
      await this.http.post<any>(`${environment.apiUrl}/courses/search/key-word`, keyWord)
        .toPromise();
    return result;

  }

  public getAllCourseAppearances(courseid) {//by course id!!!
    return this.http.get<any>(`${environment.apiUrl}/courses/all-appearances/${courseid}`);
  }

  //PUT /courses/upload
//upload new course
  createAppearance(appearance) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.cookieServise.get("token-admin")}`);
    const httpOptions = {
      headers: headers
    };
    return this.http.put<any>(`${environment.apiUrl}/course-appearances/upload/${appearance.couresId}`, appearance);

  }

  updateAppearance(appearance, id) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.cookieServise.get("token-admin")}`);
    const httpOptions = {
      headers: headers
    };
    return this.http.put<any>(`${environment.apiUrl}/course-appearances/update/${id}`, appearance);

  }

  delete(c: any) {
    return this.http.delete<any>(`${environment.apiUrl}/courses/${c._id}`);
  }

  createCourse(course: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.cookieServise.get("token-admin")}`);
    const httpOptions = {
      headers: headers
    };
    return this.http.put<any>(`${environment.apiUrl}/courses/upload`, course);
  }

  updateCourse(course: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.cookieServise.get("token-admin")}`);
    const httpOptions = {
      headers: headers
    };
    return this.http.put<any>(`${environment.apiUrl}/courses/update-details/${course._id}`, course, httpOptions);
  }

  deleteStudentFromCourseAppearance(courseAppId: any, sId: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.cookieServise.get("token-admin")}`);
    const httpOptions = {
      headers: headers
    };console.log(sId)
    return this.http.put<any>(`${environment.apiUrl}/course-appearances/delete-student/${courseAppId}`, {userId: sId},httpOptions);
  }

  addStudentFromCourseAppearance(courseAppId: any, sId: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.cookieServise.get("token-admin")}`);
    const httpOptions = {
      headers: headers
    };
    return this.http.put<any>(`${environment.apiUrl}/course-appearances/add-student/${courseAppId}`, {userId: sId},httpOptions);
  }
  deleteCourseApp(appId: any,courseId: any){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        appId: appId
      },
    };
    return this.http.delete<any>(`${environment.apiUrl}/courses/appearance/`,options);

  }
}
