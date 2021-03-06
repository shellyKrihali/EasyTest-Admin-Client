import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {User} from '../models/user';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private cookieServise: CookieService) {
    //cookieServise.delete("user");
    // cookieServise.delete("token");
    if (cookieServise.check("admin")) {
      this.user = JSON.parse(cookieServise.get("admin"));
    }
  }

  checkIfUserIsAdmin() {
    this.user = JSON.parse(this.cookieServise.get("admin"));
    return this.user.type === 'ADMIN';
  }

  public login(email: string, password: string): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/login-admin`, {email: email, password: password})
      .toPromise()
      .then(json => {
        // console.log(json.user);
        this.user = json["user"];
        console.log(this.user);
        this.cookieServise.set("admin", JSON.stringify(json.user));
        this.cookieServise.set("token-admin", json.token);
      });
  }

  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/users/all-users`);
  }

  public logOut() {
    this.cookieServise.delete("admin");
    this.cookieServise.delete("token-admin");
  }

  create(user, file) {

    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('role', user.type);

    return this.http.put<any>(`${environment.apiUrl}/users/sign-up`, formData);

  }

  delete(id: any) {
    return this.http.delete<any>(`${environment.apiUrl}/users/${id}`);
  }
}
