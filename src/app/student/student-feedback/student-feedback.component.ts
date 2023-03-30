import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, OnSameUrlNavigation } from '@angular/router';
import { MainserviceService } from '../../services/mainservice.service';
import { StudentServiceService } from '../../services/student-service.service';

@Component({
  selector: 'app-student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrls: ['./student-feedback.component.css']
})
export class StudentFeedbackComponent implements OnInit {

  public loggedIn =false;
  public id:any;
  public groups:any;
  public msg='';
  public groupId!:number;
  public val=0;

  constructor(private ms:MainserviceService,private route:ActivatedRoute,private ss:StudentServiceService){

  }

  ngOnInit(): void {
    this.loggedIn = this.ms.isLoggedIn();
    this.id=this.route.snapshot.paramMap.get('userId');
    this.ss.getGroupData(this.id).subscribe(
      data=>{
        this.groups=data;
        console.log(this.groups);
      },
      error=>{
        this.msg="Empty";
      }
    )
  }

  addRating(){
    if(this.groupId == null  || this.groupId == undefined || this.val==0){
      alert("Fill");
    }
    else{
      this.ss.addRate(this.id,this.groupId,this.val).subscribe(
        data=>{

        },
        error=>{
          
        }
      )
    }

  }
  public stars: boolean[] = Array(5).fill(false);

  public rate(rating: number) {
    console.log('rating', rating);
    this.stars = this.stars.map((_, i) => rating > i);
    console.log('stars', this.stars);
    this.val=rating;
  }

}
