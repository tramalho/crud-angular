import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group( {
      name: '',
      category: ''
    });
  }

  onCancel() {
    throw new Error('Method not implemented.');
    }
    onSubmit() {
    throw new Error('Method not implemented.');
    }
}
