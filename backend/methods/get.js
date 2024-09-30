const fs = require("fs");

const getRequest = (req, res) => {

  const path = req.url.slice(0, 11);
  const id = req.url.split("/")[3];
  const param = req.url.split("=").pop().toLowerCase().trim();

  if (path === "/api/movies" && id) {
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));
    const movie = data.find((i) => i.id === id);

    if (movie) {
      return res.end(JSON.stringify(movie));
    }
    
    res.writeHead(404);
    return res.end(JSON.stringify({ message: "Aranılan film bulunamadı" }));
  }
  
  if (path === "/api/movies") {
    const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    if (param && param !== "/api/movies") {
      const filtred = movies.filter((movie) =>
        movie.title.toLowerCase().includes(param)
      );

      return res.end(JSON.stringify(filtred));
    }
    return res.end(JSON.stringify(movies));
  }
  res.writeHead(404);
  res.end(JSON.stringify({ message: "Yol bulunamadı" }));
};

module.exports = getRequest;
