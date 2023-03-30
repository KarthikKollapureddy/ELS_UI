import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/model/LoginUser.model';
import { RegisterUser } from 'src/model/RegisterUser.model';



@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {

  constructor(private http:HttpClient) { }

  

  registerUser(user: RegisterUser):Observable<any>{
    return this.http.post<RegisterUser>("http://localhost:8098/elearning/api/main/register",user);
  }
  login(user: LoginUser):Observable<any>{
    return this.http.post("http://localhost:8098/elearning/api/main/login",user);
  }
}
