import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';
import { Grade } from '../../../model/grade';
import { Group } from '../../../model/group';
import { MainserviceService } from '../../services/mainservice.service';
import { StudentServiceService } from '../../services/student-service.service';
import { TrainerServiceService } from '../../services/trainer-service.service';
import { Subject } from 'src/model/subject';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition  } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trainer-class',
  templateUrl: './trainer-class.component.html',
  styleUrls: ['./trainer-class.component.css']
})
export class TrainerClassComponent implements OnInit{
  public loggedIn =false;
  public groupId:any;
  public id:any;
  public class=new Group;
  public sub:Subject=new Subject();
  public grade=new Grade();
  public grades:any;
  public subjects:Subject[]=[];
  public students:any;
  public rating=0;
  public stars: boolean[] = Array(5).fill(false);
  // public peopleVisible:boolean=false;
  // public quesAndAnsVisible:boolean=false;
  // public fileVisible:boolean=false;
  // public assignVisible:boolean=false;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
verticalPosition: MatSnackBarVerticalPosition = 'top';
showDiv={
  peopleVisible:false,
  quesAndAnsVisible:false,
  fileVisible:false,
  assignVisible:false,
}

  constructor(private snackBar:MatSnackBar,private route:ActivatedRoute,private ms:MainserviceService,private as:AdminServiceService,private ts:TrainerServiceService,private ss:StudentServiceService,private router:Router){  

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
                 for(let i=0;i<this.class.rating;i++){
                   this.stars[0]=true;
                 }
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
    
    console.log(this.class);
    
   
   
  }

  // trainer(){
  //   this.peopleVisible=true;
  //   this.quesAndAnsVisible=false
  //   this.fileVisible=false
  //   this.assignVisible=false
    
  // }
  // qna(){
  //   this.quesAndAnsVisible=true;
  //   this.peopleVisible=false
  //   this.fileVisible=false
  //   this.assignVisible=false
   
  // }
  // file(){
  //   this.fileVisible=true;
  //   this.peopleVisible=false
  //   this.quesAndAnsVisible=false
  //   this.assignVisible=false

   
  // }
  // assign(){
  //   this.assignVisible=true;
  //   this.peopleVisible=false
  //   this.quesAndAnsVisible=false
  //   this.fileVisible=false
  // }

  reload(){
    this.ngOnInit();
  }

  getInfo(){
    this.as.getSubData().subscribe(
      data=>{
        
         this.subjects=Object.keys(data).map(e=>data[e]);
      },
      error=>{
        console.log(error);
      }
    )
    this.as.getGradData().subscribe(
      data=>{
        this.grades=data;
      },
      error=>{
        console.log(error);
      }
    )
    
  }

  editGroup(groupId:number){
    this.ts.editGroup(this.class,this.groupId).subscribe(
      data=>{
           this.ngOnInit();
      },
      error=>{

      }

    )
  }

  @ViewChild('mybtn')
  mybtn!: ElementRef<HTMLElement>;
  triggerFalseClick(){
    let el:HTMLElement=this.mybtn.nativeElement;
    el.click();
  }

  deleteGrp(groupId:number){
    console.log(groupId);
    this.ts.deleteGroup(groupId).subscribe(
      data=>{
        console.log(data);
        this.snackBar.open(data["message"],"X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition})
                  this.triggerFalseClick();
                this.router.navigate(['/trainerGroup',this.id]);
        
      },
      error=>{
        console.log(error);
        
      }
    )
    
  }
  // deleteGroup(groupId:number){
  //   console.log(groupId);
    
  //   this.ts.deleteGroup(groupId).subscribe(
  //     data=>{
  //       console.log(data);
  //       this.snackBar.open(data["message"],"X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
  //         verticalPosition: this.verticalPosition})
  //         this.triggerFalseClick();
  //       this.router.navigate(['/trainerGroup',this.id]);
        

  //     },
  //     error=>{
  //       console.log(error);
        
  //     }
  //   )

  // }

}
