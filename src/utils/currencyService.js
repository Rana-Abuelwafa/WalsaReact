export const fetchUserCountry = async () => {
  try {
    const response = await fetch("https://ipwho.is/");
    // .then((res) => res.json())
    // .then((data) => console.log(data.country));

    // const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    //console.log("User country:", data.country_name); // e.g., "United States"
    //console.log("User country:", data.country);
    //return data.country_name;
    return data.country;
  } catch (error) {
    //console.error("Failed to get country", error);
  }
};

export const getCurrencyFromCountry = async (countryCode) => {
  const response = await fetch(
    "https://restcountries.com/v3.1/name/" + countryCode + "?fields=currencies"
  );
  let AvailableCurr = ["EGP", "USD", "EUR"];
  let data = await response.json();
  const currencies = data[0].currencies;

  //let currency = Object.keys(data[0].currencies)[0]; // e.g., "USD"
  const currencyCode = Object.keys(currencies)[0]; // e.g., "EGP"

  if (AvailableCurr.includes(currencyCode)) {
    const currencySymbol = currencies[currencyCode]?.symbol; // e.g., "£"
    localStorage.setItem("currencySymbol", currencySymbol);
    console.log("currencySymbol ", currencySymbol);
    return currencyCode;
  } else {
    const currencySymbol = "$";
    localStorage.setItem("currencySymbol", currencySymbol);
    return "USD";
  }
};
