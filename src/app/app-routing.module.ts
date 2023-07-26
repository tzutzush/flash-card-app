import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './cards/admin/admin.component';
import { UserComponent } from './cards/user/user.component';
import { StudyComponent } from './cards/user/study/study.component';
import { InquiryComponent } from './cards/user/inquiry/inquiry.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'study', component: StudyComponent },
  { path: 'inquiry', component: InquiryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
