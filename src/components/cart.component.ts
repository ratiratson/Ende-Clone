import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (store.cartOpen()) {
      <div class="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" (click)="store.toggleCart()"></div>

        <div class="fixed inset-y-0 right-0 max-w-full flex">
          <div class="w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 bg-white shadow-xl flex flex-col h-full">
            
            <!-- Header -->
            <div class="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 class="text-xl font-serif font-bold text-gray-900" id="slide-over-title">თქვენი კალათა</h2>
              <button (click)="store.toggleCart()" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">დახურვა</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto px-6 py-6">
              @if (store.cart().length === 0) {
                <div class="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                    <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p class="text-gray-500">კალათა ცარიელია</p>
                  <button (click)="store.toggleCart()" class="text-sm font-bold text-black border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
                    განაგრძეთ შოპინგი
                  </button>
                </div>
              } @else {
                <ul role="list" class="-my-6 divide-y divide-gray-100">
                  @for (item of store.cart(); track item.id) {
                    <li class="flex py-6">
                      <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img [src]="item.image" [alt]="item.title" class="h-full w-full object-cover object-center">
                      </div>

                      <div class="ml-4 flex flex-1 flex-col">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3><a href="#">{{ item.title }}</a></h3>
                            <p class="ml-4">{{ item.price * item.quantity }} ₾</p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">{{ item.category }}</p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                          <div class="flex items-center border border-gray-200 rounded-md">
                            <button (click)="store.updateQuantity(item.id, -1)" class="px-2 py-1 hover:bg-gray-50 text-gray-600">-</button>
                            <span class="px-2 py-1 text-gray-900 min-w-[1.5rem] text-center">{{ item.quantity }}</span>
                            <button (click)="store.updateQuantity(item.id, 1)" class="px-2 py-1 hover:bg-gray-50 text-gray-600">+</button>
                          </div>

                          <button (click)="store.removeFromCart(item.id)" type="button" class="font-medium text-red-500 hover:text-red-600 text-xs uppercase tracking-wide">
                            წაშლა
                          </button>
                        </div>
                      </div>
                    </li>
                  }
                </ul>
              }
            </div>

            <!-- Footer -->
            @if (store.cart().length > 0) {
              <div class="border-t border-gray-100 px-6 py-6 bg-gray-50">
                <div class="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>სულ გადასახდელი</p>
                  <p>{{ store.cartTotal() }} ₾</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500 mb-6">მიწოდება და გადასახადები დაანგარიშდება გადახდისას.</p>
                <div class="mt-6">
                  <button class="w-full flex items-center justify-center rounded-sm border border-transparent bg-black px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-gray-800 transition-colors uppercase tracking-widest">
                    გადახდა
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `
})
export class CartComponent {
  store = inject(StoreService);
}