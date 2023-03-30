import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Assignments } from '../../../model/assignments';
import { GroupServiceService } from '../../services/group-service.service';
import { MainserviceService } from '../../services/mainservice.service';

@Component({
  selector: 'app-trainer-assignments',
  templateUrl: './trainer-assignments.component.html',
  styleUrls: ['./trainer-assignments.component.css']
})
export class TrainerAssignmentsComponent implements OnInit {
  loggedIn: any;
  id: any;
  groupId: any;
  msg="";
  message="";
  public assign = new Assignments();
  public assigns:any;
  public user:any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  fileInfos?: Observable<any>;
  curDate =new Date();
  constructor(private ms:MainserviceService,private route:ActivatedRoute,private gs:GroupServiceService){

  }
  ngOnInit(): void {
    this.loggedIn = this.ms.isLoggedIn();

    this.id=this.route.snapshot.paramMap.get('userId');
    this.groupId=this.route.snapshot.paramMap.get('groupId');
    this.gs.getAssignments(this.groupId).subscribe(
      data=>{
        this.assigns=data;
      },
      error=>{
        this.msg="error";
      }
    )
    this.ms.getUser(this.id).subscribe(
      data=>{
           this.user=data;
      },
      error=>{

      }

    )
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  createAssign(){
    this.assign.groupId=this.groupId;
    this.assign.startDate=new Date();
    this.gs.postAssignment(this.groupId,this.assign).subscribe(
      data=>{
      console.log(data);
      },
      error=>{

      }

      

      
    )
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
