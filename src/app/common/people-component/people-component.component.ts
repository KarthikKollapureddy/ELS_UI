import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/model/group';
import { RegisterUser } from 'src/model/RegisterUser.model';
import { GroupServiceService } from '../../services/group-service.service';
import { MainserviceService } from '../../services/mainservice.service';
import { StudentServiceService } from '../../services/student-service.service';
import { TrainerServiceService } from '../../services/trainer-service.service';

@Component({
  selector: 'app-people-component',
  templateUrl: './people-component.component.html',
  styleUrls: ['./people-component.component.css']
})
export class PeopleComponentComponent implements OnInit {

  public loggedIn:any;
  public groupId:any;
  public id:any;
  public people:RegisterUser[]=[];
  public class:any;
  public user:any;
  public stud:any;
  public feed:any;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private ms:MainserviceService,private route:ActivatedRoute,private ss:StudentServiceService,private gs:GroupServiceService,private ts:TrainerServiceService,private snackBar:MatSnackBar){

  }
  ngOnInit(): void {
    this.loggedIn = this.ms.isLoggedIn();
    this.id=this.route.snapshot.paramMap.get('userId');
    this.groupId=this.route.snapshot.paramMap.get('groupId');

    
    this.gs.getPeopleData(this.groupId).subscribe(
      data=>{
       
        
        this.people=data;
      },
      error=>{

      }

      
    )

    this.ts.getClassData(this.groupId).subscribe(
      data=>{
        this.class=data;
      },
      error=>{

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

  addFeed(userId:number){
    this.ss.addFeedback(userId,this.feed,this.groupId).subscribe(
      data=>{
        this.snackBar.open("Feedback added successfully","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})

      },
      error=>{
        this.snackBar.open(error["error"],"X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,})
      }
    )
   
  }

  getFeed(){
    this.ss.getStudentData(this.id,this.groupId).subscribe(
      data=>{
         this.stud=data;
      },
      error=>{

      }
    )
  }

}
