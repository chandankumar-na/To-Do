import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components//todo-list/todo-list.component';
import { AuthGuard } from './auth-guard';
export const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuard] },
];