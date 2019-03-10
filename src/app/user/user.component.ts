import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TodoDataService } from '../services/data/todo-data.service';  
import { TokenStorageService } from '../auth/token-storage.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){

  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  board: string;
  errorMessage: string;

  message : string
  todos: Todo[]

  username: string

  constructor(
      private userService: UserService,
      private todoService: TodoDataService,
      private router: Router,
      private token: TokenStorageService
      ) { }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
    
    this.username = this.token.getUsername();
    console.log(this.username);
    this.refreshTodos(this.username);
  }

  refreshTodos(username){
    this.todoService.retrieveAllTodos(username).subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id){
    console.log(`delete todo ${id}`)
    this.todoService.deleteTodo(this.username, id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} Successful!`
        this.refreshTodos(this.username);
      }

    )
  }

  updateTodo(id){
    console.log(`update ${id}`)
    this.router.navigate(['user',id])
  }

  addTodo(){
    this.router.navigate(['user',-1])
  }

}
