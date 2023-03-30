import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerClassComponent } from './trainer-class.component';

describe('TrainerClassComponent', () => {
  let component: TrainerClassComponent;
  let fixture: ComponentFixture<TrainerClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
