import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainserviceService } from '../../services/mainservice.service';

import { LoginRegisterComponent } from './login-register.component';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;
  let nameControl;

  // beforeEach(() => {

  //   component = new LoginRegisterComponent(new FormGroup());
   
  //   })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegisterComponent ],
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a form with 1 controls', () => {

    expect(component.form1.contains('fname')).toBe(true);
    
    })
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should make the name control required', () => {

    let nameControl:any = component.form1.get('fname');
  
    nameControl.setValue('');
   
    expect(nameControl.valid).toBeFalsy();
   
    })
});
