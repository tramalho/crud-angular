import { CoursesService } from '../../services/courses.service';
import { Component } from '@angular/core';
import { Course } from '../../model/course';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {

  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.refresh();
  }

  private refresh() {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError("error on load courses");
        return of([]);
      })
    );
  }



  private onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(["new"], { relativeTo: this.activatedRoute })
    .catch(error => {
      console.log(error);
    });
  }

  onEdit(course: Course) {
    this.navigate(['edit', course._id]);
  }

  onDelete(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Confirm delete ${course.name}?`,
    });

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if(result) {
        this.delete(course)
      }
    });
  }

  private delete(course: Course) {
    this.coursesService.delete(course).subscribe( {
      error: (e) => this.onError("Error deleting data."),
      complete: () => this.onDeleteSuccess()
      }
    );
  }

  private navigate(commands: any[]) {
    this.router.navigate(commands, { relativeTo: this.activatedRoute })
      .catch(error => {
        console.log(error);
      });
  }

  private onDeleteSuccess() {
    this.refresh()
    this.showSnackBar("Success deleting data.")
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, "x", {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    }
    )
  }
}
