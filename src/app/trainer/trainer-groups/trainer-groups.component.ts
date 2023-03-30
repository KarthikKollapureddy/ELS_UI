import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade } from 'src/model/grade';
import { Group } from 'src/model/group';
import { Subject } from 'src/model/subject';
import { AdminServiceService } from '../../services/admin-service.service';
import { MainserviceService } from '../../services/mainservice.service';
import { TrainerServiceService } from '../../services/trainer-service.service';

@Component({
  selector: 'app-trainer-groups',
  templateUrl: './trainer-groups.component.html',
  styleUrls: ['./trainer-groups.component.css']
})
export class TrainerGroupsComponent implements OnInit{

  public loggedIn =false;
  public id:any;
  public groups:Group[]=[];
  public msg='';
  subjects:Subject[]=[]
  classes:Grade[]=[]
  constructor(private router:Router,private adminService:AdminServiceService,private route:ActivatedRoute,private ms:MainserviceService,private as:AdminServiceService,private ts:TrainerServiceService){

  }


  ngOnInit(): void {
    
    this.loggedIn = this.ms.isLoggedIn();
    this.id=this.route.snapshot.paramMap.get('userId');

    this.ts.getGroupData(this.id).subscribe(
      data=>{
        this.groups=data;
        console.log(this.groups);
        this.adminService.getSubData().subscribe(
          data=>{
            console.log(data);
            
            this.subjects=data
          },
          error=>{
            console.log(error);
            
          }
        )
        this.adminService.getGradData().subscribe(
          data=>{
            console.log(data);
            this.classes=data;
            
          },
          error=>{
            console.log(error);
            
          }
        )

      },
      error=>{
        console.log(error);
        
        this.msg="Empty";
      }
    )
  }


}
