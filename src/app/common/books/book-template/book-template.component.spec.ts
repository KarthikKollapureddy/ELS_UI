import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTemplateComponent } from './book-template.component';

describe('BookTemplateComponent', () => {
  let component: BookTemplateComponent;
  let fixture: ComponentFixture<BookTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
