import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupServiceService } from '../../services/group-service.service';
import { MainserviceService } from '../../services/mainservice.service';

@Component({
  selector: 'app-student-todos',
  templateUrl: './student-todos.component.html',
  styleUrls: ['./student-todos.component.css']
})
export class StudentTodosComponent implements OnInit{

  public loggedIn =false;
  public id:any;
  public assigns:any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  fileInfos?: Observable<any>;
  message: any;
  constructor(private ms:MainserviceService,private route:ActivatedRoute,private gs:GroupServiceService){

  }
  ngOnInit(): void {
    this.loggedIn = this.ms.isLoggedIn();
    this.id=this.route.snapshot.paramMap.get('userId');

    this.gs.getTodos(this.id).subscribe(
      data=>{
       this.assigns=data;
      },
      error=>{

      }
    )
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadAssign(assignId:number): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
       
        this.gs.submitFile(this.currentFile,assignId,this.id).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = undefined;
    }
  }

}
