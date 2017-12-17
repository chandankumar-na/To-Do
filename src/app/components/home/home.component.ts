import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { ToDoList } from '../../interfaces/toDoList';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private mainList = [];
  toDoList1 = new ToDoList();
  name:any;
  query: any;
  searchRes = [];
  selected_items = [];
  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) {
    console.log("constucto()")
    if (this.query == "" || this.query == null) {
      this.searchRes = this.mainList;
    }
  }

  ngOnInit() {
    this.fetchToDo();
  }

  private fetchToDo() {
    console.log("fetchToDo()")
    this.toDoList1.todo_task = "todo"
    this.appService.fetchToDo(this.toDoList1).subscribe(
      data => {
        console.log("before:" + this.mainList)
        this.searchRes = data.result
        this.mainList = data.result;
        
        this.searchRes.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
      });
      this.mainList.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
    });
        
      })
  }

  private addToDo() {
    console.log("addToDo()"+this.name)

    var toDo = new ToDoList();
    toDo.date = new Date();
    toDo.name = this.name;
    toDo.todo_task = "todo"
    var today = Number(new Date())
    toDo.todo_id = today.toString();
    this.appService.addToDo(toDo).subscribe(
      data => {
        console.log(data);
        this.mainList.push(toDo);
        this.searchRes.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
      });
      })
    this.name="";
  }
  private delete(index, id) {
    console.log("delete()")
    console.log("delete:" + index)

    if (confirm("Are sure you want to delete this list ? ")) {
      if (index !== -1) {

        this.appService.deleteToDo(id).subscribe(
          data => {
            console.log(data);
            this.mainList.splice(index, 1);
          })

      }
    }

  }
  private addItems(id, name) {
    console.log("addItems" + id)
    var toDoList = new ToDoList();
    toDoList.name = name;
    toDoList.todo_link = id;
    this.appService.setToDoId(toDoList);
    this.appService.setAuthorized(true);
    this.router.navigate(['todo-list']);
  }
  update(id, name) {
    console.log("update" + id + name)
    var toDoList = new ToDoList();
    toDoList.name = name;
    toDoList.todo_id = id;
    this.appService.updateToDo(toDoList).subscribe(
      data => {
        console.log(data)
      })
  }
  filter() {
    if (this.query == "" || this.query == null) {
      this.searchRes = this.mainList;
    } else
    
      this.searchRes = this.mainList.filter((task) =>
       task.name.indexOf(this.query) >= 0 ||task.date.indexOf(this.query) >= 0);
  }


  deleteSelectedItems() {
    if (confirm("Are sure you want to delete these lists ? ")) {
       console.log("ok" + this.selected_items)
       var sele=""
      for (var i = 0; i < this.selected_items.length; i++) {
        console.log(this.selected_items[i]);
        sele=this.selected_items[i];
        this.appService.deleteToDo(this.selected_items[i]).subscribe(
          data => {
             console.log(data);
          })
        var index = this.mainList.findIndex(function (o) {
          console.log(o)
          return o.todo_id ==sele;
        })
        if (index !== -1){
          this.mainList.splice(index, 1);
          this.searchRes.splice(index, 1)
        };
      }
    }
  }
  private select(event, id) {
    // console.log(id + ":" + event.srcElement.checked)
    if (event.srcElement.checked) {
      this.selected_items.push(id)
      // console.log(this.selected_items)
    } else {

      var index = this.selected_items.findIndex(function (o) {
        return o == id;
      })
      if (index !== -1) {
        console.log(index)
        this.selected_items.splice(index, 1);
        
      };
      
    }
    console.log(this.selected_items)
  }
}
