import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = 'http://localhost:6069/api/todo'

  constructor(private http:Http) { }

  get(){
    return this.http.get(this.url)
  }

  post(post){
    return this.http.post(this.url,post)
  }

  delete(post,link){
    return this.http.delete(this.url + '/' + link)
  }

  put(post,status){
    return this.http.put(this.url + '/' + post.todo_id, status)
  }

  deleteall(clear){
    return this.http.delete(this.url + clear)
  }
}
