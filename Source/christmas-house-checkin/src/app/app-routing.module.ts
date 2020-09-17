import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { AllusersComponent } from './components/allusers/allusers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adduser', component: AdduserComponent },
  { path: 'allusers', component: AllusersComponent },

   // otherwise redirect to home
   { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
