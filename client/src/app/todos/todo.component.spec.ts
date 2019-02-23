import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Todo} from './todo';
import {TodoComponent} from './todo.component';
import {TodoListService} from './todo-list.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Todo component', () => {

  let todoComponent: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let userListServiceStub: {
    getTodoById: (userId: string) => Observable<Todo>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodoById: (todoId: string) => Observable.of([
        {
          id: 'kurt_id1',
          owner: 'Kurt',
          status: false,
          body: 'In the sun I feel as one',
          category: 'stuff'
        },
        {
          id: 'pat_id1',
          owner: 'Pat',
          status: true,
          body: 'All in all is all we are',
          category: 'things'
        },
        {
          id: 'jamie_id1',
          owner: 'Jamie',
          status: false,
          body: 'What should I do',
          category: 'things'
        }
      ].find(todo => todo.id === todoId))
    };

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoComponent);
      todoComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve Pats todo by ID', () => {
    todoComponent.setId('pat_id1');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.owner).toBe('Pat');
    expect(todoComponent.todo.category).toBe('things');
  });

  it('returns undefined for Layne', () => {
    todoCoponent.setId('layne_id3');
    expect(todoComponent.todo).not.toBeDefined();
  });

});
