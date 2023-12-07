import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUser} from "./domain.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = 'http://localhost:8080';
  currentUser = signal<IUser>({
    "firstName": "firstName",
    "lastName": "lastName",
    "penName": "penName",
    "email": "email",
    "genre": "genre "
  });
  currentId:string = ""
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  constructor(private http: HttpClient) {
  }

  updateUser(user: IUser) {
    this.currentUser.update(() => user);
  }


  update(user: IUser): IUser {
    let updated: IUser;
    this.http.post<IUser>(this.endpoint, {headers: this.headers}).subscribe(user => updated = user);
    return updated;
  }

  getUsers():Observable<IUser[]>{
    let uri = `${this.endpoint}/users`;
    return  this.http.get<IUser[]>(uri, {headers: this.headers});
  }

  select(name: string): void {
    let uri = `${this.endpoint}/select/${name}`;
    this.http.get<string>(uri, {headers: this.headers}).subscribe(data =>  this.currentId = data);
  }
}
