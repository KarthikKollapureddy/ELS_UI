import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade } from 'src/model/grade';
import { AdminServiceService } from '../../services/admin-service.service';
import { MainserviceService } from '../../services/mainservice.service';


@Component({
  selector: 'app-admin-grades',
  templateUrl: './admin-grades.component.html',
  styleUrls: ['./admin-grades.component.css']
})
export class AdminGradesComponent implements OnInit{
  public loggedIn =false;
  grades:Grade[] =[];
  msg ="";
  image="";
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private route:ActivatedRoute,private ms:MainserviceService,private adminservice:AdminServiceService,private router:Router,private snackBar: MatSnackBar){}


  
  
  ngOnInit(): void {
    console.log(this.grades);
    
    this.loggedIn = this.ms.isLoggedIn();
    this.adminservice.getGradData().subscribe(
      data=>{
        
      //   var myJsonString = JSON.stringify(data);
      //   var myJsonObject = JSON.parse(myJsonString);
      //   for (let index = 0; index < myJsonObject.length - 1; index++) {
      //      var getGradName = myJsonObject[index].gradName;

      //      var obj = {};
      //      var myjsString = JSON.stringify(obj);
      //      var myObject = JSON.parse(myjsString);
      //      myObject.gradName = getGradName;
          
          
      // }
      this.grades=data;
      if(this.grades.length != 0 || this.grades == null){
        this.image="assets/img/empty.jpg"
      }
      this.image="assets/img/grades.jpeg"
      
    },
      error=>{
        this.image="assets/img/empty.jpg"
        console.log("Not found");
        this.msg="Empty";
        
      }

      

    )
   
  }
  i=0;
  id=this.route.snapshot.paramMap.get('userName');

 grad =new Grade();
 name!:string;
 refresh(){
  this.ngOnInit();
}
 add(){
  if(
    this.grad.gradName === null ||
    
    this.grad.gradName === undefined ||
    
    this.grad.gradName === ''){
      alert("Please enter required details");
    }
  this.adminservice.addGrade(this.grad).subscribe(
    data=>{
      console.log("response received....");
      // this.router.navigate(['adminGrad',this.id]);
      this.image="assets/img/empty.jpg"

      this.ngOnInit();
      this.snackBar.open("Successfully added!!","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
      this.grad.gradName=""
    },
    error=>{
      console.log("error occured...");
      this.ngOnInit();
      this.snackBar.open("This grade already exists !!Try with adding different grade","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
     
      
    }

  )
}

edit(gradId : number){
  if(
    this.name === null ||
    
    this.name === undefined ||
    
    this.name === ''){
      alert("Please enter required details");
    }
  this.adminservice.editGrade(gradId,this.name).subscribe(
    data=>{
      console.log("response received....");
      //this.router.navigate(['adminGrad',this.id]);
      // this.ngOnInit();
      this.snackBar.open("Successfully added!!","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
     
      
      
    },
    error=>{
      console.log("error occured...");
      this.router.navigate(['adminGrad',this.id]);
      this.ngOnInit();
      this.snackBar.open("This grade already exists !!Try with adding different grade","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
     
      
    }
    

  )
}

// delete(gradId : number){
  
//   this.adminservice.deleteGrade(gradId).subscribe(
//     data=>{
//       console.log("response received....");
//       // this.ngOnInit();
//       this.snackBar.open("Successfully deleted!!","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
//         verticalPosition: this.verticalPosition})
      
//     },
//     error=>{
//       console.log("error occured...");
//       this.ngOnInit();
//       this.snackBar.open("Problem occured!","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
//         verticalPosition: this.verticalPosition})
     
      
//     }
    

//   )
// }
delete(gradId : number){
  
  this.adminservice.deleteGrade(gradId).subscribe(
    data=>{
      this.ngOnInit()
      console.log("response received....");
     
      this.snackBar.open(data["message"],"X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
        
      
    },
    error=>{
      this.ngOnInit()
      console.log(error["error"]);
      this.snackBar.open(error["error"],"X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
     
      
    }
    

  )
}





}
