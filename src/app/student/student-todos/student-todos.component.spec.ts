import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTodosComponent } from './student-todos.component';

describe('StudentTodosComponent', () => {
  let component: StudentTodosComponent;
  let fixture: ComponentFixture<StudentTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
