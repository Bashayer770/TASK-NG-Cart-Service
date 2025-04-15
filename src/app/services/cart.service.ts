import { Injectable } from '@angular/core';
import { Product } from '../../data/products';
import { BehaviorSubject } from 'rxjs';

export type CartItem = Product & { quantity: number };

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartItem[] = [];
  cartSubject = new BehaviorSubject<CartItem[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product) {
    const existing = this.cart.find((item) => item.id === product.id);
    if (existing) {
      if (existing && existing.quantity < product.stock) {
        existing.quantity++;
      }
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next(this.cart);
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  increment(productId: number) {
    const item = this.cart.find((i) => i.id === productId);
    if (item && item.quantity < item.stock) item.quantity++;
    this.cartSubject.next(this.cart);
  }

  decrement(productId: number) {
    const item = this.cart.find((i) => i.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) this.remove(productId);
    } else this.cartSubject.next(this.cart);
  }

  remove(productId: number) {
    this.cart = this.cart.filter((i) => i.id !== productId);
    this.cartSubject.next(this.cart);
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  isEmpty(): boolean {
    return this.cart.length === 0;
  }
}
