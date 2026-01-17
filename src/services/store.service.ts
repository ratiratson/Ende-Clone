import { Injectable, signal, computed } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // State
  cartOpen = signal(false);
  cart = signal<CartItem[]>([]);
  chatOpen = signal(false);
  messages = signal<ChatMessage[]>([
    { role: 'model', text: 'გამარჯობა! რით შემიძლია დაგეხმაროთ დღეს? შემიძლია გირჩიოთ ავეჯი ან დეკორი.' }
  ]);
  isChatLoading = signal(false);

  // Computed
  cartTotal = computed(() => {
    return this.cart().reduce((acc, item) => acc + (item.price * item.quantity), 0);
  });

  cartCount = computed(() => {
    return this.cart().reduce((acc, item) => acc + item.quantity, 0);
  });

  // Mock Products
  products = signal<Product[]>([
    {
      id: 1,
      title: 'კრემისფერი სავარძელი "Cloud"',
      category: 'ავეჯი',
      price: 1250,
      image: 'https://picsum.photos/id/1080/800/800',
      description: 'ულტრა-კომფორტული სავარძელი თანამედროვე დიზაინით.'
    },
    {
      id: 2,
      title: 'ხის ჟურნალების მაგიდა',
      category: 'ავეჯი',
      price: 450,
      image: 'https://picsum.photos/id/1070/800/800',
      description: 'მუხის მასალისგან დამზადებული მინიმალისტური მაგიდა.'
    },
    {
      id: 3,
      title: 'კერამიკული ვაზა "Terra"',
      category: 'დეკორი',
      price: 85,
      image: 'https://picsum.photos/id/106/800/800',
      description: 'ხელნაკეთი კერამიკული ვაზა.'
    },
    {
      id: 4,
      title: 'იატაკის სანათი "Arc"',
      category: 'განათება',
      price: 320,
      image: 'https://picsum.photos/id/1060/800/800',
      description: 'თანამედროვე სტილის სანათი რბილი განათებით.'
    },
    {
      id: 5,
      title: 'დეკორატიული ბალიში',
      category: 'დეკორი',
      price: 45,
      image: 'https://picsum.photos/id/1050/800/800',
      description: 'ბამბის რბილი ბალიში პასტელურ ფერებში.'
    },
    {
      id: 6,
      title: 'წიგნების თარო "Matrix"',
      category: 'ავეჯი',
      price: 890,
      image: 'https://picsum.photos/id/1078/800/800',
      description: 'მეტალის და ხის კომბინაცია.'
    }
  ]);

  // Actions
  toggleCart() {
    this.cartOpen.update(v => !v);
  }

  toggleChat() {
    this.chatOpen.update(v => !v);
  }

  addToCart(product: Product) {
    this.cart.update(items => {
      const existing = items.find(i => i.id === product.id);
      if (existing) {
        return items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { ...product, quantity: 1 }];
    });
    this.cartOpen.set(true);
  }

  removeFromCart(id: number) {
    this.cart.update(items => items.filter(i => i.id !== id));
  }

  updateQuantity(id: number, delta: number) {
    this.cart.update(items => {
      return items.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  }

  // Gemini Integration
  async sendMessage(text: string) {
    if (!text.trim()) return;

    this.messages.update(msgs => [...msgs, { role: 'user', text }]);
    this.isChatLoading.set(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] || '' });
      const model = ai.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        systemInstruction: `You are a helpful, polite, and knowledgeable sales assistant for a premium furniture store called "Ende". 
        You strictly speak Georgian (Kartuli). 
        You help customers choose furniture, decor, and lighting. 
        Be concise and elegant in your responses. 
        Available products context: ${JSON.stringify(this.products().map(p => ({title: p.title, price: p.price, category: p.category})))}.
        If a user asks about something we don't have, politely suggest a similar item from our catalog.`
      });

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text }] }]
      });

      const responseText = result.response.text();
      
      this.messages.update(msgs => [...msgs, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error('Gemini Error:', error);
      this.messages.update(msgs => [...msgs, { role: 'model', text: 'ბოდიშს გიხდით, ამჟამად ვერ გპასუხობთ. გთხოვთ სცადოთ მოგვიანებით.' }]);
    } finally {
      this.isChatLoading.set(false);
    }
  }
}