import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  formGroup: FormGroup;
  private course: Course;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {

    this.course = this.route.snapshot.data["course"]

    this.formGroup = this.formBuilder.group( {
      _id: this.course._id,
      name: this.course.name,
      category: this.course.category
    });

    console.log(this.course)
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
