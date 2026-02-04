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

export const getIntials = (name) => {
  if (!name) {
    return "";
  }

  const words = name.split(" ");
  let initial = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initial += words[i][0];
  }

  return initial.toUpperCase();
};
