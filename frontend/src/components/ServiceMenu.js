import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { useRef } from "react";

const ServiceMenu = () => {
  const lottieRefs = useRef({});

  const services = [
    { 
      name: "Искусственный интеллект", 
      path: "/ai", 
      lottie: "/animations/planet.json" 
    },
    { name: "О нас", path: "/about", icon: "👥" },
    { name: "SMM", path: "/smm", icon: "📱" },
    { name: "SEO", path: "/seo", icon: "🔍" },
    { name: "Дизайн", path: "/design", icon: "🎨" },
    { name: "Разработка", path: "/develop", icon: "💻" },
    { name: "Кибербезопасность", path: "/cybersecurity", icon: "🛡️" },
    { name: "Блокчейн", path: "/blockchain", icon: "⛓️" },
    { name: "Трафик", path: "/traffic", icon: "🚦" },
  ];

  const handleMouseEnter = (path) => {
    if (lottieRefs.current[path]) {
      lottieRefs.current[path].play();
    }
  };

  const handleMouseLeave = (path) => {
    if (lottieRefs.current[path]) {
      lottieRefs.current[path].stop();
    }
  };

  return (
    <div className="service-menu">
      {services.map((service) => (
        <Link
          to={service.path}
          key={service.path}
          className="service-card"
          onMouseEnter={() => handleMouseEnter(service.path)}
          onMouseLeave={() => handleMouseLeave(service.path)}
        >
          {service.lottie ? (
            <div className="service-icon" style={{ width: 40, height: 40 }}>
              <Lottie
                lottieRef={(ref) => (lottieRefs.current[service.path] = ref)}
                animationData={require(`../public${service.lottie}`)}
                loop={false}
                autoplay={false}
              />
            </div>
          ) : (
            <span className="service-icon">{service.icon}</span>
          )}
          <h3>{service.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default ServiceMenu;