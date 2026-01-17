import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <div class="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-gray-100">
      <!-- Background Image -->
      <img src="https://picsum.photos/id/1065/1600/900" alt="Interior" class="absolute inset-0 w-full h-full object-cover opacity-90">
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/20"></div>

      <!-- Content -->
      <div class="relative z-10 text-center text-white px-4 max-w-4xl animate-fade-in-up">
        <h2 class="text-lg md:text-xl font-medium tracking-[0.2em] mb-4 uppercase text-gray-200">
          ახალი კოლექცია
        </h2>
        <h1 class="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
          შენი სახლის <br> ესთეტიკა
        </h1>
        <button class="bg-white text-black px-8 py-4 text-sm font-bold tracking-widest hover:bg-gray-100 transition-colors uppercase">
          ნახე კოლექცია
        </button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 1s ease-out forwards;
    }
  `]
})
export class HeroComponent {}