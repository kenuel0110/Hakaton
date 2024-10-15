import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { CreateNewComponent } from './components/create-new/create-new.component';

import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';

import { EmptyPage } from './components/empty-route/empty-route.component';
import { EmailCheck } from './components/email-check/email-check.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    data: { title: 'Список городов' }
  },
  {
    path: 'new',
    component: CreateNewComponent,
    data: { title: 'Создание города' }
  },
  {
    path: 'auth',
    component: AuthComponent,
    data: { title: 'Войти' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Регистрация' }
  },
  {
    path: 'email-check',
    component: EmailCheck,
    data: { title: 'Подтверждение почты' }
  },
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  {
    path: '**',
    component: EmptyPage,
    data: { title: '404' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
