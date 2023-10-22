const puppeteer = require("puppeteer");

const AMAZON_URL = "https://amazon.com";

exports.createKeywords = (str) => {
  if (!str) return;
  let arrayOfWrods;
  arrayOfWrods = str.split(",");

  arrayOfWrods = arrayOfWrods.map((item) => item.trim());

  const searchKeywords = arrayOfWrods.join(" ");

  return searchKeywords;
};

exports.fetchFromAmazon = async (keyword, page) => {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(AMAZON_URL + "?s=" + keyword);

    await page.waitForSelector(
      ".s-main-slot.s-result-list.s-search-results.sg-row",
    );
    const data = await page.$eval(
      ".s-main-slot.s-result-list.s-search-results.sg-row",
      (element) => extractData(element),
    );

    console.log(data);

    for (let a = 0; a < page; a++) {}
  } catch (error) {
    console.log(error, "error from fetching amazon products");
  }
};

const extractData = (parentElement) => {
  let data = [];
  try {
    const elements = parentElement.querySelectorAll(
      '[data-component-type="s-search-result"]',
    );

    for (let element of elements) {
      const product = {
        title: "",
        price: "",
        discount: "",
        mrp: "",
        rating: "",
        star: "",
      };

      let title = element.querySelector(
        ".a-size-base-plus.a-color-base.a-text-normal",
      ).innerText;
      let price = element.querySelector(
        ".a-price > span.a-price-whole",
      ).innerText;
      let discount = element.querySelector("span.a-letter-space").nextSibling
        .innerText;
      let mrp = element.querySelector(
        ".a-price.a-text-price > span.a-offscreen",
      ).innerText;
      let rating = element.querySelector(
        ".a-link-normal.s-underline-text.s-underline-link-text.s-link-style > .a-size-base.s-underline-text",
      ).innerText;
      let star = element.querySelector(".a-row.a-size-small").firstChild
        .ariaLabel;

      if (!title) {
        title = element.querySelector("");
        product["title"] = title;
      }

      if (price) {
        product["price"] = price;
      }

      if (discount) {
        product["discount"] = discount;
      }

      if (mrp) {
        product["mrp"] = mrp;
      }

      if (rating) {
        product["rating"] = rating;
      }

      if (star) {
        product["star"] = star;
      }
      console.log("product", product, "product");
      if (!title || !price || !discount || !mrp || !rating || !star) return;

      data.push(product);
    }

    return data;
  } catch (error) {
    console.log(error, "from extract data");
  }
};
