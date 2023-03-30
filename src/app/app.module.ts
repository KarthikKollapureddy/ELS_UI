import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, MaxLengthValidator, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
// import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { TrainerDashComponent } from './trainer/trainer-dash/trainer-dash.component';
import { TrainerHomeComponent } from './trainer/trainer-home/trainer-home.component';
import { StudentDashComponent } from './student/student-dash/student-dash.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { ChangePasswordComponent } from './common/change-password/change-password.component';
import { LoginRegisterComponent } from './common/login-register/login-register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { MatListOptionModule, MatSelectionListModule} from '@angular/material/list';

import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

import { AdminGradesComponent } from './admin/admin-grades/admin-grades.component';
import { AdminSubjectsComponent } from './admin/admin-subjects/admin-subjects.component';
import { TrainerGroupsComponent } from './trainer/trainer-groups/trainer-groups.component';
import { TrainerClassComponent } from './trainer/trainer-class/trainer-class.component';
import { StudentClassComponent } from './student/student-class/student-class.component';
import { StudentGroupsComponent } from './student/student-groups/student-groups.component';
import { PeopleComponentComponent } from './common/people-component/people-component.component';
import { ProfileComponentComponent } from './common/profile-component/profile-component.component';
import { SearchUserComponent } from './common/search-user/search-user.component';
import { SearchProfComponent } from './common/search-prof/search-prof.component';
import { QuestionsAndAnswersComponent } from './common/questions-and-answers/questions-and-answers.component';
import { StudentFeedbackComponent } from './student/student-feedback/student-feedback.component';
import { FileUploadComponent } from './common/file-upload/file-upload.component';
import { TrainerAssignmentsComponent } from './trainer/trainer-assignments/trainer-assignments.component';
import { StudentAssignmentsComponent } from './student/student-assignments/student-assignments.component';
import { StudentTodosComponent } from './student/student-todos/student-todos.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { BookTemplateComponent } from './common/books/book-template/book-template.component';
import { BookContainerComponent } from './common/books/book-container/book-container.component';
import { BookFavouriteComponent } from './common/books/book-favourite/book-favourite.component';
import { BookSearchComponent } from './common/books/book-search/book-search.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminDashComponent,
    AdminHomeComponent,
    TrainerDashComponent,
    TrainerHomeComponent,
    StudentDashComponent,
    StudentHomeComponent,
    ChangePasswordComponent,
    LoginRegisterComponent,
    AdminGradesComponent,
    AdminSubjectsComponent,
    TrainerGroupsComponent,
    TrainerClassComponent,
    StudentClassComponent,
    StudentGroupsComponent,
    PeopleComponentComponent,
    ProfileComponentComponent,
    SearchUserComponent,
    SearchProfComponent,
    QuestionsAndAnswersComponent,
    StudentFeedbackComponent,
    FileUploadComponent,
    TrainerAssignmentsComponent,
    StudentAssignmentsComponent,
    StudentTodosComponent,
    BookTemplateComponent,
    BookContainerComponent,
    BookFavouriteComponent,
    BookSearchComponent,
    
   
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
    MatCardModule,
    MatCheckboxModule,
    
    MatSelectModule
    
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
