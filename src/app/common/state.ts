import { Country } from "./country";

export class State {
    id:number;
    name:string;
    name2:string;
    hieCode:string;
    dohCode:string;
    hieDesc:string;
    country:Country;
    country_id:number;
    constructor(id:number
                ,name:string
                ,name2:string
                ,hieCode:string
                ,dohCode:string
                ,hieDesc:string
                ,country:Country,
                country_id:number){
                    this.id = id;
                    this.name = name;
                    this.name2 = name2;
                    this.hieCode = hieCode;
                    this.dohCode = dohCode
                    this.hieDesc = hieDesc;
                    this.country = country;
                    this.country_id = country_id;
                }
}
