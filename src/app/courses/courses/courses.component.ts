import { CoursesService } from './../services/courses.service';
import { Component } from '@angular/core';
import { Course } from '../model/course';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]>;

  displayedColumns = ['name', 'category'];

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog
    ) {
    this.courses$ = coursesService.list().pipe(
      catchError((error) => {
        this.onError("error on load courses")
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}
