import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerAssignmentsComponent } from './trainer-assignments.component';

describe('TrainerAssignmentsComponent', () => {
  let component: TrainerAssignmentsComponent;
  let fixture: ComponentFixture<TrainerAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
