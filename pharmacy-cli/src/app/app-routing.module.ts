import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmaciasComponent } from './farmacias/farmacias.component';


const routes: Routes = [{ path: 'farmacias', component: FarmaciasComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
