
export const validateForm = (details, shippingCalculated) => {
    const allFieldsFilled = Object.values(details).every((value) => value.trim() !== '');
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(details.email);
  
    const isAddressValid = details.address.trim().length > 3 &&
                           details.city.trim().length > 1 &&
                           details.state.trim().length === 2 &&
                           details.zip.trim().length >= 5 &&
                           details.country.trim().length >= 2;
  
    return allFieldsFilled && isEmailValid && isAddressValid && shippingCalculated;
  };
  