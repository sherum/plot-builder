import {Injectable, signal} from '@angular/core';
import {defaultPlots, defautStory, IEvent, IPlot, IScene, IStory, defautEvents, ILocation} from "./plot.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {DEFAULT_ID} from "./index";


@Injectable({
  providedIn: 'root'
})
export class PlotService {
  endpoint = 'http://localhost:8080';

  currentPlot = signal<IPlot>(defaultPlots[0]);
  currentStory = signal<IStory>(defautStory);
  currentEvents = signal<IEvent[]>(defautEvents);

  // @ts-ignore
  currentStories = this.getStories();
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
  //currentPlot$ = this.currentPlot.asObservable();
  currentSubplot$:Observable<IPlot[]>

  constructor(private http: HttpClient) {
  }

  // nextPlot(plot:IPlot){
  //   this.currentPlot.next(plot);
  // }

  updateCurrentStory(story: IStory) {
    this.currentStory.set(story);
  }

  updateCurrentStories(stories: IStory[]) {
    // this.currentStories.update(() => stories);
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


  updateStory(id: string) {
    let uri = `${this.endpoint}/story/${id}`;
    this.http.put<IStory>(uri, this.currentStory(), {headers: this.headers}).subscribe({
      next: data => this.updateCurrentStory(data),
      error: err => console.log("error ", err),
      //complete: () => this.getStories().subscribe(data => console.log("Update result", data))
    })
  }


  saveEvent(plotId:string,event:IEvent):Observable<IPlot>{
    let uri = `${this.endpoint}/plot/event/save/${plotId}`;
    return this.http.post<IPlot>(uri,event,{headers:this.headers})
  }

  getEvents(plotId:string):Observable<IEvent[]>{
    let uri = `${this.endpoint}/plot/${plotId}`;
    return this.http.get<IEvent[]>(uri,{headers:this.headers});
  }

  getStories(): Observable<IStory[]> {
    let uri = `${this.endpoint}/stories`
    return this.http.get<IStory[]>(uri, {headers: this.headers});
  }

  saveTopPlot(id: string, plot: IPlot): Observable<IPlot> {
    let uri = `${this.endpoint}/plot`;
    let putHeaders = this.headers.append("Story-Id", id);
    return this.http.post<IPlot>(uri, plot, {headers: putHeaders});
  }

  savePlot(parentId:string,plot:IPlot):Observable<IPlot>{
    let uri = `${this.endpoint}/plot/save/${parentId}`;
    return this.http.post<IPlot>(uri, plot, {headers: this.headers});
  }
  savePlotEvent(plotId:string,event:IEvent):Observable<IPlot>{
    let uri = `${this.endpoint}/plot/event/save/${plotId}`
    return this.http.post<IPlot>(uri,event,{headers:this.headers});
}

 updatePlot(plotId:string,plot:IPlot):Observable<IPlot>{
    let uri = `${this.endpoint}/plot/save/${plotId}`;
    return this.http.put<IPlot>(uri, plot, {headers: this.headers});
  }

  savePlotTree(id:string,plot:IPlot):Observable<IPlot>{
    if(plot.id == DEFAULT_ID){
      return this.savePlot(id,plot);
    }else{
      return this.updatePlot(id,plot);
    }
  }

  saveSubplot(storyId: string, parentId: string, plot: IPlot): Observable<IPlot> {
    let uri = `${this.endpoint}/subplot`;
    let putHeaders = this.headers.append("Story-Id", storyId).append("Parent-Id", parentId);
    return this.http.post<IPlot>(uri, plot, {headers: putHeaders});
  }

//   getSubplots(storyId:string,plotId:string):Observable<IPlot[]|[]> {
//     let uri = `${this.endpoint}/plot/subplots/${storyId}/${plotId}`;
//     return this.http.get<IPlot[]>(uri,{headers:this.headers});
//
//
// }


  getStory(id: string): Observable<IStory> {
    let uri = `${this.endpoint}/stories/${id}`;
    return this.http.get<IStory>(uri, {headers: this.headers});
  }

  getPlot(id: string): Observable<IPlot> {
    let uri = `${this.endpoint}/plot/${id}`;
    return this.http.get<IPlot>(uri, {headers: this.headers});
  }
  getEvent(eid: string,pid: string): Observable<IEvent> {

    let uri = `${this.endpoint}/plot/event/${pid}/${eid}`;
    console.log("Get event clicked Service call uri: ",uri);
    return this.http.get<IEvent>(uri, {headers: this.headers});
  }

  getLocation(id:string):Observable<ILocation>{
    let uri = `${this.endpoint}/location/${id}`;
    return this.http.get<ILocation>(uri,{headers:this.headers});
  }

  saveLocation(eventId:string,location:ILocation):Observable<ILocation>{
    let uri = `${this.endpoint}/event/${eventId}/location`;
    return this.http.post<ILocation>(uri,location,{headers:this.headers})

  }


}
