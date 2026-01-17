import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-2 cursor-pointer">
          <div class="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-xl rounded-sm">E</div>
          <span class="text-2xl font-serif font-bold tracking-tight text-gray-900">ENDE</span>
        </div>

        <!-- Navigation (Hidden on mobile for simplicity in this demo) -->
        <nav class="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#" class="hover:text-black transition-colors">მთავარი</a>
          <a href="#" class="hover:text-black transition-colors">კატალოგი</a>
          <a href="#" class="hover:text-black transition-colors">ოთახები</a>
          <a href="#" class="hover:text-black transition-colors">ჩვენს შესახებ</a>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <button class="p-2 text-gray-600 hover:text-black transition-colors" (click)="store.toggleCart()">
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              @if (store.cartCount() > 0) {
                <span class="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {{ store.cartCount() }}
                </span>
              }
            </div>
          </button>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  store = inject(StoreService);
}