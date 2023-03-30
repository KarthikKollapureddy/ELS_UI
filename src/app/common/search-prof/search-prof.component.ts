import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';
import { MainserviceService } from '../../services/mainservice.service';
import { StudentServiceService } from '../../services/student-service.service';
import { TrainerServiceService } from '../../services/trainer-service.service';

@Component({
  selector: 'app-search-prof',
  templateUrl: './search-prof.component.html',
  styleUrls: ['./search-prof.component.css']
})
export class SearchProfComponent implements OnInit{
  public id:any;
  public loggedIn:any;
  public user:any;
  public Age:any;
  public date:any;
  public size:any;
  public groups:any;
   public interest1='';
   public interest2='';
   public interest3='';
   public mode!:number;
   public mof:any;
   trainerGroups:any;
   public subjects:any;

   durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
verticalPosition: MatSnackBarVerticalPosition = 'top';
  getMode: any;
  userId:any;
  actual:any;
  
  selectedItems!:any[];
  form!: FormGroup;
   
  
  constructor(private ms:MainserviceService,private router:Router,private fb: FormBuilder,private route:ActivatedRoute,private ss:StudentServiceService,private snackBar:MatSnackBar,private ts:TrainerServiceService,private as:AdminServiceService){
    
    
  }
  ngOnInit(): void {
    this.loggedIn = this.ms.isLoggedIn();
    this.id=this.route.snapshot.paramMap.get('searchId');
    this.userId=this.route.snapshot.paramMap.get('userId');
    this.ms.getUser(this.id).subscribe(
      data=>{
        this.user=data;
        this.date=new Date(this.user.dob);
        let timeDiff = Math.abs(Date.now() - this.date.getTime());
         this.Age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
      },
      error=>{

      }
    )

    this.ms.getUser(this.userId).subscribe(
      data=>{
        this.actual=data;
        
      },
      error=>{

      }
    )
    this.ss.getGroupData(this.id).subscribe(
      data=>{
        this.groups=data;
        this.size=this.groups.length;
      },
      error=>{
        console.log(error);
      }
    )

    this.ms.getInterestData((this.id)).subscribe(
      data=>{
         
         this.interest1=data.interest1;
         this.interest2=data.interest2;
         this.interest3=data.interest3;
      },
      error=>{
        
        console.log(error);
        
        
      }
    )

    this.ms.checkMode(this.id).subscribe(
      data=>{
       this.getMode=data;
      },
      error=>{

      }
    )
  }

  

  
  
   check(val:number){
    if(this.getMode.val==val){
     
    
      
    }
  }

 getSub(){
    this.as.getSubData().subscribe(
      data=>{
        
         this.subjects=Object.keys(data).map(e=>data[e]);
      },
      error=>{
        console.log(error);
      }
    )
  }

 

  

  

}
