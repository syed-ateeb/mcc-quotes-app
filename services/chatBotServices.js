import * as Location from 'expo-location';
import { getQuoteOfTheDay } from '../services/quoteService';

const commands = `1 - Returns your current address
2 - Returns quote of the day`;

const getAddressString = async () => {
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const { latitude, longitude } = location.coords;

    const postalAddress = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const {
      city,
      country,
      district,
      isoCountryCode,
      postalCode,
      region,
      street,
      subregion,
    } = postalAddress[0];

    return `
City: ${city}
Country: ${country}
District: ${district}
ISO Code: ${isoCountryCode}
Postal Code: ${postalCode}
Region: ${region}
Street: ${street}
Sub Region: ${subregion}`;
  } catch (e) {
    return 'Could not be loaded. Check if location services are available';
  }
};

const getQuoteOfTheDayString = async () => {
  const { success, data } = await getQuoteOfTheDay();
  if (success) {
    return `\nAuthor - ${data.quote.author}\nQuote - ${data.quote.body}`;
  }
  return 'Quote of the day could not be loaded';
};

export { commands, getAddressString, getQuoteOfTheDayString };
