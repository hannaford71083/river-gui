import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../models/app-interfaces';
import { GeneralService } from '../services/general.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-user-edit',
  template: `
      <div class="content-container">
        <div class="content__thin-width content-portfolio fade-in">
            <h1>Edit {{user.firstName}} {{user.lastName}}</h1>
            <user-generic-form [initUserForm]="user" ></user-generic-form>
        </div>
    </div>
  `,
  styles:[``]
})
export class UserEditComponent implements OnInit {

  sub: any;
  id : number;
  user: IUser

  constructor(private _Activatedroute: ActivatedRoute, private generalService : GeneralService ) { }

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => { 
      let paramId: string | null;
      paramId = params.get('id'); 
      if(paramId !== null){
        this.id = parseInt(paramId);
      }
      this.generalService.getUser(this.id).subscribe({
        next: user => {
          this.user = user;
        },
        error: err => {} 
      });

   });
  }

  ngAfterViewInit() {
    let anime = gsap.timeline({defaults: { ease: "linear" }});
    anime.to(".fade-in", {  opacity: 1, duration: 0.5 }, "+=0.5");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
