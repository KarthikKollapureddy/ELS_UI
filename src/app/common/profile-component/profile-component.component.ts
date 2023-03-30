import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl, FormBuilder } from '@angular/forms';
//import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';
import { MainserviceService } from '../../services/mainservice.service';
import { StudentServiceService } from '../../services/student-service.service';
import { TrainerServiceService } from '../../services/trainer-service.service';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.css']
})
export class ProfileComponentComponent implements OnInit {

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
  
  
  selectedItems!:any[];
  form!: FormGroup;
   
  
  constructor(private ms:MainserviceService,private router:Router,private fb: FormBuilder,private route:ActivatedRoute,private ss:StudentServiceService,private snackBar:MatSnackBar,private ts:TrainerServiceService,private as:AdminServiceService){
    
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.maxLength(1)]),
      
    });
  }
  ngOnInit(): void {
    this.loggedIn = this.ms.isLoggedIn();
    this.id=this.route.snapshot.paramMap.get('userId');
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

  addMode(){
    this.ms.saveMode(this.id,this.mode).subscribe(
      data=>{
        this.mof=data;
        this.snackBar.open("Mode added successfully","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})
       
      },
      error=>{
        this.snackBar.open(error["error"],"X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,})
      }
    )

    this.ts.getGroupData(this.id).subscribe(
      data=>{
         this.trainerGroups=data;
      },
      error=>{

      }
    )

  }

  editMode(){
    this.ms.updateMode(this.getMode.userId,this.getMode.val).subscribe(
      data=>{
        this.mof=data;
        this.snackBar.open("Mode edited successfully","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})
      },
      error=>{
        this.snackBar.open(error["error"],"X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,})
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

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
     checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
         checkArray.removeAt(i);
        
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    if(this.form.value.checkArray.length==3){
     this.selectedItems=this.form.value.checkArray;
     this.ms.editInterest(this.selectedItems,this.id).subscribe(
      data=>{
            this.ngOnInit();
            this.snackBar.open("Changed successfully","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition})
      },
      error=>{

      }
     )
    }
    else{
      this.snackBar.open("Choose 3 interests","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,})
    }

    console.log(this.form.value);
  }

  editDetails(id:number){
    this.ms.editDetails(this.user,this.id).subscribe(
      data=>{
        this.ngOnInit();
        this.snackBar.open("Changed successfully","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})
      },
      error=>{
        this.snackBar.open("Problem occured","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,})
      }
    )
  }


}
