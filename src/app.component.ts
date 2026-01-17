import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { HeroComponent } from './components/hero.component';
import { ProductListComponent } from './components/product-list.component';
import { CartComponent } from './components/cart.component';
import { ChatComponent } from './components/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    HeroComponent, 
    ProductListComponent,
    CartComponent,
    ChatComponent
  ],
  template: `
    <div class="font-sans antialiased text-gray-900 bg-white min-h-screen selection:bg-black selection:text-white">
      <app-header />
      
      <main class="pt-20">
        <app-hero />
        <app-product-list />
      </main>

      <footer class="bg-gray-50 border-t border-gray-100 py-12 px-4 mt-20">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 class="font-serif font-bold text-lg mb-4">ENDE</h4>
            <p class="text-sm text-gray-500 leading-relaxed">
              თანამედროვე ავეჯი და დეკორი თქვენი სახლისთვის. ხარისხი და ესთეტიკა ყველა დეტალში.
            </p>
          </div>
          <div>
            <h4 class="font-bold text-sm uppercase tracking-wider mb-4">ნავიგაცია</h4>
            <ul class="space-y-2 text-sm text-gray-500">
              <li><a href="#" class="hover:text-black">მთავარი</a></li>
              <li><a href="#" class="hover:text-black">კატალოგი</a></li>
              <li><a href="#" class="hover:text-black">ბლოგი</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-sm uppercase tracking-wider mb-4">დახმარება</h4>
            <ul class="space-y-2 text-sm text-gray-500">
              <li><a href="#" class="hover:text-black">მიწოდება</a></li>
              <li><a href="#" class="hover:text-black">დაბრუნება</a></li>
              <li><a href="#" class="hover:text-black">კონტაქტი</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-sm uppercase tracking-wider mb-4">გამოგვყევით</h4>
            <div class="flex gap-4">
              <a href="#" class="text-gray-400 hover:text-black transition-colors">Instagram</a>
              <a href="#" class="text-gray-400 hover:text-black transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        <div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
          &copy; 2024 ENDE Clone. ყველა უფლება დაცულია.
        </div>
      </footer>

      <app-cart />
      <app-chat />
    </div>
  `
})
export class AppComponent {}