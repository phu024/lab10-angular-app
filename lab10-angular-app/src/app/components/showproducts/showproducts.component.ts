import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service'

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  products: any

  constructor(private ps: ProductsService) {
    this.onLoading()
  }
  onLoading() {
    try {
      this.ps.getProducts().subscribe(
        data => {
          this.products = data;
        },
        err => {
          console.log(err)
        });
    } catch (error) {
      console.log(error);
    }
  }


  ngOnInit(): void {
  }

}
