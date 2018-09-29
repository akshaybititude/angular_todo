import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  isInput=false;
  count = 0;
  posts: any[];
  private url = 'http://localhost:6069/api/todo'
  constructor(private http: Http) {
    http.get(this.url)
      .subscribe(response => {
        this.posts = response.json();

        for (var i = 0; i < response.json().length; i++) {
          if (response.json()[i].status == 0) {
            this.count++;
          }
        }
      });
  }

  getPost(post) {
    console.log(post);
    this.http.get(this.url)
      .subscribe(response => {
        this.posts = response.json();
        console.log(response.json());
      });
  }

  getActivePost() {
    this.http.get(this.url)
      .subscribe(response => {
        let j = 0;
        for (let i = 0; i < response.json().length; ++i) {
          if (response.json()[i].status === 0) {
            this.posts.splice(j, 1, response.json()[i]);
            ++j;
          }
        } this.posts = this.posts.slice(0, j);

        console.log(response.json());
      });
  }

  getCompletedPost() {
    this.http.get(this.url)
      .subscribe(response => {
        let j = 0;
        for (let i = 0; i < response.json().length; ++i) {
          if (response.json()[i].status === 1) {
            this.posts.splice(j, 1, response.json()[i]);
            ++j;
          }
        } this.posts = this.posts.slice(0, j);
        console.log(response.json());
      });
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value, status: 0 };
    input.value = '';

    this.http.post(this.url, post)
      .subscribe(response => {
        post['todo_id'] = response.json().todo_id;
        this.posts.push(post);
        this.count++;
      });
  }

  deletePost(post) {
    console.log(post);
    this.http.delete(this.url + '/' + post.todo_id).subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
      console.log(response.json());
      if (post.status === 0) {
        this.count--;
      }
    },
      (error) => {
        if (error.status === 404) {
          alert('detail already deleted')
        }
      })
  }

  updatePost(post) {
    if (post.status == 0) {
      this.http.put(this.url + '/' + post.todo_id, ({ status: 1 }))
        .subscribe(response => {                                 //Updatedata
          console.log(response.json())
          this.http.get(this.url)
            .subscribe(response => {
              this.posts = response.json();
              this.count--;
            });
        });
    }
    else {
      this.http.put(this.url + '/' + post.todo_id, ({ status: 0 }))
        .subscribe(response => {                                 //Updatedata
          console.log(response.json())
          this.http.get(this.url)
            .subscribe(response => {
              this.posts = response.json();
              this.count++;
            });
        });
    }
  }

  deleteAllPost() {
    console.log();
    this.http.delete(this.url + '/status/1').subscribe(response => {
      console.log(response.json());
      this.http.get(this.url)
        .subscribe(response => {
          this.posts = response.json();
        });
    },
      (error) => {
        if (error.status === 404) {
          alert('detail already deleted')
        }
      })
  }
  
  toggle(index) {
    this.posts[index].isInput = !this.posts[index].isInput;
  }
  
  edit(index, post) {
    this.posts[index].isInput = !this.posts[index].isInput;
    if (this.posts[index].status === 1) {
    this.http.put(this.url + '/' + post.todo_id, ({ title: post.title, status:1 }))
      .subscribe(response => {                                 //Updatedata
        console.log(response.json());
        this.http.get(this.url)
          .subscribe(response => {
            this.posts = response.json();
          });
      });
    }
    else{
      this.http.put(this.url + '/' + post.todo_id, ({ title: post.title, status:0 }))
      .subscribe(response => {                                 //Updatedata
        console.log(response.json());
        this.http.get(this.url)
          .subscribe(response => {
            this.posts = response.json();
          });
      });
    }
  }
}