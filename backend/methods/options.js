const optionsRequest = (req, res) => {
  /*
   * frontend'den bir post/put/patch/delete isteği atıldığı zaman tarayıcı
   * öncelikle server'ın bu tür istekleri kabul ettiğini kontrol etmek amacıyla
   * OPTIONS HTTP methoduyla istek atıyor.
   *
   * Eğer OPTIONS isteğine cevap göndermezsek yukarıdaki istek türlerinin
   * API tarafından kabul edilmediği zannediliyor ve asıl isteği hiç bir zaman atmıyor.
   *
   * OPTIONS isteği gelince doğru header'lar ile cevap gönderirsek,
   * OPTIONS'ın arkasından asıl isteği atıyor.
   */

  // CORS için kabul edilen HTTP metotlarını belirliyoruz
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PUT, PATCH"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  // CORS için kabul edilen header'ları belirtiyoruz
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // İstek sonlandırılıyor
  res.end();
};

module.exports = optionsRequest;
