import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../services/data/todo-data.service';
import { Todo } from '../user/user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number
  todo: Todo
  username: string

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private token: TokenStorageService
  ) { }

  ngOnInit() {
    this.username = this.token.getUsername();
    console.log(this.username);
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());

    if(this.id != -1){
      this.todoService.retrieveTodo(this.username, this.id).subscribe(
        data => this.todo = data
      )
    }

  }

  saveTodo(){
    if(this.id == -1){
      this.todoService.createTodo(this.username, this.todo).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['user'])
        }
      )
    }
    else{
      this.todoService.updateTodo(this.username, this.id, this.todo).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['user'])
        }
      )
    }
    
  }
}
