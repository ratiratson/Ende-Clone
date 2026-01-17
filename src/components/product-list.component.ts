import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService, Product } from '../services/store.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 px-4 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h3 class="text-3xl font-serif font-bold text-gray-900 mb-2">რჩეული პროდუქცია</h3>
          <p class="text-gray-500">აღმოაჩინე უნიკალური ნივთები შენი ინტერიერისთვის</p>
        </div>
        
        <div class="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          <button class="px-6 py-2 bg-black text-white rounded-full text-sm font-medium whitespace-nowrap">ყველა</button>
          <button class="px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap">ავეჯი</button>
          <button class="px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap">განათება</button>
          <button class="px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap">დეკორი</button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        @for (product of store.products(); track product.id) {
          <div class="group cursor-pointer">
            <div class="relative aspect-[4/5] bg-gray-100 mb-4 overflow-hidden rounded-sm">
              <img 
                [src]="product.image" 
                [alt]="product.title" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              >
              <!-- Hover Action -->
              <button 
                (click)="store.addToCart(product); $event.stopPropagation()"
                class="absolute bottom-4 right-4 bg-white text-black h-10 w-10 flex items-center justify-center rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
                title="კალათაში დამატება"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
            
            <div class="flex justify-between items-start">
              <div>
                <p class="text-xs text-gray-500 mb-1 uppercase tracking-wide">{{ product.category }}</p>
                <h4 class="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">{{ product.title }}</h4>
              </div>
              <span class="text-lg font-bold text-gray-900">{{ product.price }} ₾</span>
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class ProductListComponent {
  store = inject(StoreService);
}