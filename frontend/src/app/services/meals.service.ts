import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteResult, Meal } from '../models';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environment';

const URL = `${environment.apiUrl}/v1/meals`;

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Meal[]> {
    return this.http.get<Meal[]>(URL);
  }

  add(data: Partial<Meal>): Observable<Meal> {
    return this.http.post<Meal>(URL, data);
  }

  delete(id: string): Observable<DeleteResult> {
    return this.http.delete<DeleteResult>(`${URL}/${id}`);
  }

  update(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${URL}/${meal._id}`, meal);
  }
}
