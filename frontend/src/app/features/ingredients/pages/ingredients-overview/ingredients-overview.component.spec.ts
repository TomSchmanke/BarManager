import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsOverviewComponent } from './ingredients-overview.component';

describe('IngredientsOverviewComponent', () => {
  let component: IngredientsOverviewComponent;
  let fixture: ComponentFixture<IngredientsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientsOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
