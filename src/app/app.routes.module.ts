import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
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
  { path: 'main/:id', component: RoomDetailsComponent },
  {
    path: 'new',
    component: CreateNewComponent,
    data: { title: 'Создание города' }
  },
  {
    path: 'admin',
    component: AuthComponent,
    data: { title: 'Панель администрация' }
  },
  {
    path: 'choose-room',
    component: AuthComponent,
    data: { title: 'Выбор зала' }
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
