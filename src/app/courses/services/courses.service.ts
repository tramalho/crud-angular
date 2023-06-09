import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { first, tap, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = "api/courses"

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      tap(courses => console.log("results: "+ courses))
    );
  }

  save(course: Course) {

    if(course._id) {
      return this.update(course)
    }

    return this.httpClient.post(this.API, course)
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`)
  }

  delete(course: Course) {
    return this.httpClient.delete(`${this.API}/${course._id}`)
  }

  private update(course: Course) {
    return this.httpClient.put<Course>(`${this.API}/${course._id}`, course)
  }
}
