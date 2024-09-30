import InputField from "../components/InputField";
import { inputs } from "../utils/constants";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate(); // Farklı rotalara yönlendirme yapabilmek için hook

  // Form gönderimini ele al
  const handleSubmit = (e) => {
    e.preventDefault();

    // Input verilerini nesne olarak topla
    const formdata = new FormData(e.target); // Form elemanından FormData nesnesi oluştur
    const movieData = Object.formEntries(formdata.entries()); // formdata'dan alınan verileri bir nesneye dönüştür

    // Türleri diziye çevir
    movieData.genre = movieData.genre.split(",");

    // Ekibi diziye çevir
    movieData.cast = movieData.cast.split(",");

    // API'ye film oluşturmak için HTTP isteği gönder
    api
      .post("/api/movies", movieData)
      .then((res) => {
        // Başarılı yanıt durumunda
        toast.success("Film Listeye Eklendi");

        // Yanıt içinden film ID'si alarak film detay sayfasına yönlendir
        navigate(`/movie/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err); // Hata ayıklama için hatayı konsola yazdır
        toast.error("Üzgünüz :( İşlem Başarısız");
      });
  };

  return (
    <div className="bg-yellow-600 flex-1 grid place-items-center px-5 py-8">
      <div className="bg-white w-full max-w-[800px] p-10 rounded shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">Yeni Film Oluştur</h1>
        <form
          onSubmit={handleSubmit} // Form gönderildiğinde handleSubmit fonksiyonunu çalıştır
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* inputs dizisinde tanımlı olan her input için InputField bileşenini render et */}
          {inputs.map((props) => (
            <InputField {...props} />
          ))}

          <button className="shadow border py-3 rounded-lg hover:shadow-lg hover:bg-gray-200 transition">
            Oluştur
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
