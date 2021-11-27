import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { JwtUserI, UserI } from '@model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly API: string = 'http://localhost:3000/api';
  constructor(private httpClient: HttpClient) {}

  login(user: UserI): Observable <JwtUserI> {
    return this.httpClient.post<JwtUserI>(`${this.API}/login`, user)
      .pipe(tap(
        (res: JwtUserI) => {
          if (res) {
            // save token
            this.saveToken(res.body.user);
          }
        })
      );
  }

  register(user: UserI): Observable <JwtUserI> {
    return this.httpClient.post<JwtUserI>(`${this.API}/register`, user)
      .pipe(tap(
        (res: JwtUserI) => {
          if (res) {
            // save token
            this.saveToken(res.body.user);
          }
        })
      );
  }

  private saveToken(username: string){
    sessionStorage.setItem('username', username)
  }
  public getToken(){
    return sessionStorage.getItem('username')
  }
  public getId(){
    return sessionStorage.getItem('id')
  }

}
