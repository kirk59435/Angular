import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FbaCalculatorComponent } from './fba-calculator/fba-calculator.component';
import { KeywordManagementComponent } from './keyword-management/keyword-management.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'fba-calculator',
    component: FbaCalculatorComponent
  },
  {
    path: 'keyword-management',
    component: KeywordManagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
