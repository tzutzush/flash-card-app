import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './cards/admin/admin.component';
import { UserComponent } from './cards/user/user.component';
import { StudyComponent } from './cards/user/study/study.component';
import { InquiryComponent } from './cards/user/inquiry/inquiry.component';
import { userGuard } from './auth/guards/user.guard';
import { adminGuard } from './auth/guards/admin.guard';
import { cardResolver } from './cards/user/resolvers/card.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  { path: 'user', component: UserComponent, canActivate: [userGuard] },
  {
    path: 'study/:category/:index',
    component: StudyComponent,
    canActivate: [userGuard],
    resolve: { studyResolver: cardResolver },
  },
  {
    path: 'inquiry/:category',
    component: InquiryComponent,
    canActivate: [userGuard],
    resolve: { studyResolver: cardResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
