import { async, inject, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

import { MainserviceService } from './mainservice.service';
import { RegisterUser } from 'src/model/RegisterUser.model';
import { LoginUser } from 'src/model/LoginUser.model';

describe('MainserviceService', () => {
  let service: MainserviceService;
  let httpmock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
      providers:[MainserviceService],
    });
    service=TestBed.get(MainserviceService);
      httpmock=TestBed.get(HttpTestingController)
    //service = TestBed.inject(MainserviceService);
  });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
it(`should fetch user  as an observable`,
    async(inject([HttpTestingController, MainserviceService],
 ( httpClient:HttpTestingController, 
  service:MainserviceService)=>{
     const   users=new RegisterUser;
     users.id=1;
     users.firstName="Boina";
     users.lastName="Sarayu";
     users.gender="female";
     users.number=7873222609;
     users.dob=new Date('21/3/2000');
     users.role=3;
     users.pass="Sarayu@21";
    service.getUser(1).subscribe((e:any)=>{
      expect(e.pass).toBe("Sarayu@21");
    });
    let  req=httpmock.expectOne
    ('http://localhost:8098/elearning/api/userData/1');
    expect(req.request.method).toBe('GET');
    req.flush(users);
    httpmock.verify();
  })));


  
});
