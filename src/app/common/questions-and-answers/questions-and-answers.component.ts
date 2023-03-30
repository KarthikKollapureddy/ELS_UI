import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { GroupServiceService } from '../../services/group-service.service';
import { MainserviceService } from '../../services/mainservice.service';
import { Question } from '../../../model/question';
import { StudentServiceService } from '../../services/student-service.service';
import { TrainerServiceService } from '../../services/trainer-service.service';
import { Answer } from '../../../model/answer';

@Component({
  selector: 'app-questions-and-answers',
  templateUrl: './questions-and-answers.component.html',
  styleUrls: ['./questions-and-answers.component.css']
})
export class QuestionsAndAnswersComponent implements OnInit{

  public loggedIn:any;
  public id:any;
  public groupId:any;
  public questions:any;
  public msg='';
  public val!:String;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
verticalPosition: MatSnackBarVerticalPosition = 'top';
  public ques=new Question;
  public ans=new Answer();
  public questionName:any;
  public answers:any;
  public msg1:any;
  public answerName!:string;
  constructor(private ms:MainserviceService,private route:ActivatedRoute,private ss:StudentServiceService,private gs:GroupServiceService,private ts:TrainerServiceService,private snackBar:MatSnackBar){

  }
  ngOnInit(): void {
    console.log("invoked oninit qna");
    
    this.loggedIn = this.ms.isLoggedIn();
    this.id=this.route.snapshot.paramMap.get('userId');
    this.groupId=this.route.snapshot.paramMap.get('groupId');
    console.log(this.groupId);

    // this.gs.getQuestions(this.groupId).subscribe(
    //   data=>{
        
    //     console.log(data);
        
    //   },
    //   error=>{
    //      this.msg="error";
    //   }
    // )

    this.gs.getQuestions(this.groupId).subscribe(
      data=>{
         this.questions=data;
         console.table(data);
      },
      error=>{
        this.msg='error';
        console.log(error);
        
      }
    )
    
  }

  addQues(){
    this.ques.groupId=this.groupId;
    this.ques.userId=this.id;
    
    console.log(this.ques);
    this.gs.addQuestion(this.ques).subscribe(
       data=>{
        
        this.snackBar.open("Added successfully","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})
          // this.ngOnInit();
          console.log("hiw");
          this.msg=""
          console.log(this.msg);
          
          
       },
       error=>{
        console.log(error);
        
        this.snackBar.open("Problem occured","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,})
       }
    )
  }

  addAns(questionId:number){
    this.ans.questionId=questionId;
    this.ans.userId=this.id;
    this.gs.addAnswer(this.ans).subscribe(
      data=>{
        this.snackBar.open("Added successfully","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})
          this.ngOnInit();
      },
      error=>{
        this.snackBar.open("Problem occured","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,})
      }
    )

  }

  editQues(questionId:number){
   
    
    this.gs.editQuestion(questionId,this.questionName).subscribe(
      data=>{
        this.snackBar.open("Edited successfully","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})
          this.ngOnInit();
      },
      error=>{
        this.snackBar.open("Problem occured","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,})
      }
    )
  }

  editAns(answerId:number){
   
    
    this.gs.editAnswer(answerId,this.answerName).subscribe(
      data=>{
        this.snackBar.open("Edited successfully","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})
          this.ngOnInit();
      },
      error=>{
        this.snackBar.open("Problem occured","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,})
      }
    )
  }

  reload(){
    this.ngOnInit();
  }

    delete(questionId:number){
     
      this.gs.deleteQuestion(questionId).subscribe(
        data=>{
          this.snackBar.open("Deleted successfully","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition})
            // this.ngOnInit();

        },
        error=>{
          this.snackBar.open("Problem occured","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,})
            // this.ngOnInit();

        }
      )
    

  }
  deleteAns(answerId:number){
     
    this.gs.deleteAnswer(answerId).subscribe(
      data=>{
        this.snackBar.open("Deleted successfully","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})
          this.ngOnInit();

      },
      error=>{
        this.snackBar.open("Problem occured","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,})
          this.ngOnInit();

      }
    )
  

}

  getAnswers(questionId:number){
    this.answers=[];
    this.msg1='';
    this.gs.getAnswers(questionId).subscribe(
      data=>{
         this.answers=data;
      },
      error=>{
        
       this.msg1='not found';
      }

    )
  }
    
}
