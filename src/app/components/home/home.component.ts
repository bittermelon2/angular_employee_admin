import { Component } from '@angular/core';
import {HomeService} from '../../services/home.service'
import {Router} from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isCollapsed: boolean = false

  constructor(private homeService:HomeService, private router: Router,
    private msgService: NzMessageService){}

  logout(event:any){
    // event.preventDefault();
    this.homeService.logout().subscribe(
      {
        next: resp=>{
          console.log("Logout success",resp)
        },
        error: error=>{
          //console.log("Logout fails", error),
          //Becuase the logout web service is not avaible, so logic is put here
          localStorage.removeItem('itcast-jwt')
          this.router.navigate(['/login'])
          this.msgService.info('success logout')
        }
        // complete: completed=>
      }
    )
  }
}
