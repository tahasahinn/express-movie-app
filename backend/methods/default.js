const defaultRequest = (req, res) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  
  res.write(JSON.stringify({ message: "İstek adresi tanımsız" }));
  res.end();s
};

module.exports = defaultRequest;
