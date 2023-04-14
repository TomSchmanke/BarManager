import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsGroupEditComponent } from './ingredients-group-edit.component';

describe('IngredientsGroupEditComponent', () => {
  let component: IngredientsGroupEditComponent;
  let fixture: ComponentFixture<IngredientsGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientsGroupEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
