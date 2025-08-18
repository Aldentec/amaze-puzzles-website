import axios from 'axios';

export const calculateTotalWeight = (cart) => {
  return cart.reduce((total, item) => {
    const itemWeight = parseFloat(item.weight); // Ensure the weight is a number
    if (isNaN(itemWeight) || itemWeight <= 0) {
      console.error(`Invalid weight for item: ${item.title}. Weight: ${item.weight}`);
      return total; // Skip items with invalid weight
    }
    return total + (itemWeight * item.quantity);
  }, 0);
};

export const calculateShippingCost = async (cart, shippingDetails, setShippingCost, setShippingCalculated) => {
  const totalWeight = calculateTotalWeight(cart); // Calculate the total weight of the items in the cart

  if (totalWeight <= 0) {
    throw new Error('Total weight must be greater than 0');
  }

  const payload = {
    address_to: {
      street1: shippingDetails.address,
      city: shippingDetails.city,
      state: shippingDetails.state,
      zip: shippingDetails.zip,
      country: shippingDetails.country,
    },
    address_from: {
      street1: '140 Teresa Ln',
      city: 'Winston',
      state: 'OR',
      zip: '97496',
      country: 'US',
    },
    parcels: [
      {
        length: 10,
        width: 8,
        height: 4,
        distance_unit: 'in',
        weight: totalWeight, // Total weight in ounces
        mass_unit: 'oz',
      }
    ],
  };

  try {
    const response = await axios.post('https://api.goshippo.com/shipments/', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Find the cheapest rate (as an example of consistency)
    const rates = response.data.rates;
    const cheapestRate = rates.reduce((prev, current) => {
      return (parseFloat(prev.amount) < parseFloat(current.amount)) ? prev : current;
    });

    setShippingCost(parseFloat(cheapestRate.amount));  // Set the shipping cost from the API response
    setShippingCalculated(true);  // Mark shipping as calculated
  } catch (error) {
    console.error('Error calculating shipping:', error.response ? error.response.data : error.message);
    throw error;
  }
};
