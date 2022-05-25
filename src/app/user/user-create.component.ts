import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-user-create',
  template: `
    <div class="content-container">
      <div class="content__thin-width content-portfolio fade-in">
          <h1>Create User</h1>
          <user-generic-form [initUserForm]="null" ></user-generic-form>
      </div>
  </div>`,
  styles:[``]
})
export class UserCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    let anime = gsap.timeline({defaults: { ease: "linear" }});
    anime.to(".fade-in", {  opacity: 1, duration: 0.5 }, "+=0.5");
  }

}
