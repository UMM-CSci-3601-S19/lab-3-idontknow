import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Todo} from './todo';
import {TodoComponent} from './todo.component';
import {TodoListService} from './todo-list.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Todo component', () => {

  let todoComponent: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let todoListServiceStub: {
    getTodoById: (userId: string) => Observable<Todo>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodoById: (todoId: string) => Observable.of([
        {
          _id: 'kurt_id1',
          owner: 'Kurt',
          status: true,
          body: 'In the sun I feel as one',
          category: 'stuff'
        },
        {
          _id: 'layne_id1',
          owner: 'Layne',
          status: true,
          body: 'They come to snuff the rooster',
          category: 'things'
        },
        {
          _id: 'chris_id1',
          owner: 'Chris',
          status: false,
          body: 'Show me how to live',
          category: 'things'
        }
      ].find(todo => todo._id === todoId))
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

  it('can retrieve Kurt\'s todo by ID', () => {
    todoComponent.setId('kurt_id1');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.owner).toBe('Kurt');
    expect(todoComponent.todo.category).toBe('stuff');
  });

  it('can retrieve Layne\'s todo by ID', () => {
    todoComponent.setId('layne_id1');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.owner).toBe('Layne');
    expect(todoComponent.todo.status).toBe(true);
  });

  it('can retrieve Chris\'s todo by ID', () => {
    todoComponent.setId('chris_id1');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.owner).toBe('Chris');
    expect(todoComponent.todo.body).toBe('Show me how to live');
  });

  it('returns undefined for Scott', () => {
    todoComponent.setId('scott_id3');
    expect(todoComponent.todo).not.toBeDefined();
  });

});
