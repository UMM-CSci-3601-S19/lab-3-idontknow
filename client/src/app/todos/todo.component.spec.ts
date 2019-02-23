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

  it('can retrieve Kurts todo by ID', () => {
    todoComponent.setId('kurt_id1');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.owner).toBe('Kurt');
    expect(todoComponent.todo.category).toBe('stuff');
  });

  it('returns undefined for Scott', () => {
    todoCoponent.setId('scott_id3');
    expect(todoComponent.todo).not.toBeDefined();
  });

});
