import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAndRegisterService } from '../../services/login-and-register.service';

import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoginUser } from 'src/model/LoginUser.model';
import { RegisterUser } from 'src/model/RegisterUser.model';
import { MainserviceService } from '../../services/mainservice.service';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor(private service:LoginAndRegisterService,private mainservice:MainserviceService,private router:Router,private snackBar: MatSnackBar) { 
    
  }


  userLogin = new LoginUser;
  userSignup = new RegisterUser;
  // regUsers:RegisterUser[]=[]
  form !: FormGroup;
  form1 !: FormGroup;
  isPasswordVisible:boolean=true;
  isPasswordNotVisible:boolean=false;
  pass:string="password"
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
verticalPosition: MatSnackBarVerticalPosition = 'top';
// validateDOB(e:any){
//   let year = new Date(e).getFullYear();
//   let today = new Date().getFullYear();
//   if(today - year >= 100){
//    this.msg = 'Are you from future';
//    console.log(this.msg);
//   }
// }
  ngOnInit(): void {
 
    
    this.form = new FormGroup(
      {
        email:new FormControl(this.userLogin.userName,[
          Validators.email,
          Validators.required
        ]),
        password:new FormControl(this.userLogin.pass,[
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&)(}{][:;<>,.?/~_+-=|]).{8,15}$')

        ])
      }
    )
    
    this.form1 = new FormGroup({
      fname : new FormControl(this.userSignup.firstName,[
        Validators.minLength(4),
        Validators.maxLength(18),
        Validators.required
      ]),
      lname : new FormControl(this.userSignup.lastName,[
        Validators.minLength(4),
        Validators.maxLength(18),
        Validators.required
      ]),

      email : new FormControl(this.userSignup.userName,[
        Validators.email,
        Validators.required,
      ]),
      number : new FormControl(this.userSignup.number,[
        Validators.maxLength(10),
        Validators.required,
        Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')
      ]),

      dob : new FormControl(this.userSignup.dob,[
        Validators.required,
      ]),
      gender: new FormControl(this.userSignup.gender,[
        Validators.required,
      ]),
    
      password : new FormControl(this.userSignup.pass,[
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&)(}{][:;<>,.?/~_+-=|]).{8,32}$')
      ]),

  })


  }

  roleStudent(){
    this.userSignup.role=3;
    console.log("role:"+3);
    
    
    
  }
  roleTrainer(){
    this.userSignup.role=2;
    console.log("role:"+2);

  }
  passwordVisible(){
    if(this.isPasswordVisible){
      this.pass="text"
      this.isPasswordVisible=false;
      this.isPasswordNotVisible=true;   
     
    }
    else{
      this.isPasswordNotVisible=false;
      this.isPasswordVisible=true;
      this.pass="password"
     
      
    }
  }

  submitReg(){
    
    
    if(this.userSignup.role==-1){
      this.form1.reset();
      this.snackBar.open("Signup failed, choose a role and sign up again.","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition})
    }
    else{

    this.service.registerUser(this.userSignup).subscribe(
      data=>{
        
        
        console.table(data);
        this.snackBar.open("User registered sucesfully, You can now login.","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})
          this.form1.reset();
        
        
      },
      error=>{

        let myJsonErr = JSON.parse(JSON.stringify(error))
        console.log(error);
        this.snackBar.open(error["error"],"X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition})

        
      }
    )
  }
}

  submitLogin(){
    this.service.login(this.userLogin).subscribe(
      data=>{
        // let notFound = true
        // this.regUsers=data;
        // for(let i = 0;i<this.regUsers.length;i++){

        //   if(this.userLogin.userName==this.regUsers[i].userName && this.userLogin.pass==this.regUsers[i].pass){
        //     console.log("user logged in:" + this.regUsers[i]);
        //     notFound = false
        //     this.snackBar.open("login succesfull","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        //       verticalPosition: this.verticalPosition,})
        //       // this.router.navigate(["path"])
        //   }
        //   if(notFound){
        //     this.snackBar.open("login error","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
        //       verticalPosition: this.verticalPosition,})
        //   }
          
        // }
        // console.log(data)
        //let myJson = JSON.parse(JSON.stringify(data))
        console.log(data)
        // console.log(myJson[0]["token"]);
        // var tok=myJson[0]["token"];
        
        this.snackBar.open("login succesfull","X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,})
              this.mainservice.logUser(data.token);
              this.mainservice.getUserData(this.userLogin.userName).subscribe(
                data=>{
                  if(data.role==1){
                    this.router.navigate(['/admin',data.userId]);
                  }
                 if(data.role==2){
                    this.router.navigate(['/trainer',data.userId]);
                  }
                  if(data.role == 3){
                    this.router.navigate(['/student',data.userId]);
                  }
      }
              )
    }
      
    

      ,
      error=>{
        console.log(error);
        this.snackBar.open(error["error"],"X",{duration:this.durationInSeconds*1000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,})
        
      }
              )
    
    

  }


  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  get fname() { return this.form1.get('fname')!; }
  get lname() { return this.form1.get('lname')!; }
  get regEmail() { return this.form1.get('email')!; }
  get regPassword() { return this.form1.get('password')!; }
  get number(){return this.form1.get('number')!;}
  get dob(){return this.form1.get('dob')!;}
  get gender(){return this.form1.get('gender')!;}
  


}

