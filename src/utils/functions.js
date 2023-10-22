const { readFile } = require("./fs");
const path = require("path");
const { createKeywords } = require("./puppeteer");

exports.updateSearchData = async (keywords) => {
  let currentDayData;
  try {
    const _keywords = createKeywords(keywords);
    let staleSearchData = await readFile(
      path.join(process.cwd(), "src", "data", "search.json"),
    );
    const today = new Date().toLocaleDateString();

    if (Array.isArray(staleSearchData[today])) {
    }

    for (let keyword of _keywords) {
      const searchExists = staleSearchData.findIndex(
        (data) => data.text === keyword,
      );

      if (searchExists === -1) {
        staleSearchData.push({
          text: keyword,
          page: 1,
          lastSearch: Date.now(),
        });
      } else {
        staleSearchData[searchExists] = {
          page: staleSearchData[searchExists].page + 1,
          lastSearch: Date.now(),
        };
      }
    }
  } catch (error) {
    console.log(error, "from update search data");
  }
};
