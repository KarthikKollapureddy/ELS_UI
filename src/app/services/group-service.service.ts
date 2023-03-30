import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from 'src/model/group';
import { RegisterUser } from 'src/model/RegisterUser.model';
import { Answer } from '../../model/answer';
import { Assignments } from '../../model/assignments';
import { Question } from '../../model/question';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
  getTodos(id:number) :Observable<any>{
    let url=this.baseUrl+"/assignments/todo/"+id;
    return this.http.get(url);
  }
  submitFile(currentFile: File, assignId: number, id: number) :Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', currentFile);
    let url=this.baseUrl+"/assignments/submit/"+assignId+"/"+id;

    const req = new HttpRequest('POST',url, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  editAnswer(answerId: number, answerName: any) {
    let url=this.baseUrl+'/answers/editAnswer/'+answerId;
  return this.http.patch(url,answerName);
  }

  upload(file: File,groupId:number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    let url=this.baseUrl+"/files/upload/"+groupId;

    const req = new HttpRequest('POST',url, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(groupId:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/files/${groupId}`);
  }
  deleteAnswer(answerId: number):Observable<any>{
    let url=this.baseUrl+'/answers/delAnswer/'+answerId;
   return this.http.delete(url);
  }
  getAnswers(questionId: number) :Observable<any> {
    let url=this.baseUrl+'/answers/getAnswers/'+questionId;
    return this.http.get(url);
  }
  deleteQuestion(questionId: number) :Observable<any>{
   let url=this.baseUrl+'/questions/delQuestion/'+questionId;
   return this.http.delete(url);
  }
  editQuestion(questionId: number, questionName: string):Observable<any> {
  let url=this.baseUrl+'/questions/editQuestion/'+questionId;
  return this.http.patch(url,questionName);
  }
  addAnswer(ans: Answer) :Observable<any> {
   let url=this.baseUrl+'/answers/create';
   return this.http.post(url,ans);
  }
  addQuestion(ques: Question):Observable<any> {
   let url=this.baseUrl+'/questions/create';
   return this.http.post(url,ques);
  }
  getQuestions(groupId: number) :Observable<any>{
    let url=this.baseUrl+'/questions/getQuestion/'+groupId;
    return this.http.get(url);
  }

  private baseUrl='http://localhost:9091/elearning/api/groups';
  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router) { }

  getPeopleData(groupId: number):Observable<RegisterUser[]> {
    let url="http://localhost:9091/elearning/api/groups/people/"+groupId;
    return this.http.get<RegisterUser[]>(url);
  }

  getAssignments(groupId:number):Observable<any>{
    let url=this.baseUrl+"/assignments/get/"+groupId;
    return this.http.get(url);
  }

  postAssignment(groupId:number,assign:Assignments):Observable<any>{
    let url=this.baseUrl+"/assignments/post/"+groupId;
    return this.http.post(url,assign);
  }
}
