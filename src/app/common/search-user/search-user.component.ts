import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { MainserviceService } from '../../services/mainservice.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
 
  id:any;
  loggedIn:any;
  user:any;
  users:any;
  val:any;
  constructor(private ms:MainserviceService,private route:ActivatedRoute){
  
  }
  ngOnInit(): void {
    this.loggedIn = this.ms.isLoggedIn();
    this.id=this.route.snapshot.paramMap.get('userId');
    this.val=this.route.snapshot.paramMap.get('val');
    this.ms.getUser(this.id).subscribe(
      data=>{
        this.user=data;
      },
      error=>{

      }
    )

    this.ms.getUsers(this.val).subscribe(
      data=>{
       this.users=data;
       console.log(data);
       
      },
      error=>{

      }
    )
  }

  

}
