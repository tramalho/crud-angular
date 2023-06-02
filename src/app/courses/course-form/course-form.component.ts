import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CoursesService } from './../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService,
    private snackBar: MatSnackBar) {
    this.formGroup = this.formBuilder.group( {
      name: '',
      category: ''
    });
  }

  onCancel() {
    throw new Error('Method not implemented.');
    }
    onSubmit() {
      this.courseService.save(this.formGroup.value).subscribe( {
        error: (e) => { this.onError() },
        complete: () => console.info(this)
      }
  )
    }

    private onError() {
      this.snackBar.open("Error saving data.", "", {duration: 1000})
    }
}
