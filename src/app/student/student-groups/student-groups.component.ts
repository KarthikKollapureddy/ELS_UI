import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';
import { MainserviceService } from '../../services/mainservice.service';
import { StudentServiceService } from '../../services/student-service.service';
import { TrainerServiceService } from '../../services/trainer-service.service';

@Component({
  selector: 'app-student-groups',
  templateUrl: './student-groups.component.html',
  styleUrls: ['./student-groups.component.css']
})
export class StudentGroupsComponent {
    
  public loggedIn =false;
  public id:any;
  public groups:any;
  public msg='';
  

  constructor(private route:ActivatedRoute,private ms:MainserviceService,private as:AdminServiceService,private ts:TrainerServiceService,private ss:StudentServiceService){

  }
  
  ngOnInit(): void {
    
    this.loggedIn = this.ms.isLoggedIn();
    this.id=this.route.snapshot.paramMap.get('userId');

    this.ss.getGroupData(this.id).subscribe(
      data=>{
        console.log("hi "+this.groups);
        
        this.groups=data;
        console.log(this.groups);
      },
      error=>{
        this.msg="Empty";
      }
    )
  }


}
