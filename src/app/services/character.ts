import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(name?: string, status?: string): Observable<any> {

    let params: string[] = [];

    if (name) params.push(`name=${name}`);
    if (status) params.push(`status=${status}`);

    const query = params.length ? `?${params.join('&')}` : '';

    return this.http.get<any>(`${this.baseUrl}${query}`);
  }
}