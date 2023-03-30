import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';
import { MainserviceService } from '../../services/mainservice.service';
import { Student } from '../../../model/student';
import { StudentServiceService } from '../../services/student-service.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit{

  public loggedIn =false;
  public id:any;
  msg='';
  btn:boolean=true;
  arr =["abcd","qrst","qrstui"];
 msg1='';
 public stud=new Student();
  
  subjects:any;
  public groups:any;

  constructor(private route:ActivatedRoute,private ms:MainserviceService,private fb: FormBuilder,private as:AdminServiceService,private ss:StudentServiceService,private router:Router){
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.maxLength(1)]),
      
    });

    
  }
  
  
  ngOnInit(): void {
    
    this.loggedIn = this.ms.isLoggedIn();
    this.id=this.route.snapshot.paramMap.get('userId');
   
    this.ms.getInterest(this.id).subscribe(

      data=>{
        //  this.msg=data;
        
        this.msg=data.test;
      },
      error=>{
         console.log(error);
      }
      

    )

    this.ss.getSuggestions(this.id).subscribe(
      data=>{
         this.groups=data;
         console.log(data);
      },
      error=>{
       this.msg1="Empty";
      }
    )

    

    
  }
   selectedItems!:any[];
   
  form: FormGroup;
  Data: Array<any> = [
    { name: 'Pear', value: 'pear' },
    { name: 'Plum', value: 'plum' },
    { name: 'Kiwi', value: 'kiwi' },
    { name: 'Apple', value: 'apple' },
    { name: 'Lime', value: 'lime' },
  ];
  
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
     this.ms.saveInterest(this.selectedItems,this.id).subscribe(
      data=>{
            this.ngOnInit();
      },
      error=>{

      }
     )
    }
    else{
      alert("Enter 3 interests");
    }

    console.log(this.form.value);
  }

  
  // checkSize(){
  //   console.log(this.form.value.checkArray.length );
    
  //   if(this.form.value.checkArray.length == 1){
     
  //     this.btn=false;
  //   }
  //   alert("Only one interest");
  //   this.btn=true;

  // }
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

  joinGroup(groupId:number){
    this.stud.groupId=groupId;
    this.stud.userId=this.id;
    this.ss.createStudent(this.stud).subscribe(
      data=>{
        this.router.navigate(['/studClass',this.id,groupId]);
      },
      error=>{

      }
    )
  }


}
