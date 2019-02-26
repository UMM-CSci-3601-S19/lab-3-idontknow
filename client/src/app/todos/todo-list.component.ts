import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: []
})

export class TodoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: string;
  public todoBody: string;
  public todoId: string;



  // Inject the UserListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private todoListService: TodoListService) {

  }

  public filterTodos(searchOwner: string, searchStatus: string, searchBody: string): Todo[] {

    this.filteredTodos = this.todos;

    // Filter by owner
    if (searchOwner != null) {
      searchOwner = searchOwner.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchOwner || todo.owner.toLowerCase().indexOf(searchOwner) !== -1;
      });
    }

    // Filter by body
    if (searchBody != null) {
      searchBody = searchBody.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchBody || todo.body.toLowerCase().indexOf(searchBody) !== -1;
      });
    }


    // Filter by status
    if (searchStatus != null) {
      if (searchStatus === 'incomplete') {
        this.filteredTodos = this.filteredTodos.filter((todo: Todo) => {
          return !searchStatus || (todo.status === false)
        })
      }
      else if (searchStatus === 'complete') {
        this.filteredTodos = this.filteredTodos.filter( (todo: Todo) => {
          return !searchStatus || (todo.status === true)
        })
      }
    }
    return this.filteredTodos;
  }


  refreshTodos(): Observable<Todo[]> {
    // Get Users returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const todos: Observable<Todo[]> = this.todoListService.getTodos();
    todos.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
        this.filterTodos(this.todoOwner, this.todoStatus, this.todoBody);
      },
      err => {
        console.log(err);
      });
    return todos;
  }


  ngOnInit(): void {
    this.refreshTodos();
  }
}
