import { Injectable, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class RealtimeService implements OnDestroy {
    private connection: signalR.HubConnection;
    private listenOnSubjects: { [method: string]: Subject<any> } = {};

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.apis.default.url}/signalr-hubs/realtime`)
            .withAutomaticReconnect()
            .build();

        this.connection.start();
    }

    ngOnDestroy(): void {
        this.connection.stop();
    }

    on<T>(method: string): Observable<T> {
        const subject =
            this.listenOnSubjects[method] || (this.listenOnSubjects[method] = new Subject<T>());

        this.connection.on(method, (data: T) => subject.next(data));

        return subject.asObservable();
    }
}
