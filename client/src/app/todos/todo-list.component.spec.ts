import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import {CustomModule} from '../custom.module';

import {Todo} from './todo';
import {TodoListComponent} from './todo-list.component';
import {TodoListService} from './todo-list.service';

describe('Todo list', () => {

  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.of([
        {
          id: 'kurt_id1',
          owner: 'Kurt',
          status: true,
          body: 'In the sun I feel as one',
          category: 'stuff'
        },
        {
          id: 'layne_id1',
          owner: 'Layne',
          status: true,
          body: 'They come to snuff the rooster',
          category: 'things'
        },
        {
          id: 'chris_id1',
          owner: 'Chris',
          status: false,
          body: 'Show me how to live',
          category: 'things'
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListComponent],
      // providers:    [ TodoListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]

    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(todoList.todos.length).toBe(3);
  });

  it('contains an owner named \'Kurt\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Kurt')).toBe(true);
  });

  it('contain a user named \'Layne\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Layne')).toBe(true);
  });

  it('contain a user named \'Chris\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Chris')).toBe(true);
  });

  it('doesn\'t contain a user named \'Scott\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Scott')).toBe(false);
  });

  it('has two todos in the things category', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.category === 'things').length).toBe(2);
  });

  it('todo list filters by owner', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = 'r';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by status', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = 'complete';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by owner and status', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = 'complete';
    todoList.todoOwner = 'a';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by status and body', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = 'complete';
    todoList.todoBody = 'sun';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by owner and body', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = 'a';
    todoList.todoBody = 'rooster';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by all', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoBody = 'the';
    todoList.todoOwner = 'r';
    todoList.todoStatus = 'incomplete'
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(0));
  });

});

describe('Misbehaving Todo List', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [TodoListComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a TodoListService', () => {
    // Since the observer throws an error, we don't expect todos to be defined.
    expect(todoList.todos).toBeUndefined();
  });
});
