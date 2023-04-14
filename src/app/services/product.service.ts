import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product, ProductPage } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { ProductResponse } from '../common/ProductResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private baseUrl:string;
private categoryUrl:string;
private searchUrl:string;
private productUrl:string;
  constructor(private http:HttpClient) {
    this.baseUrl = "http://localhost:8080/api/product"
    this.categoryUrl="http://localhost:8080/api/category/categories";
    this.searchUrl="http://localhost:8080/api/product/search";
    this.productUrl="http://localhost:8080/api/product/products";

  }
  getProductListPaginate(thePageNumber:number,thePageSize:number,currentCategoryId:number):Observable<ProductPage>{
   const searchUrl  = `${this.baseUrl}/${currentCategoryId}` +`?page=${thePageNumber}&size=${thePageSize}`;
   console.log(searchUrl);
    return this.http.get<ProductPage>(searchUrl);
  }
  getProductCategories() : Observable<ProductCategory[]> {
     return this.http.get<any>(this.categoryUrl);
  }
  searchProductsPaginate(thePageNumber:number,thePageSize:number,theKeyword: string) :Observable<ProductPage>{
    const searchProductUrl =`${this.searchUrl}/${theKeyword}`+`?page= ${thePageNumber} &size=${thePageSize}` 
    console.log(searchProductUrl);
   return this.http.get<ProductPage>(searchProductUrl);
  }
  getProduct(theProductId: number) {
   const ProductUrlById = `${this.productUrl}/${theProductId}`
  return this.http.get<Product>(ProductUrlById);
  }
}



