import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Grade } from 'src/model/grade';
import { Group } from 'src/model/group';
import { AdminServiceService } from '../../services/admin-service.service';
import { MainserviceService } from '../../services/mainservice.service';
import { StudentServiceService } from '../../services/student-service.service';
import { TrainerServiceService } from '../../services/trainer-service.service';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css']
})
export class StudentClassComponent implements OnInit{
  public loggedIn:any;
  public id:any;
  public groupId:any;
  public class:Group=new Group();
  public grade:any;
  public sub:any;
  public stud:any;
  public i=0;
  public students:any;
  public stars: boolean[] = Array(5).fill(false);
  public rating=0;
  
  constructor(private route:ActivatedRoute,private ms:MainserviceService,private fb: FormBuilder,private as:AdminServiceService,private ss:StudentServiceService,private ts:TrainerServiceService){
  
  }
  ngOnInit(): void {
    this.loggedIn = this.ms.isLoggedIn();
    this.id=this.route.snapshot.paramMap.get('userId');
    this.groupId=this.route.snapshot.paramMap.get('groupId');
    this.ts.getClassData(this.groupId).subscribe(
      data=>{
          this.class=data;
          
          this.as.getGrade(this.class.groupGrad).subscribe(
            data=>{
                 this.grade=data;
                 console.log(data);
            },
            error=>{
              console.log(error);
            }
          )

          this.as.getSub(this.class.groupSub).subscribe(
            data=>{
              this.sub=data;
              console.log(data);
            },
            error=>{
              console.log(error)
      
            }
          )

          this.ss.getGroupRating(this.groupId).subscribe(
            data=>{
              var s=0;
              this.students=data;
             for(let i=0;i<this.students.length;i++){
              s=s+this.students[i].rating;
             }
             this.rating=s/this.students.length;
             for(let j=0;j<this.rating;j++){
              this.stars[j]=true;
             }
             
            },
            error=>{
      
            }
          )
          
      },
      error=>{
        console.log(error);
      }
    )

    this.ss.getStudentData(this.id,this.groupId).subscribe(
      data=>{
        this.stud=data;
      },
      error=>{

      }
    )
  }
  
  
  deleteStud(studId:number){
    this.ss.deleteStudent(studId).subscribe(
      data=>{
         
      },
      error=>{

      }
    )
  }

  
  

}
