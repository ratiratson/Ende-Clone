import { Component, inject, ElementRef, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Toggle Button -->
    <button 
      (click)="store.toggleChat()"
      class="fixed bottom-6 right-6 z-40 bg-black text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-110 flex items-center justify-center"
      aria-label="Open Chat"
    >
      @if (!store.chatOpen()) {
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      } @else {
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      }
    </button>

    <!-- Chat Window -->
    @if (store.chatOpen()) {
      <div class="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-40 border border-gray-100 flex flex-col overflow-hidden animate-slide-up h-[500px]">
        <!-- Header -->
        <div class="bg-black text-white p-4 flex items-center gap-3">
          <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5c0-5.523 4.477-10 10-10z"></path></svg>
          </div>
          <div>
            <h3 class="font-medium text-sm">ENDE ასისტენტი</h3>
            <p class="text-xs text-gray-300">ონლაინ</p>
          </div>
        </div>

        <!-- Messages -->
        <div #scrollContainer class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          @for (msg of store.messages(); track $index) {
            <div [class]="'flex ' + (msg.role === 'user' ? 'justify-end' : 'justify-start')">
              <div [class]="'max-w-[85%] rounded-2xl px-4 py-2 text-sm ' + (msg.role === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none')">
                {{ msg.text }}
              </div>
            </div>
          }
          @if (store.isChatLoading()) {
            <div class="flex justify-start">
              <div class="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex gap-1">
                <div class="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                <div class="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          }
        </div>

        <!-- Input -->
        <div class="p-4 bg-white border-t border-gray-100">
          <div class="flex items-center gap-2">
            <input 
              #chatInput
              type="text" 
              [(ngModel)]="userInput" 
              (keyup.enter)="sendMessage()"
              placeholder="მისწერეთ შეტყობინება..."
              class="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-black outline-none"
            >
            <button 
              (click)="sendMessage()"
              [disabled]="!userInput.trim() || store.isChatLoading()"
              class="p-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up {
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
  `]
})
export class ChatComponent {
  store = inject(StoreService);
  userInput = '';
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor() {
    effect(() => {
      // Auto-scroll when messages change
      const msgs = this.store.messages();
      if (this.scrollContainer) {
        setTimeout(() => {
          this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        }, 50);
      }
    });
  }

  sendMessage() {
    if (!this.userInput.trim()) return;
    this.store.sendMessage(this.userInput);
    this.userInput = '';
  }
}