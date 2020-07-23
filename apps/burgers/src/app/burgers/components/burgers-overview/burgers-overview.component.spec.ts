import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { BurgersOverviewComponent } from './burgers-overview.component';
import { BurgersFacade, selectBurger } from '@thirty/core-state';

const mockBurgersFacade = {
  loadBurgers: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectBurger: (id:string) => {}
}

describe('BurgersOverviewComponent', () => {
  let component: BurgersOverviewComponent;
  let fixture: ComponentFixture<BurgersOverviewComponent>;
  let de: DebugElement;
  let burgerFacade: BurgersFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurgersOverviewComponent ],
      imports: [
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: BurgersFacade, useValue: mockBurgersFacade }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurgersOverviewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    burgerFacade = de.injector.get(BurgersFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call facade.select', () => {
  //   component.get()
  //   expect(burgerFacade.selectBurger).toBeCalled();
  // });

});
