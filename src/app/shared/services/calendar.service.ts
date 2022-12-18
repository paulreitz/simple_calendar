import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    private _date: Date;
    private _first: Date;
    private _last: Date;
    private _previousLast: Date;
    private _month: string;
    private _day: number;
    private _year: number;
    private _dayOfWeek: number;
    private _weekdays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    private _inited: boolean = false;

    constructor() { }

    initCalendar() {
        if (this._inited) {
            return;
        }
        this._inited = true;
        this._date = new Date();
        this._month = this._date.toLocaleString('en-us', { month: 'long' });
        this._day = this._date.getDate();
        this._year = this._date.getFullYear();
        this._dayOfWeek = this._date.getDay();
        this._first = new Date(this._date.getFullYear(), this._date.getMonth(), 1);
        this._last = new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0);
        this._previousLast = new Date(this._date.getFullYear(), this._date.getMonth(), 0);
    }

    getOrdinal(day: number): string {
        const endings = ['th', 'st', 'nd', 'rd'];
        const j = day % 10;
        const k = day % 100;
        const ending = endings[(j === 1 && k !== 11) ? 1 : (j === 2 && k !== 12) ? 2 : (j === 3 && k !== 13) ? 3 : 0];
        return `${day}${ending}`;
    }

    get month(): string {
        return this._month;
    }

    get day(): number {
        return this._day;
    }

    get year(): number {
        return this._year;
    }

    get dayOfWeek(): string {
        return this._weekdays[this._dayOfWeek];
    }

    get weekdays(): string[] {
        return this._weekdays;
    }

    get daysInMonth(): number {
        return this._last.getDate();
    }

    getLeadingDays(): number[] {
        const leadingDays = [];
        for (let i = 0; i < this._first.getDay(); i++) {
            leadingDays.push(this._previousLast.getDate() - i);
        }
        return leadingDays.reverse();
    }

    getTrailingDays(): number[] {
        const trailingDays = [];
        for (let i = 1; i < 7 - this._last.getDay(); i++) {
            trailingDays.push(i);
        }
        return trailingDays;
    }

    isToday(day: number): boolean {
        return day === this._day;
    }
}
