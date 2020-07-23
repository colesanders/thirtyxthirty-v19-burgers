import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Burger } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://thirtyxthirty-lessons.herokuapp.com/burgers';


@Injectable({
  providedIn: 'root'
})
export class BurgersService {

  constructor(private http: HttpClient) { }

  all(): Observable<[Burger]>{
    return this.http.get<[Burger]>(BASE_URL);
  }

  byId(id): Observable<Burger>{
    return this.http.get<Burger>(this.getUrl(id));
  }

  create(burger: Burger): Observable<Burger>{
    return this.http.post<Burger>(BASE_URL, burger);
  }

  update(burger: Burger): Observable<Burger>{
    return this.http.put<Burger>(this.getUrl(burger.id), burger);
  }

  delete(id): Observable<Burger>{
    return this.http.delete<Burger>(this.getUrl(id));
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
