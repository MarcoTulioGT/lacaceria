import React, { useState } from 'react';

// 1. DEFINICIÓN DE TIPOS CON TYPESCRIPT (TSX)

/**
 * Define la estructura del objeto Producto.
 * Esto asegura que los datos sean consistentes y predecibles.
 */
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

/**
 * Define la estructura de los ítems en el carrito.
 */
interface CartItem extends Product {
  quantity: number;
}

// 2. DATOS DE SIMULACIÓN

const dummyProduct: Product = {
  id: 'taza-001',
  name: 'Taza de Código TypeScript ☕',
  price: 19.99,
  description: 'Una taza robusta para desarrolladores que dominan TypeScript.',
  imageUrl: 'https://placehold.co/300x200/4a90e2/ffffff?text=TSX+Product'
};

// 3. COMPONENTE PRINCIPAL (App)

const App: React.FC = () => {
  // Estado para manejar el carrito (simulado)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [message, setMessage] = useState<string>('');

  const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

  // Lógica para agregar al carrito
  const handleAddToCart = (product: Product) => {
    setMessage('');
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // Si ya existe, incrementa la cantidad
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, agrégalo al carrito
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setMessage(`¡"${product.name}" agregado al carrito!`);
    setTimeout(() => setMessage(''), 3000); // Borra el mensaje después de 3 segundos
  };

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
          body { font-family: 'Inter', sans-serif; }
        `}
      </style>
      
      {/* HEADER Y CARRITO */}
      <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          <span role="img" aria-label="store">🛒</span> Firebase TSX Shop
        </h1>
        <div className="relative p-2 bg-indigo-100 rounded-full">
          <span className="text-indigo-700 text-lg">
            Carrito ({totalItemsInCart})
          </span>
          {/* Aquí es donde se conectaría con la lógica del carrito real */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {totalItemsInCart}
          </span>
        </div>
      </header>
      
      {/* MENSAJE DE CONFIRMACIÓN */}
      {message && (
        <div className="bg-green-500 text-white p-3 rounded-lg shadow-lg mb-6 text-center transition-all duration-300">
          {message}
        </div>
      )}

      {/* DETALLE DEL PRODUCTO (SIMULACIÓN) */}
      <main className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden">
          
          {/* Imagen del Producto */}
          <div className="md:w-1/2 p-6 flex justify-center items-center bg-indigo-50">
            <img 
              src={dummyProduct.imageUrl} 
              alt={dummyProduct.name} 
              className="rounded-lg shadow-xl w-full max-w-sm"
              onError={(e) => { 
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src = "https://placehold.co/300x200/4a90e2/ffffff?text=Error+Loading"; 
              }} 
            />
          </div>
          
          {/* Detalles del Producto */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                {dummyProduct.name}
              </h2>
              <p className="text-indigo-600 text-xl font-semibold mb-4">
                {formatPrice(dummyProduct.price)}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {dummyProduct.description}
              </p>
              
              <p className="text-sm text-gray-500 italic">
                {/* Nota: En una app real, aquí se conectarían los datos con Firestore. */}
                <span role="img" aria-label="note">💡</span> Este es un componente de React/TSX listo para el build.
              </p>
            </div>
            
            {/* Botón de Acción */}
            <button
              onClick={() => handleAddToCart(dummyProduct)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        Desplegado vía Firebase Hosting. Código escrito en React con TypeScript (TSX).
      </footer>
    </div>
  );
};

export default App;