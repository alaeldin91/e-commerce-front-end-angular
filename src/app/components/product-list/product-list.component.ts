import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] =[];
  previousCategoryId:number=1; 
  searchMode:boolean = false;
  currentCategoryId:number = 1;

  //new prpertise for pagination
  thePageNumber:number = 1;
  thePageSize:number = 5;
  theTotalElements:number=0;
  constructor(private productService:ProductService,private router:ActivatedRoute){

}
  ngOnInit(): void {
    this.router.paramMap.subscribe(()=>{
      this.listProduct()
    });
  }
  listProduct(){
    this.searchMode = this.router.snapshot.paramMap.has('name');

    if(this.searchMode){
      console.log(this.searchMode);

     this.handleSearchListProduct();
    }
    else{
   this.handleListProducts();
  }
  }
 
  handleListProducts(){
    const hasCategoryId:boolean = this.router.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this.router.snapshot.paramMap.get('id')!;

    }
    else {
      this.currentCategoryId =1;
    }

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber =1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    this.productService.getProductListPaginate(this.thePageNumber - 1,this.thePageSize,this.currentCategoryId).subscribe(
      data=>{
        this.products = data.content;
        this.thePageNumber = data.number + 1;
        this.thePageSize = data.size;
        this.theTotalElements = data.totalElements;
        console.log(this.theTotalElements);
      }
    );
  }
  
  handleSearchListProduct() {
    const theKeyword: string = this.router.snapshot.paramMap.get('name')!;

    // now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber-1,this.thePageSize,theKeyword).subscribe(
      data => {
        this.products = data.content;
        this.thePageNumber = data.number +1;
        this.thePageSize= data.size;
        this.theTotalElements = data.totalElements;
        console.log(this.theTotalElements);
      }
    )
  }
  updatePageSize(pageSize:string){
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProduct();
  }
}
