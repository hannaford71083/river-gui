import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('animeObject') AnimationObject: ElementRef;
  showOverlay : boolean = true;

  ngOnInit(): void { }

  ngAfterViewInit() {
    let anime = gsap.timeline({defaults: { ease: "linear" }});
    if(!sessionStorage.getItem('siteInit')){
      this.showOverlay = true;
      sessionStorage.setItem('siteInit', 'true');
      anime
        .to(".home__caption", {  opacity: 1, duration: 0.5 }, "+=0.7")
        .to(".title", { stagger:0.1, opacity: 1, duration: 0.8 }, "+=0.7")
        .to(".list-button", {  opacity: 1, duration: 0.8 }, "+=0");
      this.showOverlay = false;
    }
    else{
      this.showOverlay = false;
      anime
        .to(".home__caption", {  opacity: 1, duration: 0.8 }, "+=0.1")
        .to(".title, .list-button", { stagger:0.1, opacity: 1, duration: 0.2 }, "+=0");      
    }
  }  

  nextPage(){
    let anime = gsap.timeline({defaults: { ease: "linear" }});
    anime.to(".home__caption", {  opacity: 0, duration: 0.8, onComplete: () => {
      location.href = "#/user/list";
    } }, "+=0");
  }

}
