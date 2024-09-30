const defaultRequest = (req, res) => {
  // cevab'ın durum kodunu belirle (404: Bulunamadı)
  res.statusCode = 404;

  // cevaba gönderilecek içeriğin tipini header olarak ekle
  // JSON formatında bir içerik gönderileceği için Content-Type'ı application/json olarak ayarlıyoruz
  res.setHeader("Content-Type", "application/json");

  // cevab'ın içeriğini belirle
  // Kullanıcıya gönderilecek mesajı JSON formatında belirliyoruz
  res.write(JSON.stringify({ message: "İstek adresi tanımsız" }));

  // cevabı client'a gönder
  // Bu işlem, cevabın tamamlandığını ve istemciye gönderildiğini belirtir
  res.end();
};

module.exports = defaultRequest;
