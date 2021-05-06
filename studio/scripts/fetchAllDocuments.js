function fetchAllDocuments(client) {
  return client
    .request({
      url: `/data/export/${client.config().dataset}`,
    })
    .then((res) =>
      res
        .trim()
        .split('\n')
        .map((line) => JSON.parse(line)),
    );
}

module.exports = fetchAllDocuments;
