import {Injectable, signal} from '@angular/core';
import {
    defaultPlots,
    defautStory,
    IEvent,
    IPlot,
    IScene,
    IStory,
    defautEvents,
    ILocation,
    IThing,
    IPerson
} from "./plot.model";
import {HttpClient, HttpContext, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {DEFAULT_ID} from "./index";
import {DP1} from "./HeadersInterceptor";


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
      let my_ctx = new HttpContext();
      my_ctx.set(DP1,"Missionary");
    this.http.post<IStory>(uri, this.currentStory(), {headers: this.headers,context:my_ctx}).subscribe({
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


 saveEvent(plotId:string,plot:IPlot):Observable<IPlot>{
    let uri = `${this.endpoint}/plot/event/save/${plotId}`;
    return this.http.post<IPlot>(uri,plot,{headers:this.headers})
  }

  getEvents():Observable<IEvent[]>{
    let uri = `${this.endpoint}/event`;
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

  getStory(id: string): Observable<IStory> {
    let uri = `${this.endpoint}/stories/${id}`;
    return this.http.get<IStory>(uri, {headers: this.headers});
  }

  getPlot(id: string): Observable<IPlot> {
    let uri = `${this.endpoint}/plot/${id}`;
    return this.http.get<IPlot>(uri, {headers: this.headers});
  }
  getEvent(eid: string,pid:string): Observable<IEvent> {

    let uri = `${this.endpoint}/event/${eid}`;
    console.log("Get event by eid only clicked Service call uri: ",uri);
    return this.http.get<IEvent>(uri, {headers: this.headers});
  }


  getLocation(id:string):Observable<ILocation>{
    let uri = `${this.endpoint}/location/${id}`;
    return this.http.get<ILocation>(uri,{headers:this.headers});
  }

  getLocations(): Observable<ILocation[]> {
    let uri = `${this.endpoint}/location`;
    return this.http.get<ILocation[]>(uri, {headers: this.headers});
  }

  saveLocation(location:ILocation):Observable<ILocation>{
    let uri = `${this.endpoint}/location`;
    return this.http.post<ILocation>(uri,location,{headers:this.headers})
  }

  linkLocation(eventId:string,location:ILocation):Observable<IEvent>{
    let uri = `${this.endpoint}/event/${eventId}/linklocal`;
    return this.http.put<IEvent>(uri,location,{headers:this.headers})
  }

    linkEventLocation(eventId:string,locationId:string):Observable<IEvent>{
        let uri = `${this.endpoint}/event/${eventId}/location/${locationId}`;
        return this.http.put<IEvent>(uri,location,{headers:this.headers})
    }

    updateEvent(event:IEvent):Observable<IEvent>{
    let uri = `${this.endpoint}/event`;
    let noLocEvent = event;
    noLocEvent.location=null;
    console.log("Update event from plotservice", event);
     return this.http.post<IEvent>(uri,noLocEvent,{headers:this.headers})
  }

  deletePlot(plotId:string){
    let uri = `${this.endpoint}/plot/${plotId}`;
    this.http.delete(uri,{headers:this.headers}).subscribe((resp=>console.log("plot deleted",resp)));
  }


    getThing(thingId: string):Observable<IThing> {
      let uri = `${this.endpoint}/things/${thingId}`
        return this.http.get<IThing>(uri,{headers:this.headers})

    }

    getPerson(personId: string): Observable<IPerson> {
        let uri = `${this.endpoint}/person/${personId}`
        return this.http.get<IPerson>(uri,{headers:this.headers})
    }
}
