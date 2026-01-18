import article from "./article";
import banner from "./banner";
import book from "./book";
import errata from "./errata";
import promoCode from "./promoCode";
import purchaser from "./purchaser";
import subscriber from "./subscriber";

export const schema = {
  types: [book, article, banner, errata, promoCode, purchaser, subscriber],
};
