const fs = require("fs");

const deleteRequest = (req, res) => {
  // url'in temel adresini değişkene aktar (sondaki param dışarısında kalan)
  const path = req.url.substring(0, req.url.lastIndexOf("/"));

  // url'in sonundaki id değerini değişkene aktar
  const id = req.url.split("/")[3];

  // API çağrısının doğru yolu ve id'nin varlığı kontrol ediliyor
  if (path === "/api/movies" && id) {
    // bütün filmleri al
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    // parametre olarak gelen id'li film dizisinde var mı kontrol et
    const isFound = data.find((i) => i.id === id);

    // eğer film bulunamazsa 404 hatası gönder
    if (!isFound) {
      res.writeHead(404);
      return res.end("Gönderilen id'li eleman bulunamadı");
    }

    // diziden id'si bilinen filmi kaldır
    const filtred = data.filter((i) => i.id !== id);

    // güncellenmiş film dizisini json dosyasına yaz
    fs.writeFileSync("./data/movies.json", JSON.stringify(filtred));

    // client'a başarılı bir şekilde silindi cevabı gönder
    res.writeHead(204);
    return res.end();
  }
};

module.exports = deleteRequest;
