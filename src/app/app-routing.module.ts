import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HelloComponent } from './components/hello/hello.component'
import { authGuard} from './auth.guard'

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'employee',
        loadChildren: () => import('./employees/employees.module').then(x => x.EmployeesModule)
      }
    ]
    
   },
   {
    path:'hello',
    component: HelloComponent
   },
   {
    path:'login',
    component: LoginComponent
   },
  //  {
  //   //异步加载的路由, 实际上加载的是模块
  //    path: 'employee',
  //     //  loadChildren: './employees/employees.module#EmployeesModule', old way
  //    loadChildren: () => import('./employees/employees.module').then(x => x.EmployeesModule)
  //  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
