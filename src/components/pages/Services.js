import { useSelector } from "react-redux";
import CardService from "../ui/CardService";
import Title from "../ui/Title";
import SEO from "../ui/SEO";
import "../../styles/services.css";

export const Services = () => {
  // Hooks
  const { services } = useSelector((state) => state.about);

  return (
    <>
      <SEO
        title="Servicios | Alexander.js"
        description="Algunos servicios ofrecidos por Alexander Peñaloza"
      />
      <Title title="Servicios" subtitle="Lo que hago" />
      <div className="services-container">
        <div className="list-services">
          {services.map((service) => (
            <CardService key={service._id} service={service} />
          ))}
        </div>
      </div>
    </>
  );
};
