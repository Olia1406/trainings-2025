import { Component, input, model } from '@angular/core';
import { CourseCategory } from '../../models/course-category.model';

@Component({
  selector: 'app-course-category-combobox',
  imports: [],
  templateUrl: './course-category-combobox.component.html',
  styleUrl: './course-category-combobox.component.scss'
})
export class CourseCategoryComboboxComponent {
  label = input.required<string>();

  value = model.required<CourseCategory>();

  onCategoryChange(category: string): void {
    this.value.set(category as CourseCategory);
  }

}
