import {Component, effect, OnInit} from '@angular/core';
import {PlotService} from "./plot.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'plot-builder';
  isAuthenticated = true;
  story = true;

  constructor(private plotService:PlotService,private router:Router) {
  }

  ngOnInit() {

  }

  signOut(){
    this.isAuthenticated = true;
    this.router.navigate(['stories'])

  }
}
