import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Card from "./components/Card.js";
import Weather from "./components/Weather.js";
import Login from "./components/Login.js";
import "./styles/App.css";

interface Product {
  id: string;
  title: string;
  color: string;
}

const getCurrentUser = async (): Promise<string | null> => {
  try {
    const response = await fetch("/api/auth/user", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data.user;
    }
    return null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

const login = async (name: string): Promise<void> => {
  try {
    await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name }),
    });
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

const logout = async (): Promise<void> => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Error fetching products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        await fetchCart();
      } else {
        const error = await response.json();
        console.error(`Error adding to cart: ${error.error}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        await fetchCart();
      } else {
        const error = await response.json();
        console.error(`Error removing from cart: ${error.error}`);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchProducts();
      const user = await getCurrentUser();
      setCurrentUser(user);
      if (user) {
        await fetchCart();
      }
    })();
  }, []);

  const handleLogin = async (name: string) => {
    await login(name);
    setCurrentUser(name);
    await fetchCart();
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setCart([]);
  };

  const cards = products.map((product, index) => (
    <Card
      key={product.id}
      id={product.id}
      color={product.color}
      title={product.title}
      currentUser={currentUser}
      isInCart={cart.includes(product.id)}
      onAddToCart={addToCart}
      onRemoveFromCart={removeFromCart}
    />
  ));

  return (
    <div>
      <h1>Rohan's Tee Shop</h1>
      <h2>¯\_(ツ)_/¯</h2>
      <Weather />
      <Login
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        cartItemCount={currentUser ? cart.length : null}
      />
      <div className="cards-container">{cards}</div>
    </div>
  );
};

if (typeof window !== "undefined") {
  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
}

export default App;
