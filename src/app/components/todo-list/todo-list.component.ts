import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { ToDoList } from '../../interfaces/toDoList';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  private mainList = [];
  private name: any;
  private query: any;
  private searchRes = [];
  private selected_items = [];
  private searchRes1;
  private mainList1;
  current: number = -1;
  private toDoList1 = new ToDoList();
  date_pick: Date;

  today=new Date().getDate();

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) {
    console.log("constucto()"+this.today)
    // if (this.query == "" || this.query == null) {
    //   this.searchRes = this.mainList;
    // }
  }

  ngOnInit() {
    this.toDoList1 = this.appService.getToDoId();
    console.log("ngOnInit()" + this.toDoList1.todo_link)
    this.fetchToDo();
  }

  private fetchToDo() {
    console.log("fetchToDo()")

    this.toDoList1.todo_task = "task"
    this.appService.fetchToDo(this.toDoList1).subscribe(
      data => {
        console.log("fetchToDo:" + data.result)
        this.mainList = data.result;
        this.searchRes = this.mainList;

        this.searchRes.sort(function (a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a > b ? -1 : a < b ? 1 : 0;
        });
        this.mainList.sort(function (a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a > b ? -1 : a < b ? 1 : 0;
        });


      })
  }

  private fetchToDoList() {
    console.log("fetchToDo()")
    var toDoList2 = new ToDoList();
    toDoList2.todo_task = "todo"
    this.appService.fetchToDo(toDoList2).subscribe(
      data => {
        console.log("before:" + this.mainList)
        this.searchRes1 = data.result
        this.mainList1 = data.result;
      })
    console.log("main+" + this.toDoList1.todo_link);
  }

  private openDate() {
    console.log("move_to")
    $("#date_pick").click();
  }


  private moveTo(move_to) {
    if (confirm("Are sure you want to move these selected items ? ")) {
      console.log("ok" + this.selected_items)
      var sele = ""
      for (var i = 0; i < this.selected_items.length; i++) {
        console.log(this.selected_items[i]);
        sele = this.selected_items[i];
        var toDoList = new ToDoList();
        toDoList.todo_link = move_to;
        toDoList.todo_id = this.selected_items[i];
        this.appService.updateToDoMove(toDoList).subscribe(
          data => {
            console.log(data)
          })
        var index = this.mainList.findIndex(function (o) {
          console.log(o)
          return o.todo_id == sele;
        })
        if (index !== -1) {
          this.mainList.splice(index, 1)
          this.searchRes.splice(index, 1)
        };
      }
    }
  }




  private addToDo() {
    console.log("addToDo()" + this.toDoList1.todo_link)
    var toDo = new ToDoList();
    if (this.date_pick == null || this.date_pick == undefined) {
      toDo.date = new Date();
    } else {
      toDo.date = this.date_pick;
    }

    toDo.name = this.name;

    toDo.todo_task = "task"
    var today = Number(new Date())
    toDo.todo_id = today.toString();
    toDo.todo_link = this.toDoList1.todo_link
    this.appService.addToDo(toDo).subscribe(
      data => {
        console.log(data);
        this.mainList.push(toDo);
        this.searchRes.sort(function (a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a > b ? -1 : a < b ? 1 : 0;
        });

      })
    this.name = "";
  }
  private delete(index, id) {
    if (confirm("Are sure you want to delete this item ? ")) {
      if (index !== -1) {

        this.appService.deleteToDo(id).subscribe(
          data => {
            console.log(data);
            this.mainList.splice(index, 1);
          })

      }
    }
  }

  private update(id, name) {
    console.log("update" + id + name)
    var toDoList = new ToDoList();
    toDoList.name = name;
    toDoList.todo_id = id;
    this.appService.updateToDo(toDoList).subscribe(
      data => {
        console.log(data)
      })
  }

  private filter() {
    console.log("filter()")
    if (this.query == "" || this.query == null) {
      this.searchRes = this.mainList;
    } else
    this.searchRes = this.mainList.filter((task) =>
    task.name.indexOf(this.query) >= 0 ||task.date.indexOf(this.query) >= 0);
  }



  private deleteSelectedItems() {
    if (confirm("Are sure you want to delete these selected items ? ")) {
      console.log("ok" + this.selected_items)
      var sele = ""
      for (var i = 0; i < this.selected_items.length; i++) {
        console.log(this.selected_items[i]);
        sele = this.selected_items[i];
        this.appService.deleteToDo(this.selected_items[i]).subscribe(
          data => {
            // console.log(data);
          })
        var index = this.mainList.findIndex(function (o) {
          console.log(o)
          return o.todo_id == sele;
        })
        if (index !== -1) {
          this.mainList.splice(index, 1)
          this.searchRes.splice(index, 1)
        };
      }
    }
  }

  private select(event, id) {
    console.log(id + ":" + event.srcElement.checked)
    if (event.srcElement.checked) {
      this.selected_items.push(id)
    } else {
      this.selected_items.splice(id, 1);
    }
  }



  private updateDate(id, date) {
    console.log("updateDate" + id + date)
    var dt = Date.parse((date.toString()))
    var toDoList1 = new ToDoList();
    toDoList1.todo_id = id;
    toDoList1.date = new Date(dt);

    var index = this.mainList.findIndex(function (o) {
      console.log(o)
      return o.todo_id == id;
    })
    if (index !== -1) {
      this.searchRes[index].date=new Date(dt);
      this.searchRes.sort(function (a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a > b ? -1 : a < b ? 1 : 0;
      });
    };
    this.appService.updateDate(toDoList1).subscribe(
      data => {
        console.log(data)


      })
  }

  ngAfterViewInit() {
  }

}


