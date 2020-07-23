import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { BurgersFacade } from '@thirty/core-state'
import { Burger } from '@thirty/api-interfaces';
import { SnackBarService } from '@thirty/core-data';
import { Animations } from './animations';


@Component({
  selector: 'thirty-burgers',
  templateUrl: './burgers.component.html',
  styleUrls: ['./burgers.component.scss'],
  animations: Animations,
})
export class BurgersComponent implements OnInit {
  burgers$: Observable<Burger[]> = this.burgerFacade.allBurgers$;
  burger$: Observable<Burger> = this.burgerFacade.selectedBurger$;
  detailOpen = false;

  constructor(
    private burgerFacade: BurgersFacade,
    private router: Router,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.burgerFacade.loadBurgers();
    this.burgerFacade.mutations$.subscribe((action: any) => this.refresh(action.type.split(' ')));
  }

  refresh(trigger: string){
    const snackBarMessage = 'Burger ' + trigger[1] + 'd';
    this.focusoutDetail();
    this.snackBarService.openSnackBar(snackBarMessage, 'Okay', 1000);
    this.burgerFacade.resetSelectedBurger();
    this.burgerFacade.loadBurgers();
  }

  focusDetail(){
    this.detailOpen = true;
  }

  focusoutDetail(){
    this.detailOpen = false;
  }

  select(burger: Burger): void{
    this.burgerFacade.selectBurger(burger.id);
    this.focusDetail();
  }

  delete(burger: Burger): void{
    this.burgerFacade.deleteBurger(burger);
  }

  save(burger: Burger): void{
    if(burger.id !== null){
      this.burgerFacade.updateBurger(burger);
    }else {
      this.burgerFacade.createBurger(burger);
    }
  }

  cancel(): void{
    this.focusoutDetail();
    this.router.navigate(['/burgers']);
    this.burgerFacade.resetSelectedBurger();
  }

}
