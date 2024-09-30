const bodyParser = require("../utils/bodyParser");
const crypto = require("crypto");
const fs = require("fs");

// Film nesnesi için gerekli alanların listesi
const keys = ["title", "year", "rating", "description", "language", "director"];

const postRequest = async (req, res) => {
  // Belirli bir URL'e istek atılıp atılmadığını kontrol et
  if (req.url === "/api/movies") {
    // isteğin body kısmına eriş
    const body = await bodyParser(req);

    // gelen veriyi kontrol et: tüm zorunlu alanların dolu olduğunu ve genre ile cast dizilerinin boş olmadığını doğrula
    if (
      keys.some((key) => !body[key]) || // zorunlu alan kontrolü
      !body.genre.length > 0 ||
      !body.cast.length > 0
    ) {
      res.writeHead(404); // hata durumu belirle
      res.end("Lütfen zorunlu olan bütün alanları tanımlayınnn");
      return;
    }

    // kaydedilecek filme id ekle (üniversal unique identifier)
    body.id = crypto.randomUUID(); // benzersiz bir id oluştur

    // json dosyasından verileri al
    let data = fs.readFileSync("./data/movies.json", "utf-8");
    data = JSON.parse(data);

    // mevcut filmlerin üzerine yeni film ekle
    data.push(body);

    // json dosyasını güncelle
    fs.writeFileSync("./data/movies.json", JSON.stringify(data));

    // client'a başarılı bir şekilde yanıt gönder
    res.writeHead(201);
    res.end(JSON.stringify(body)); // yeni oluşturulan film nesnesini gönder
  } else {
    // geçersiz bir URL'e istek atıldığında hata mesajı gönder
    res.writeHead(404);
    res.end("Geçersiz yola istek atıldı");
  }
};

module.exports = postRequest;
