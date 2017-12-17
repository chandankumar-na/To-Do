import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { ToDoList } from './../interfaces/toDoList';
@Injectable()
export class AppService {
  baseURL = 'http://localhost:3000';

  public newSubject = new Subject<any>();
  authorized: boolean;
  constructor(private http: Http) { }

  fetchToDo(todo_task) {
      const body = JSON.stringify(todo_task);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post(`${this.baseURL}/api/fetchToDo`, body, { headers: headers })
        .map((response: Response) => response.json());
  }

  addToDo(item: any) {
    const body = JSON.stringify(item);
    // console.log("addToDo()"+body)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/addToDo`, body, { headers: headers })
      .map((response: Response) => response.json());
  }


  deleteToDo(item) {
    const body = JSON.stringify({ "todo_id": item });
    // console.log("deleteToDo()"+body)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/deleteToDo`, body, { headers: headers })
      .map((response: Response) => response.json());
  }


  updateToDo(details:ToDoList) {
    const body = JSON.stringify(details);
    // console.log("updateToDo()"+body)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/updateToDo`, body, { headers: headers })
      .map((response: Response) => response.json());
  }
  updateToDoMove(details:ToDoList) {
    const body = JSON.stringify(details);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/moveTo`, body, { headers: headers })
      .map((response: Response) => response.json());
  }

  updateDate(details:ToDoList) {
    const body = JSON.stringify(details);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/updateDate`, body, { headers: headers })
      .map((response: Response) => response.json());
  }
  
  
  setAuthorized(_authorized) {
    this.authorized = _authorized;
  }

  isAuthorized() {
    return this.authorized;
  }

  id: ToDoList;
  setToDoId(_id:ToDoList) {
    this.id = _id;
  }
  getToDoId() {
    return this.id
  }
}
