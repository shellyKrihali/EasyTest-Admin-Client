import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Course} from '../models/course';
import {HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CourseAppService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private cookieServise: CookieService) {
  }

  public async getAllCourseAppearances(courseId: string): Promise<any> {
    const result =
      await this.http.get<any>(`${environment.apiUrl}/courses/all-appearances/${courseId}`)
        .toPromise();
    console.log(result);
    return result;
  }

//**PUT /course-appearances/add-student/:courseAppId/:userId
//**add student to courseapp

//**/PUT /course-appearances/upload/:CourseId
//** add new course apperance
  public async addNewCourseAppearance(data, courseId: string): Promise<any> {
    /* let headers = new HttpHeaders();
     headers = headers.set('Authorization', `Bearer ${this.cookieServise.get("token")}`);
     const options = { headers: headers };*/
    return this.http.put<any>(`${environment.apiUrl}/course-appearances/upload/${courseId}`, data//,options(in case bar adds isAuth token to this url)
    ).toPromise;

  }
  

  public getAllCourseStudents(courseAppId):Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.cookieServise.get("token-admin")}`);
    const httpOptions = {
      headers: headers
    };
    return this.http.get<any>(`${environment.apiUrl}/course-appearances/students/${courseAppId}`, httpOptions).toPromise();
  }

  public getCourseAppReport(courseAppId){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.cookieServise.get("token-admin")}`);
    const httpOptions = {
      headers: headers
    };
    return this.http.get<any>(`${environment.apiUrl}/course-appearances/students/report/${courseAppId}`, httpOptions);
  }
}
