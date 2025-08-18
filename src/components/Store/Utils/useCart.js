// src/components/Store/useCart.js
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

const CART_QUERY_KEY = 'cart';

const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cart = [] } = useQuery({
    queryKey: [CART_QUERY_KEY],
    queryFn: () => {
      const storedCart = localStorage.getItem(CART_QUERY_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    },
  });

  const updateCart = (newCart) => {
    localStorage.setItem(CART_QUERY_KEY, JSON.stringify(newCart));
    queryClient.setQueryData([CART_QUERY_KEY], newCart);
  };

  const addToCart = useMutation({
    mutationFn: (product) => {
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        const updatedCart = cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCart(updatedCart);
      } else {
        updateCart([...cart, { ...product, quantity: 1 }]);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([CART_QUERY_KEY]);
    },
  });

  const removeFromCart = useMutation({
    mutationFn: (id) => {
      const updatedCart = cart.filter((product) => product.id !== id);
      updateCart(updatedCart);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([CART_QUERY_KEY]);
    },
  });

  const clearCart = useMutation({
    mutationFn: () => {
      updateCart([]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([CART_QUERY_KEY]);
    },
  });

  const increaseQuantity = useMutation({
    mutationFn: (id) => {
      const updatedCart = cart.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      );
      updateCart(updatedCart);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([CART_QUERY_KEY]);
    },
  });

  const decreaseQuantity = useMutation({
    mutationFn: (id) => {
      const updatedCart = cart.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(1, product.quantity - 1) } : product
      );
      updateCart(updatedCart);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([CART_QUERY_KEY]);
    },
  });

  return {
    cart,
    addToCart: addToCart.mutate,
    removeFromCart: removeFromCart.mutate,
    clearCart: clearCart.mutate,
    increaseQuantity: increaseQuantity.mutate,
    decreaseQuantity: decreaseQuantity.mutate,
  };
};

export default useCart;
