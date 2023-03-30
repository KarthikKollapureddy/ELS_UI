import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerGroupsComponent } from './trainer-groups.component';

describe('TrainerGroupsComponent', () => {
  let component: TrainerGroupsComponent;
  let fixture: ComponentFixture<TrainerGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
