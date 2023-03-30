import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFavouriteComponent } from './book-favourite.component';

describe('BookFavouriteComponent', () => {
  let component: BookFavouriteComponent;
  let fixture: ComponentFixture<BookFavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookFavouriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
