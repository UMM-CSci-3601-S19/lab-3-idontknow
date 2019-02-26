import {browser, protractor} from 'protractor';
import {TodoPage} from "./todo-list.po";

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  //This delay is only put here so that you can watch the browser do its' thing.
  //If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });


  // This is done to make sure we've navigated to the correct page, and grabbed the title
  it('should get tha value of TodoTitle attribute ', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos');
  });


  it('should type owner in the filter and find correct todos', () => {
    page.navigateTo();
    page.typeAnOwner("b");
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche");
    expect(page.getUniqueTodo("588959856f0b82ee93cd93eb")).toEqual("Barry");
    expect(page.getUniqueTodo("58895985fac640cc6cb5f3b0")).toEqual("Roberta");

    page.backspace();
    page.typeAnOwner("r");
    expect(page.getUniqueTodo("58895985c1849992336c219b")).toEqual("Fry");
    expect(page.getUniqueTodo("5889598528c4748a0292e014")).toEqual("Workman");

    page.backspace();
    page.typeAnOwner("a");
    expect(page.getUniqueTodo("58895985e9aaeaad6292df39")).toEqual("Dawn");

  });

  it('should enter status into filter and find the correct todos', () => {
    page.navigateTo();
    page.typeAStatus('com') //this should do nothing to change the full-list
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche"); // this status is false
    expect(page.getUniqueTodo("588959856f0b82ee93cd93eb")).toEqual("Barry"); // this status is true

    // erase the input
    for (let i = 0; i < 3; i++) {
          page.backspace();
        }

    page.typeAStatus('complete') //this should make all status = complete
    expect(page.getUniqueTodo("588959856f0b82ee93cd93eb")).toEqual("Barry"); // this status is true
    expect(page.getUniqueTodo("5889598528c4748a0292e014")).toEqual("Workman"); // this status is true

    // erase the input
    for (let i = 0; i < 8; i++) {
      page.backspace();
    }

    page.typeAStatus('incomplete') //this should make all status = complete
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche"); // this status is false
    expect(page.getUniqueTodo("58895985c1849992336c219b")).toEqual("Fry"); // this status is false

  })

  it('should enter body contents into filter and find the correct todos', () => {
    page.navigateTo();
    page.typeBodyContents(' ') //this should do nothing to change the full-list
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche");
    expect(page.getUniqueTodo("588959856f0b82ee93cd93eb")).toEqual("Barry");

    // erase the input
    page.backspace();

    page.typeBodyContents('non') //this should change it
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche"); // this contains 'non'
    expect(page.getUniqueTodo("58895985c32328e015584db2")).toEqual("Workman"); // this contains 'non'
    page.typeBodyContents(' no') //this should narrow it down more
    expect(page.getUniqueTodo("58895985c32328e015584db2")).toEqual("Workman"); // this contains 'non no'
    expect(page.getUniqueTodo("58895985ee196f2401e8c52a")).toEqual("Roberta"); // this contains 'non no'

  })





  // it('should click on the age 27 times and return 3 elements', () => {
  //   page.navigateTo();
  //   page.getUserByAge();
  //   for (let i = 0; i < 27; i++) {
  //     page.selectUpKey();
  //   }
  //
  //   expect(page.getUniqueUser("stokesclayton@momentia.com")).toEqual("Stokes Clayton");
  //
  //   expect(page.getUniqueUser("merrillparker@escenta.com")).toEqual("Merrill Parker");
  //
  // });
});
