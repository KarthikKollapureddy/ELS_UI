import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { AdminGradesComponent } from './admin/admin-grades/admin-grades.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminSubjectsComponent } from './admin/admin-subjects/admin-subjects.component';
import { AuthServiceService } from './services/auth-service.service';
import { ChangePasswordComponent } from './common/change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './common/login-register/login-register.component';
// import { LoginComponent } from './login/login.component';
import { ProfileComponentComponent } from './common/profile-component/profile-component.component';
// import { RegisterComponent } from './register/register.component';
import { SearchProfComponent } from './common/search-prof/search-prof.component';
import { SearchUserComponent } from './common/search-user/search-user.component';
import { StudentClassComponent } from './student/student-class/student-class.component';
import { StudentFeedbackComponent } from './student/student-feedback/student-feedback.component';
import { StudentGroupsComponent } from './student/student-groups/student-groups.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { StudentTodosComponent } from './student/student-todos/student-todos.component';
import { TrainerClassComponent } from './trainer/trainer-class/trainer-class.component';
import { TrainerGroupsComponent } from './trainer/trainer-groups/trainer-groups.component';
import { TrainerHomeComponent } from './trainer/trainer-home/trainer-home.component';
import { BookSearchComponent } from './common/books/book-search/book-search.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [

  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
    },
    {
      path:'login',
      component:LoginRegisterComponent,
      pathMatch:'full'
    },
    {
      path:'register',
      component:LoginRegisterComponent,
      pathMatch:'full'
    },

    {
      path:'admin/:userId',
      component:AdminHomeComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'adminGrad/:userId',
      component:AdminGradesComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'trainer/:userId',
      component:TrainerHomeComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'student/:userId',
      component:StudentHomeComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'reset/:userId',
      component:ChangePasswordComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'adminSub/:userId',
      component:AdminSubjectsComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'trainerGroup/:userId',
      component:TrainerGroupsComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'trainerClass/:userId/:groupId',
      component:TrainerClassComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'studClass/:userId/:groupId',
      component:StudentClassComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'studGroups/:userId',
      component:StudentGroupsComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'studFeed/:userId',
      component:StudentFeedbackComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'userProfile/:userId',
      component:ProfileComponentComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'search/:userId/:val',
      component:SearchUserComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'searchProf/:userId/:searchId',
      component:SearchProfComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'myTodo/:userId',
      component:StudentTodosComponent,canActivate:[AuthServiceService]
      
    },
    {
      path:'book-search/:userId',
      component:BookSearchComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
