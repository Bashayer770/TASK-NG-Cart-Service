import { Component } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
  }

  increment(id: number) {
    this.cartService.increment(id);
  }

  decrement(id: number) {
    this.cartService.decrement(id);
  }

  remove(id: number) {
    this.cartService.remove(id);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  isEmpty(): boolean {
    return this.cartService.isEmpty();
  }
}
