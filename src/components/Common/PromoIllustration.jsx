/* eslint-disable react/prop-types */
import Saly from "../../assets/Saly-1.png"

const PromoIllustration = ({promoData}) => {
  const {heading,title,description} = promoData;
    return (
        <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
      <div className="text-white">

        <img src={Saly} alt="Illustration" className="mx-auto" />

        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p className="text-xl mb-4">{title}</p>
        <p className="mb-8">
          {description}
        </p>
      </div>


    </div>
    );
};

export default PromoIllustration;