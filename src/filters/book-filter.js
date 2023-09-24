const reading = (books, queryValue) => {
  if (isNaN(queryValue)) return;

  queryValue = Boolean(Number(queryValue));

  return books.filter((book) => book.reading === queryValue);
};

const finished = (books, queryValue) => {
  if (isNaN(queryValue)) return;

  queryValue = Boolean(Number(queryValue));

  return books.filter((book) => book.finished === queryValue);
};

const name = (books, queryValue) => {
  if (!queryValue) return;

  queryValue = queryValue.toLowerCase();

  return books.filter((book) => book.name.toLowerCase().includes(queryValue));
};

module.exports = {
  reading,
  finished,
  name,
};
