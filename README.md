# 📚 TechBook Store

**TechBook Store** is an Angular-based web application designed for book lovers — especially those interested in **technology and programming**.  
It allows users to **browse**, **search**, **view details**, and **purchase tech-related books**, as well as **save favorites** for later.  
The project integrates Firebase Authentication for secure login and registration.

---

## 🌟 Features

- 🧭 **Browse new books** from the ITBook API  
- 🔍 **Search books** by title, keyword, or author  
- 💾 **Add books to cart** for purchase tracking  
- ❤️ **Add or remove books from favorites** for future reference  
- 🛒 **Manage cart items** with dynamic quantity and total price updates  
- 🌙 **Dark mode** toggle (stored in localStorage)  
- 🔐 **Firebase Authentication** (Sign up, Login, Logout)  
- 💾 **Persistent data storage** using `localStorage`  
- 📱 **Fully responsive** for desktop and mobile users  

---

## 🧱 Project Structure

```bash
TechBook-Store/
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   ├── data.service.ts       # Handles cart, favorites, and API logic
│   │   │   └── auth.service.ts       # Manages Firebase authentication
│   │   ├── components/               # UI components (book list, cart, etc.)
│   │   ├── pages/                    # Page views (home, favorites, cart, login)
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/                       # Images, icons, etc.
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
└── README.md
```
---

**⚙️ Installation & Setup**
1. Clone the repository
git clone https://github.com/<your-username>/TechBook-Store.git
cd TechBook-Store


2. Install dependencies
npm install

3. Run the app
ng serve

---

## **🧩 Services Overview**

🔹 DataService (src/app/services/data.service.ts)

Manages the bookstore logic, including cart, favorites, mode settings, and book retrieval.

Main Features:

Local storage persistence for cart and favorites

Reactive state management with BehaviorSubject

API integration with IT Book Store API
| Method                     | Description               |
| -------------------------- | ------------------------- |
| `addToCart(item)`          | Add book to shopping cart |
| `removeFromCart(item)`     | Remove book from cart     |
| `addToFavorite(item)`      | Add book to favorites     |
| `removeFromFavorite(item)` | Remove from favorites     |
| `getNewbooks()`            | Fetch latest tech books   |
| `search(query)`            | Search books by keyword   |
| `viewDetails(id)`          | View book details         |
| `saveMode()`               | Save dark/light mode      |
| `getCartItems()`           | Retrieve cart items       |
| `getFavoriteItem()`        | Retrieve favorite items   |

🔹 AuthService (src/app/services/auth.service.ts)

Handles user authentication using Firebase Auth.

Key Methods:

| Method                                | Description                        |
| ------------------------------------- | ---------------------------------- |
| `register(email, username, password)` | Register new user                  |
| `login(email, password)`              | Log in existing user               |
| `logout()`                            | Sign out current user              |
| `getCurrentUser()`                    | Get the current authenticated user |
| `isLoggedIn()`                        | Check if a user is logged in       |

---

## **🧰 Tech Stack**

Angular 18

TypeScript

Firebase Authentication

RxJS

Bootstrap / TailwindCSS

SweetAlert2 (for alerts)

LocalStorage API

ITBook Store API

--- 

## **👨‍💻 Developer**

Ahmed Hamed
Frontend Developer specializing in Angular & Next js 
🎯 Passionate about crafting interactive, user-friendly web applications.
📘 Currently studying Engineering at Al-Azhar University.

