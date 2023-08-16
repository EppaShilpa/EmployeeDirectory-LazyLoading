import { Injectable } from "@angular/core";
import { IEmployee } from "./iemployee";
@Injectable({
    providedIn: 'root'
})
export class PipeModel {
    employees!: IEmployee[];
    filterType!: string;
    filterValue!: string;
    selectedFilter!: string;
}