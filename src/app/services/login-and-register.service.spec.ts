import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { LoginUser } from 'src/model/LoginUser.model';

import { LoginAndRegisterService } from './login-and-register.service';
// import { LoginUser } from '../login-user';
import { MainserviceService } from './mainservice.service';

describe('LoginAndRegisterService', () => {
  let service: LoginAndRegisterService;

  let httpmock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
      providers:[LoginAndRegisterService],
    });
    service=TestBed.get(LoginAndRegisterService);
      httpmock=TestBed.get(HttpTestingController)
    //service = TestBed.inject(MainserviceService);
  });

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(LoginAndRegisterService);
  // });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it(`should login and  user  as an observable`,
    async(inject([HttpTestingController,LoginAndRegisterService],
 ( httpClient:HttpTestingController, 
  service:LoginAndRegisterService)=>{
     const   userLog=new LoginUser;
    
     userLog.userName="boina.sarayu@gmail.com";
     userLog.pass="Sarayu@21";
    service.login(userLog).subscribe((e:any)=>{
      expect(e.pass).toBe("Sarayu@21");
    });
    let  req=httpmock.expectOne
    ('http://localhost:8098/elearning/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userLog);
    req.flush(userLog);
    httpmock.verify();
  })));
});
