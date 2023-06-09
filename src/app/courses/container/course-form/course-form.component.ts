import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from './../../model/course';
import { Lesson } from '../../model/lesson';

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

    console.log(this.course)

    this.formGroup = this.formBuilder.group( {
      _id: this.course._id,
      name: new FormControl(this.course.name,
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]),
      category: new FormControl(this.course.category, [
        Validators.required
      ]),
      lessons: this.formBuilder.array(this.retrieveLessons(this.course))
    });

    console.log(this.course)
  }

  getErrorMessage(fieldName: string) {
    const field = this.formGroup.get(fieldName)

    if(field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors["minlength"]["requiredLength"] : 3;
      return `Min length chars is ${requiredLength}`;
    }

    if(field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors["maxlength"]["requiredLength"] : 100;
      return `Max length chars is ${requiredLength}`;
    }

    return "Required field";
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

  getLessonsFormArray() {
    return (<UntypedFormArray>this.formGroup.get("lessons")).controls;
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

    private createLesson(lesson: Lesson = { id: "", name: "", url: ""} ) {
      return this.formBuilder.group({
        id: lesson.id,
        name: lesson.name,
        url: lesson.url
      })
    }

    private retrieveLessons(course: Course) {
        const lessons = []

        if(course?.lessons) {
          course.lessons.forEach( l => lessons.push(this.createLesson(l)))
        } else {
          lessons.push(this.createLesson())
        }

        return lessons
    }
}
