import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';

import { AuthComponent } from './components/auth/auth.component';
import { ChooseRoom } from './components/choose-room/choose-room.component';

import { EmptyPage } from './components/empty-route/empty-route.component';
import { EmailCheck } from './components/email-check/email-check.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    data: { title: 'Список городов' }
  },
  {
    path: 'admin',
    component: AuthComponent,
    data: { title: 'Панель администрация' }
  },
  {
    path: 'choose-room',
    component: ChooseRoom,
    data: { title: 'Выбор помещения' }
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
