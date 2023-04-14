export class Product {
        
 constructor(
        public id?:number,
        public sku?:string
        ,public name?:string
        ,public description?:string
        ,public unitPrice?:number
        ,public imageUrl?:string
        ,public active?:boolean
        ,public unitInStock?:number
        ,public dateCreated?:Date
        ,public lastUpdated?:Date){
         
        }
}

export interface Pageable {
        sort: {
          empty: boolean;
          sorted: boolean;
          unsorted: boolean;
        };
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
      }
      
      export interface ProductPage {
        content: Product[];
        pageable: Pageable;
        last: boolean;
        totalElements: number;
        totalPages: number;
        size: number;
        number: number;
        sort: {
          empty: boolean;
          sorted: boolean;
          unsorted: boolean;
        };
        first: boolean;
        numberOfElements: number;
        empty: boolean;
      }
      export interface ProductPage {
        content: Product[];
        pageable: Pageable;
        last: boolean;
        totalElements: number;
        totalPages: number;
        size: number;
        number: number;
        sort: {
          empty: boolean;
          sorted: boolean;
          unsorted: boolean;
        };
        first: boolean;
        numberOfElements: number;
        empty: boolean;
      }
      
      