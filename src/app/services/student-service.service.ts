import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  addFeedback(userId: number, feed: any,groupId:number) {
    let url=this.baseUrl+"/addFeed/"+userId+'/'+groupId;
    return this.http.post(url,feed);
  }
  getGroupRating(groupId: number):Observable<any> {
    let url=this.baseUrl+"/getRating/"+groupId;
    return this.http.get(url);
  }
  addRate(id: any, groupId: number, val: number):Observable<any> {
    let url=this.baseUrl+"/addRating/"+id+'/'+groupId;
    return this.http.post(url,val);
  }
  
  deleteStudent(studId:number) {
    let url=this.baseUrl+"/delete/"+studId;
    return this.http.delete(url);
  }
  getStudentData(id: number,groupId:number) :Observable<any> {
    let url=this.baseUrl+"/getStud/"+groupId+'/'+id;
    return this.http.get(url);
  }
  getGroupData(id: number):Observable<any> {
    let url=this.baseUrl+'/joinedClasses/'+id;
    return this.http.get(url);
  }
  
  

  private baseUrl='http://localhost:9092/elearning/api/student';
  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router) { }

  getSuggestions(id:number):Observable<any> {
    let url=this.baseUrl+'/suggestions/'+id;
    return this.http.get(url);
  }

  createStudent(stud:Student):Observable<any>{
    let url=this.baseUrl+'/join/'+stud.userId;
    return this.http.post(url,stud);
  }
}
