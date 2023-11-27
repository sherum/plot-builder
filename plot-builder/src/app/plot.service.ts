import {Injectable, signal} from '@angular/core';
import {defautStory, IPlot, IScene, IStory} from "./plot.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PlotService {
  endpoint = 'http://localhost:8080';
  currentPlot = signal<IPlot>({"name": "dummy"});
  currentStory = signal<IStory>(defautStory);
  currentStories = signal<IStory[]>(new Array<IStory>());
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  constructor(private http: HttpClient) {
  }

  updateCurrentPlot(plot: IPlot) {
    this.currentPlot.update(() => plot);
  }

  updateCurrentStory(story: IStory) {
    this.currentStory.update(() => story);
  }

  updateCurrentStories(stories: IStory[]) {
    this.currentStories.update(() => stories);
  }

  createPlot(plot: IPlot): Observable<IPlot> {
    let uri = `${this.endpoint}/plot`
    return this.http.post<IPlot>(uri, plot, {headers: this.headers});
  }

  createScene(scene: IScene): Observable<IScene> {
    let uri = `${this.endpoint}/plot`
    return this.http.post<IScene>(uri, scene, {headers: this.headers});
  }

  saveStory() {
    let uri = `${this.endpoint}/story`;
    this.http.post<IStory>(uri, this.currentStory(), {headers: this.headers}).subscribe({
      next: data => this.updateCurrentStory(data),
      error: err => console.log("error ", err),
      //complete: () => this.getStories().subscribe(data => console.log("Update result", data))
    })
  }

  updateStory(id:string) {
    let uri = `${this.endpoint}/story/${id}`;
    this.http.put<IStory>(uri, this.currentStory(), {headers: this.headers}).subscribe({
      next: data => this.updateCurrentStory(data),
      error: err => console.log("error ", err),
      //complete: () => this.getStories().subscribe(data => console.log("Update result", data))
    })
  }


  getStories(): Observable<IStory[]> {
    let uri = `${this.endpoint}/stories`
    return this.http.get<IStory[]>(uri, {headers: this.headers});
  }


  // createStory(story: IStory): IStory {
  //   console.log("Story: ", story);
  //   let uri = `${this.endpoint}/story`
  //   let response;
  //   this.http.post<IStory>(uri, {story}, {headers: this.headers}).subscribe(
  //     (data: IStory) => {
  //       response = {
  //         title: data.title,
  //         id: data.id,
  //         author: data.author,
  //         genre: data.genre,
  //         maguffin: data.maguffin,
  //         summary: data.summary,
  //         plots: data.plots,
  //         scenes: data.scenes
  //       };
  //       console.log("response from service", response);
  //     }
  //   );
  //   return response;
  // }
}
