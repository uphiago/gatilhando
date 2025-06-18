import Lottie from "lottie-react";

import { companyLogos } from "../constants";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Integramos diferentes tecnologias para transformar ideias em realidade
      </h5>
      <ul className="flex">
        {companyLogos.map((logo, i) => (
          <li key={i} className="flex items-center justify-center flex-1 h-[8.5rem]">
            {typeof logo === "string" ? (
              <img src={logo} alt={`logo-${i}`} className="object-contain w-[134px] h-[28px]" />
            ) : (
              <Lottie animationData={logo} loop autoplay className="w-[134px] h-[90px]" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
