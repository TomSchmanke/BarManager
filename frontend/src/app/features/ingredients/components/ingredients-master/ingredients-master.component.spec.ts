import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsMasterComponent } from './ingredients-master.component';

describe('IngredientsMasterComponent', () => {
  let component: IngredientsMasterComponent;
  let fixture: ComponentFixture<IngredientsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientsMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
