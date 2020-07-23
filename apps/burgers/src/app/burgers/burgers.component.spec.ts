import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { BurgersComponent } from './burgers.component';
import { BurgersDetailComponent } from './components/burgers-detail/burgers-detail.component';
import { BurgersListComponent } from './components/burgers-list/burgers-list.component';
import { BurgersFacade } from '@thirty/core-state';
import { Burger } from '@thirty/api-interfaces';

const mockBurgersFacade = {
  loadBurgers: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectBurger: (id:string) =>  {
    selectedBurger.id = id;
  }
}

const selectedBurger: Burger = {
  id: '',
  name: '',
  description: '',
  color: '',
  favorite: false,
  icon: '',
  amount: 0,
}

const mockBurger: Burger = {
  id: '0',
  name: 'mock',
  description: '',
  color: '',
  favorite: true,
  icon: '',
  amount: 1,
}

describe('BurgersComponent', () => {
  let component: BurgersComponent;
  let fixture: ComponentFixture<BurgersComponent>;
  let de: DebugElement;
  let burgerFacade: BurgersFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: BurgersFacade, useValue: mockBurgersFacade }
      ],
      declarations: [ 
        BurgersComponent,
        BurgersListComponent,
        BurgersDetailComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurgersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    burgerFacade = de.injector.get(BurgersFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select', () => {
    component.select(mockBurger);
    expect(selectedBurger).toMatchObject(mockBurger);
  });


  it('should open detail', () => {
    component.focusDetail();
    expect(component.detailOpen).toBe(true);
  });

  it('should close detail', () => {
    component.focusoutDetail();
    expect(component.detailOpen).toBe(false);
  });

});
