import {Component, effect, OnInit} from '@angular/core';
import {PlotService} from "./plot.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'plot-builder';
  isAuthenticated = true;
  story = true;

  constructor(private plotService:PlotService) {
  }

  ngOnInit() {

  }

  signOut(){

  }
}
