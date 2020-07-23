import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreStateModule } from '@thirty/core-state';
import { CoreDataModule } from '@thirty/core-data';
import { MaterialModule } from '@thirty/material';
import * as fromBurgers from '@thirty/core-state';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';

import { BurgersComponent } from './burgers/burgers.component';
import { BurgersOverviewComponent } from './burgers/components/burgers-overview/burgers-overview.component';
import { BurgersDetailComponent } from './burgers/components/burgers-detail/burgers-detail.component';
import { BurgersListComponent } from './burgers/components/burgers-list/burgers-list.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatChipComponent } from './mat-chip/mat-chip.component';



@NgModule({
  declarations: [
    AppComponent,
    BurgersComponent,
    BurgersOverviewComponent,
    BurgersDetailComponent,
    BurgersListComponent,
    FourOhFourComponent,
    BurgersComponent,
    MatChipComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    CoreStateModule,
    CoreDataModule,
    FormsModule,
    RoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromBurgers.burgersReducer, {}),
    EffectsModule.forRoot([fromBurgers.BurgersEffects]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


