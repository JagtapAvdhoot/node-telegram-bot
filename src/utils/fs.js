const fs = require("fs");

exports.readFile = async (pathToFile) => {
  const data = fs.readFileSync(pathToFile, {
    encoding: "utf8",
  });

  console.log(data);

  return data;
};

exports.writeFile = async (pathToFile, data, encoding) => {
  try {
  } catch (error) {}
};
