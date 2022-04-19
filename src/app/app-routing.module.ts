import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { StartpageComponent } from './startpage/startpage.component';

const routes: Routes = [
  {path: '', component: StartpageComponent},
  {path: 'doctor-detail', component: DoctorDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
