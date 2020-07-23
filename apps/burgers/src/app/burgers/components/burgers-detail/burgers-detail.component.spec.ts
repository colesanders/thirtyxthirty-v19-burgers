import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';

import { BurgersDetailComponent } from './burgers-detail.component';

describe('BurgersDetailComponent', () => {
  let component: BurgersDetailComponent;
  let fixture: ComponentFixture<BurgersDetailComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurgersDetailComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurgersDetailComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the formGroup', () => {
    component.createFormGroup();
    expect(component.burgerForm).toBeTruthy();
  });

  it('should reset formGroup', () => {
    component.cancel();
    expect(component.burgerForm.value).toMatchSnapshot();
  });


});
