import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

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
    private snackBar: MatSnackBar,
    private location: Location) {
    this.formGroup = this.formBuilder.group( {
      name: '',
      category: ''
    });
  }

  onCancel() {
    this.location.back()
  }

    onSubmit() {
      this.courseService.save(this.formGroup.value).subscribe( {
        error: (e) => this.onError(),
        complete: () => this.onSuccess()
      }
  )
    }

    private onSuccess() {
      this.showSnackBar("Success saving data.")
      this.onCancel()
    }

    private onError() {
      this.showSnackBar("Error saving data.")

    }

    private showSnackBar(message: string) {
      this.snackBar.open(message, "", {duration: 1000})
    }
}
