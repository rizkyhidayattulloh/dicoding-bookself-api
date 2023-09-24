module.exports = (data, filter, queryParams) => {
  for (const query in queryParams) {
    if (!filter.hasOwnProperty(query)) continue;

    data = filter[query](data, queryParams[query]);
  }

  return data;
};
