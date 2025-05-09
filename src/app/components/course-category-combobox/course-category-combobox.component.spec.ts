import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoryComboboxComponent } from './course-category-combobox.component';

describe('CourseCategoryComboboxComponent', () => {
  let component: CourseCategoryComboboxComponent;
  let fixture: ComponentFixture<CourseCategoryComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCategoryComboboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCategoryComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
