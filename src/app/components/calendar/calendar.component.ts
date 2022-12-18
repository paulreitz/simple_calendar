import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/shared/services/calendar.service';

interface Day {
    date: number;
    isCurrentMonth: boolean;
    isToday: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    weekdays: string[];
    days: Day[];

    constructor(public calendarService: CalendarService) { }

    ngOnInit(): void {
        this.weekdays = this.calendarService.weekdays;
        const leading = this.calendarService.getLeadingDays();
        const trailing = this.calendarService.getTrailingDays();
        this.days = [];
        leading.forEach((day) => {
            this.days.push({
                date: day,
                isCurrentMonth: false,
                isToday: false
            });
        });
        for (let i = 1; i <= this.calendarService.daysInMonth; i++) {
            this.days.push({
                date: i,
                isCurrentMonth: true,
                isToday: this.calendarService.isToday(i)
            });
        }
        trailing.forEach((day) => {
            this.days.push({
                date: day,
                isCurrentMonth: false,
                isToday: false
            });
        });
    }
}
