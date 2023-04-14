import { Product } from "./product";

export interface ProductResponse {
    content: Product[];
    pageable: {
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
    };
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
  
  export interface ProductRes {
    id: number;
    category: {
      id: number;
      categoryName: string;
      products: any[];
    };
    category_id: number;
    sku: string;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    active: boolean;
    unitInStock: number;
    dateCreated: string;
    lastUpdated: any;
  }