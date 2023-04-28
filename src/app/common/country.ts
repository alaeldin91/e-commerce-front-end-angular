import { State } from "./state";

export class Country {
    id:number;
    name:string;
    name2:string;
    countryId:number;
    alpha2Code:string;
    alpha3Code:string;
    hieCode:string;
    hieDesc:string;
    hieNationalityDesc:string;
     state:Set<State>
    constructor( id:number
                 , name:string
                 ,name2:string
                 ,countryId:number
                 ,alpha2Code:string
                 ,alpha3Code:string
                 ,hieCode:string
                 ,hieDesc:string
                 ,hieNationalityDesc:string,
                 state:Set<State>){
    this.id = id;
    this.name = name;
    this.name2 = name2;
    this.countryId = countryId;
    this.alpha2Code = alpha2Code;
    this.alpha3Code = alpha3Code;
    this.hieCode = hieCode;
    this.hieDesc = hieDesc;
    this.hieNationalityDesc = hieNationalityDesc;
    this.state = state;
   }
}
