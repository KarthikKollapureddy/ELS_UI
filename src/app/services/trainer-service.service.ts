import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from '../../model/group';

@Injectable({
  providedIn: 'root'
})
export class TrainerServiceService {
  deleteGroup(groupId: number):Observable<any>{
    let url=this.baseUrl+'/delete/'+groupId;
    return this.http.delete(url);
    
  }

  
 
  getClassData(groupId: any):Observable<any> {
    let url=this.baseUrl+'/getClass/'+groupId;
    return this.http.get(url);
  }

  getGroupData(id: any):Observable<any> {
    let url=this.baseUrl+'/getGroups/'+id;
    return this.http.get(url);
  }

  private baseUrl='http://localhost:8080/elearning/api/trainer';
  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router) { }

  public insertGroup(gr:Group,id:number):Observable<any>{
    let url=this.baseUrl+'/create/'+id;
    return this.http.post(url,gr);
  }

  public editGroup(gr:Group,id:number):Observable<any>{
    let url=this.baseUrl+'/edit/'+id;
    return this.http.put(url,gr);
  }

  


}
