import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/model/RegisterUser.model';
import { GroupServiceService } from '../../services/group-service.service';
import { MainserviceService } from '../../services/mainservice.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  public groupId:any;
  public loggedIn:any;
  public id:any;
  public user:RegisterUser=new RegisterUser();
  fileInfos?: Observable<any>;

  constructor(private gs: GroupServiceService,private ms:MainserviceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.groupId=this.route.snapshot.paramMap.get('groupId');
    this.fileInfos = this.gs.getFiles(this.groupId);
    this.loggedIn = this.ms.isLoggedIn();
    this.id=this.route.snapshot.paramMap.get('userId');
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
  upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.gs.upload(this.currentFile,this.groupId).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.gs.getFiles(this.groupId);
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
      this.ngOnInit();
      this.selectedFiles = undefined;
    }
  }

}


