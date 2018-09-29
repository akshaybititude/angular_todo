import { TodoService } from './../todo.service';
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
  constructor(private service: TodoService) {
    this.service.get()
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
    this.service.get()
      .subscribe(response => {
        this.posts = response.json();
        console.log(response.json());
      });
  }

  getActivePost() {
    this.service.get()
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
    this.service.get()
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

    this.service.post(post)
      .subscribe(response => {
        post['todo_id'] = response.json().todo_id;
        this.posts.push(post);
        this.count++;
      });
  }

  deletePost(post) {
    console.log(post);
    this.service.delete(post,post.todo_id).subscribe(response => {
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
      this.service.put(post,({ status: 1 }))
        .subscribe(response => {                                 //Updatedata
          console.log(response.json())
          this.service.get()
            .subscribe(response => {
              this.posts = response.json();
              this.count--;
            });
        });
    }
    else {
      this.service.put(post,({ status: 0 }))
        .subscribe(response => {                                 //Updatedata
          console.log(response.json())
          this.service.get()
            .subscribe(response => {
              this.posts = response.json();
              this.count++;
            });
        });
    }
  }

  deleteAllPost() {
    console.log();
    this.service.delete(null,'/status/1').subscribe(response => {
      console.log(response.json());
      this.service.get()
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
    this.service.put(post, ({ title: post.title, status:1 }))
      .subscribe(response => {                                 //Updatedata
        console.log(response.json());
        this.service.get()
          .subscribe(response => {
            this.posts = response.json();
          });
      });
    }
    else{
      this.service.put(post, ({ title: post.title, status:0 }))
      .subscribe(response => {                                 //Updatedata
        console.log(response.json());
        this.service.get()
          .subscribe(response => {
            this.posts = response.json();
          });
      });
    }
  }
}