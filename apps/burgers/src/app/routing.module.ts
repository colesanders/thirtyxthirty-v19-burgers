import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BurgersComponent } from './burgers/burgers.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { UiLoginModule } from '@thirty/ui-login';
import { LoginComponent } from '@thirty/ui-login';
import { BurgersOverviewComponent } from './burgers/components/burgers-overview/burgers-overview.component';

import { LoginGuard } from '@thirty/ui-login';

const routes: Routes = [
  { path: 'burgers', component: BurgersComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: ':id', // child route path
        component: BurgersOverviewComponent // child route component that the router renders
      }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '404', component: FourOhFourComponent},
  { path: '', redirectTo: '/burgers', pathMatch: 'full'},
  { path: '**', component: FourOhFourComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiLoginModule,
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
