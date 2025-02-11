import { useState } from "react";
import { Card, CardContent } from "./components/Card";
import { Checkbox } from "./components/Checkbox";


const extraOptions = {
  "Kök Hücre": 15000,
  "5 Yön Transfer": 7200,
  "2 Gece 4* Otel": 6290,
  "3 Aylık Bakım Seti": 5000,
  "Vitaminli PRP": 3000,
  "Mezoterapi": 3000,
  "Sedasyon": 5000,
  "Eksozom": 25000,
  "2 Gece 5* Otel": 10000,
  "6 Aylık Bakım Seti": 8000,
};

const packages = [
  {
    name: "Silver",
    price: 50000,
    features: [
      "Operasyon öncesi analiz ve planlama",
      "Anestezi doktoru muayenesi",
      "Maksimum greft",
      "Kan testleri",
      "EKG",
      "Operasyon süresince monitör ile takip",
      "Lokal anestezi",
      "İlaçlar",
      "Bakım kiti",
      "Şapka",
      "Alın bandı",
      "Boyun yastığı",
      "Saç lazeri",
      "Garanti sertifikası",
      "Saç ekimi bilgilendirme kılavuzları",
      "Ömür boyu danışmanlık",
      "7/24 sağlık danışmanlığı hizmeti",
      "Tercümanlık",
      "Medikal takip ve kontrol randevuları",
      "Gizlilik ve VIP hasta protokolü",
      "Özel fotoğraf ve video hizmeti (öncesi-sonrası)",
      "PRP",
    ],
  },
  {
    name: "Gold",
    price: 75000,
    features: [
      "Anestezi doktoru muayenesi",
      "Maksimum greft",
      "Kan testleri",
      "EKG",
      "Operasyon süresince monitör ile takip",
      "Lokal anestezi",
      "İlaçlar",
      "Bakım kiti",
      "Şapka",
      "Alın bandı",
      "Boyun yastığı",
      "Saç lazeri",
      "Garanti sertifikası",
      "Saç ekimi bilgilendirme kılavuzları",
      "Ömür boyu danışmanlık",
      "7/24 sağlık danışmanlığı hizmeti",
      "Tercümanlık",
      "Medikal takip ve kontrol randevuları",
      "Gizlilik ve VIP hasta protokolü",
      "Özel fotoğraf ve video hizmeti (öncesi-sonrası)",
      "Seyahat ve konaklama organizasyonu",
    ],
    removableExtras: Object.keys(extraOptions),
  },
  {
    name: "Platinum",
    price: 113000,
    features: [
      "Operasyon öncesi analiz ve planlama",
      "Anestezi doktoru muayenesi",
      "Maksimum greft",
      "Kan testleri",
      "EKG",
      "Operasyon süresince monitör ile takip",
      "Lokal anestezi",
      "İlaçlar",
      "Bakım kiti",
      "Şapka",
      "Alın bandı",
      "Boyun yastığı",
      "Saç lazeri",
      "Garanti sertifikası",
      "Saç ekimi bilgilendirme kılavuzları",
      "Ömür boyu danışmanlık",
      "7/24 sağlık danışmanlığı hizmeti",
      "Tercümanlık",
      "Medikal takip ve kontrol randevuları",
      "Gizlilik ve VIP hasta protokolü",
      "Özel fotoğraf ve video hizmeti (öncesi-sonrası)",
      "Seyahat ve konaklama organizasyonu",
      "Detaylı saç tipine uygun saç bakım eğitimleri",
      "Özel sağlık sigortası",
    ],
    removableExtras: Object.keys(extraOptions),
  },
];

export default function PackageCustomizer() {
  const [customPackages, setCustomPackages] = useState(
    packages.map((pkg) => ({
      ...pkg,
      selectedExtras: new Set(pkg.removableExtras || []),
      customPrice: pkg.price,
    }))
  );

  const toggleExtra = (pkgName, feature) => {
    setCustomPackages((prev) =>
      prev.map((pkg) => {
        if (pkg.name === pkgName) {
          const newExtras = new Set(pkg.selectedExtras);
          let newPrice = pkg.customPrice;
          
          if (newExtras.has(feature)) {
            newExtras.delete(feature);
            newPrice -= extraOptions[feature];
          } else {
            newExtras.add(feature);
            newPrice += extraOptions[feature];
          }
          
          return { ...pkg, selectedExtras: newExtras, customPrice: newPrice };
        }
        return pkg;
      })
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {customPackages.map((pkg) => (
        <Card key={pkg.name}>
          <CardContent>
            <h2 className="text-xl font-bold">{pkg.name} Paketi</h2>
            <p className="text-lg font-semibold">{pkg.customPrice} TL</p>
            <ul className="my-2">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {pkg.removableExtras && (
              <>
                <h3 className="text-md font-semibold mt-4">Ekstra Hizmetler</h3>
                <ul className="my-2">
                  {pkg.removableExtras.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Checkbox
                        checked={pkg.selectedExtras.has(feature)}
                        onCheckedChange={() => toggleExtra(pkg.name, feature)}
                      />
                      <span>{feature} (+{extraOptions[feature]} TL)</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
