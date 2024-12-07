import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/usuarios';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<{ status: boolean; usuarios: User[] }>(this.apiUrl).pipe(
      map(response => {
        const users = response.usuarios || [];
        const user = users.find((u: User) => u.usuario === username && u.contrasena === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }
        return false;
      }),
      catchError(err => {
        console.error('Error en la API:', err);
        return throwError(() => new Error('Error al conectar con la API.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
