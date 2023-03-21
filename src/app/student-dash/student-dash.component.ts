import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../login';
import { MainserviceService } from '../mainservice.service';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrls: ['./student-dash.component.css']
})
export class StudentDashComponent implements OnInit{
  log=new Login();
  username='';
  user:any;
  val='';
  public users:any;
  public loggedIn =false;
  constructor(private ms:MainserviceService,private route:ActivatedRoute,private router:Router) { }


  ngOnInit(): void {
    this.loggedIn = this.ms.isLoggedIn();
   
  }
    
  id=this.route.snapshot.paramMap.get('userId');
  logoutUser(){
    this.ms.logout();
    location.href="/login";
    // location.href="/login";
  }

  searchUser(){
    this.ms.getUsers(this.val).subscribe(
      data=>{
      
       
       this.router.navigate(['/search/',this.val]);
      },
      error=>{

      }
    )
  }

}
