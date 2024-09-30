import { useQuery } from "@tanstack/react-query"; // Veri çekimi için React Query'den useQuery kancasını içe aktarıyoruz
import api from "../utils/api"; // API istekleri yapmak için API yardımcı kütüphanesini içe aktarıyoruz
import { useParams } from "react-router-dom"; // URL parametrelerini almak için useParams kancasını içe aktarıyoruz
import Loader from "../components/Loader";
import Error from "../components/Error";
import ListField from "../components/ListField";

const Detail = () => {
  const { id } = useParams(); // URL'den film kimliğini alıyoruz

  // useQuery kancasını kullanarak seçilen filme ait detayları alıyoruz
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["movie"], // Sorgu için benzersiz bir anahtar
    queryFn: () => api.get(`/api/movies/${id}`).then((res) => res.data), // API'den film detaylarını çekiyoruz
  });

  if (isLoading) return <Loader />; // Veriler yüklenirken Loader bileşenini görüntülüyoruz

  if (error) return <Error info={error} refetch={refetch} />; // Hata durumu varsa Error bileşenini görüntülüyoruz

  return (
    <div className="p-10">
      {/* Ana içerik alanı */}
      <div className="flex justify-end">
        {/* Düğme alanı için esnek bir düzen */}
      </div>
      <div className="flex flex-col gap-10 items-center md:flex-row">
        {/* Film detaylarını esnek bir düzenle gösteriyoruz */}
        <div>
          <img
            className="rounded-md" // Resim için köşe yuvarlama stili
            src={`https://picsum.photos/seed/${data.id}/250/400`} // Film posteri için rastgele bir resim URL'si
            alt="poster"
          />
        </div>
        <div className="flex flex-col gap-10">
          {/* Film bilgileri için esnek düzen */}
          <div>
            <h1 className="text-3xl font-semibold mb-3">{data.title}</h1>
            <p>{data.description}</p>
          </div>

          <Field
            label={"izleyici skoru"}
            value={Number(data.rating).toFixed(1)}
          />
          {/* Süre  */}
          <Field label="Süre" value={data.duration} />
          {/* Dil  */}
          <Field label="Dil" value={data.language} />
          {/* Yapımcı  */}
          <Field label="Yapımcı" value={data.director} />
          {/* Yıl */}
          <Field label="Yıl" value={data.year} />
          {/* Ekip */}
          <ListField label="Ekip" arr={data.cast} />
          {/* Tür */}
          <ListField label="Tür" arr={data.genre} />
        </div>
      </div>
    </div>
  );
};

export default Detail;

const Field = ({ label, value }) => {
  // Field bileşeni, etiket ve değeri göstermek için
  return (
    <p>
      <span className="font-semibold me-3">{label}:</span>

      <span className="p-2 rounded-full font-semibold bg-gray-200">
        {value}
      </span>
    </p>
  );
};
