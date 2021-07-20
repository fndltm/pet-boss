import { PostFormComponent } from './pages/posts/post-form/post-form.component';
import { Roles } from './resources/enums/roles';
import { PetshopComponent } from './pages/petshop/petshop.component';
import { RoleGuard } from './auth/role.guard';
import { UserComponent } from './pages/user/user.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PostsComponent } from './pages/posts/posts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [RoleGuard],
    data: [Roles.ADMIN, Roles.USER]
  },
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: 'posts/novo',
    component: PostFormComponent,
  },
  {
    path: 'petshop',
    canActivate: [AuthGuard],
    component: PetshopComponent
  },
  {
    path: 'not-found', component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
