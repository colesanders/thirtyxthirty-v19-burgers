import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Burger } from '@thirty/api-interfaces';
import { BurgersFacade } from '@thirty/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'thirty-burgers-overview',
  templateUrl: './burgers-overview.component.html',
  styleUrls: ['./burgers-overview.component.scss']
})
export class BurgersOverviewComponent implements OnInit, OnChanges {
  burger$: Observable<Burger> = this.burgerFacade.selectedBurger$;


  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private burgerFacade: BurgersFacade
  ) { }

  ngOnInit(): void {
    this.get();
    this.burgerFacade.mutations$.subscribe((action: any) => this.get());

  }

  ngOnChanges(): void{
    this.get();
  }


  get(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.burgerFacade.selectBurger(id);
  }

  close(){
    this.burgerFacade.resetSelectedBurger();
    this.router.navigate(['/burgers']);
  }
}
