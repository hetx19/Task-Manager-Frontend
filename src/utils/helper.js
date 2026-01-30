export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const addThousandsSeparator = (number) => {
  if (number == null || isNaN(number)) {
    return "";
  }

  const [integerPart, fractionalPart] = number.toString().split(".");
  const formatedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formatedIntegerPart}.${fractionalPart}`
    : formatedIntegerPart;
};
