import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes.module';
import { EmptyPage } from './components/empty-route/empty-route.component';
import { environment } from '../../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmptyPage,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [FirebaseService],
})
export class AppModule { }
