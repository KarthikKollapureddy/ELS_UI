import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUser } from 'src/model/LoginUser.model';

import { MainserviceService } from '../../services/mainservice.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  log=new LoginUser();
  username='';
  user:any;
  val='';
  public loggedIn =false;
  constructor(private ms:MainserviceService,private route:ActivatedRoute,private router:Router) { }


  ngOnInit(): void {
    this.loggedIn = this.ms.isLoggedIn();
   
  }
    

  logoutUser(){
    this.ms.logout();
    location.href="/login";
    // location.href="/login";
  }
  id=this.route.snapshot.paramMap.get('userId');

}
