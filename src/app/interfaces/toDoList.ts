export class ToDoList {

  constructor(
    public todo_id?: string,
    public decs?: string,
    public name?: string,
    public isDone?: boolean,
    public date?: Date,
    public todo_link?: string,
    public todo_task?: string,
    public delete_flag?: string,

  ) {

    this.todo_link = todo_link
    this.todo_task = todo_task
    this.delete_flag = delete_flag;
    this.decs = decs;
    this.todo_id = todo_id;
    this.date = date;
    this.name = name;
    this.isDone = isDone;
  }
}
