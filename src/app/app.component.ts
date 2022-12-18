import { Component, OnInit } from '@angular/core';
import { CalendarService } from './shared/services/calendar.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    weekday: string;
    month: string;
    day: string;
    year: number;

    constructor(private calendarService: CalendarService) { }

    ngOnInit() {
        this.calendarService.initCalendar();
        this.weekday = this.calendarService.dayOfWeek;
        this.month = this.calendarService.month;
        this.day = this.calendarService.getOrdinal(this.calendarService.day);
        this.year = this.calendarService.year;
    }
}
