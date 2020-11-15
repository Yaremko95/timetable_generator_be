const _ = require("lodash");

const bufferToJson = (bufferData) => {
  const lines = String(bufferData).split("\n");
  const headers = lines[0]
    .split(",")
    .map((str) => _.trim(str, "\r"))
    .map((str) => _.trim(str, '"'));
  return _.tail(lines).map((row) =>
    _.zipObject(
      headers,
      row
        .split(",")
        .map((str) => _.trim(str, "\r"))
        .map((str) => _.trim(str, '"'))
    )
  );
};

module.exports = { bufferToJson };
