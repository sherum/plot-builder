import {Injectable} from '@angular/core';
import {IEvent, ILocation, IPerson, IPlot, IScene, IStory, IThing} from "./plot.model";
import {BehaviorSubject, Observable, of} from "rxjs";
import {PlotService} from "./plot.service";
import {v4 as uuidv4} from 'uuid';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class StoryService {

    selectedStory = new BehaviorSubject<IStory>(this.plotservice.currentStory());
    selectedStory$ = this.selectedStory.asObservable();
    plots: IPlot[];
    scenes: IScene[];
    headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
    endpoint = 'http://localhost:8080/stories';

    constructor(private plotservice: PlotService, private http: HttpClient, private router: Router) {
    }


    createStory(story: IStory) {
        story.id = uuidv4();
        let uri = this.endpoint;
        this.http.post(uri, story, {headers: this.headers}).subscribe(
            istory => {
                this.router.navigate(['home', 'stories']);
                console.log("new story: ", istory);
            }
        )
    }

    saveTopPlot(storyId: string, plot: IPlot) {
        let uri = `${this.endpoint}/${storyId}/plot`;
        this.http.put<IStory>(uri, plot, {headers: this.headers}).subscribe(story => this.plotservice.currentStory.update(() => story));
    }

    selectStory(istory: IStory) {
        console.log("story service select story");
        this.selectedStory.next(istory);
    }


    // @PostMapping(path="story/{storyId}/location")
    createNewLocation(storyId: string, location: ILocation): void {
        let uri = `${this.endpoint}/story/${storyId}/newLocation`
        this.http.post<IStory>(uri, location, {headers: this.headers})
            .subscribe(istory => this.plotservice.currentStory.update(() => istory));
    }

    addNewLocation(storyId: string, location: ILocation): Observable<IStory> {
        let uri = `${this.endpoint}/story/${storyId}/addLocation`
        return this.http.put<IStory>(uri, location, {headers: this.headers});
    }

    // @GetMapping(path="story/{storyId}/location")
    getStoryLocations(storyId: string): Observable<ILocation[]> {
        let uri = `${this.endpoint}/story/${storyId}/location`
        return this.http.get<ILocation[]>(uri, {headers: this.headers});
    }


    // @PostMapping(path="story/{storyId}/person")
    //addNewPerson
    // @PostMapping(path="story/{storyId}/event")
    //addNewEvent

    createNewEvent(storyId: string, event: IEvent): void {
        let uri = `${this.endpoint}/story/${storyId}/newEvent`
        this.http.post<IStory>(uri, event, {headers: this.headers})
            .subscribe(istory => this.plotservice.currentStory.update(() => istory));
    }

    addNewEvent(storyId: string, event: IEvent): Observable<IStory> {
        let uri = `${this.endpoint}/story/${storyId}/addEvent`
        return this.http.put<IStory>(uri, event, {headers: this.headers});
    }

    // @GetMapping(path="story/{storyId}/location")
    // stories/story/{storyId}/event")
    getStoryEvents(storyId: string): Observable<IEvent[]> {
        let uri = `${this.endpoint}/story/${storyId}/event`
        let event: IEvent[];
        console.log("Getting story events")
        this.http.get<IEvent[]>(uri, {headers: this.headers}).subscribe(ievent => {
            event = ievent;
            console.log("I got my events", event);
        });
        return of(event);
    }

    getStoryThings(storyId: string): Observable<IThing[]> {
        let uri = `${this.endpoint}/story/${storyId}/thing`;
        let things: IThing[];
        console.log("Getting story things")
        this.http.get<IThing[]>(uri, {headers: this.headers}).subscribe(ithing => {
            things = ithing;
            console.log("I got my things", things);
        });
        return of(things);
    }


    createNewThing(storyId: string, thing: IThing): void {
        let uri = `${this.endpoint}/story/${storyId}/newThing`
        this.http.post<IStory>(uri, thing, {headers: this.headers})
            .subscribe(istory => this.plotservice.currentStory.update(() => istory));
    }

    addNewThing(storyId: string, thing: IThing): Observable<IStory> {
        let uri = `${this.endpoint}/story/${storyId}/addThing`
        return this.http.put<IStory>(uri, thing, {headers: this.headers});
    }

    // @GetMapping(path="story/{storyId}/location")
    //"stories/story/{storyId}/thing")

    createNewPerson(storyId: string, person: IPerson): void {
        let uri = `${this.endpoint}/story/${storyId}/newPerson`
        this.http.post<IStory>(uri, person, {headers: this.headers})
            .subscribe(istory => this.plotservice.currentStory.update(() => istory));
    }

    addNewPerson(storyId: string, person: IPerson): Observable<IStory> {
        let uri = `${this.endpoint}/story/${storyId}/addPerson`
        return this.http.put<IStory>(uri, person, {headers: this.headers});
    }


    getStoryPersons(storyId: string): Observable<IPerson[]> {
        let uri = `${this.endpoint}/story/${storyId}/person`
        let person: IPerson[];
        console.log("Getting story persons")
        this.http.get<IPerson[]>(uri, {headers: this.headers}).subscribe(iperson => {
            person = iperson;
            console.log("I got my persons", person);
        });
        return of(person);
    }


}

