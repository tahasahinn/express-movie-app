const fs = require("fs");

const deleteRequest = (req, res) => {
  const path = req.url.substring(0, req.url.lastIndexOf("/"));
  const id = req.url.split("/")[3];
s
  if (path === "/api/movies" && id) {
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));
    const isFound = data.find((i) => i.id === id);

    if (!isFound) {
      res.writeHead(404);
      return res.end("Gönderilen id'li eleman bulunamadı");
    }

    const filtred = data.filter((i) => i.id !== id);
    fs.writeFileSync("./data/movies.json", JSON.stringify(filtred));

    res.writeHead(204);
    return res.end();
  }
};

module.exports = deleteRequest;
