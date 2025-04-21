import Heading from "../utils/Heading";
import Hero from "../../components/Hero";
import SecHero from "../../components/SecHero";
import ProductsHomeList from "../../components/ProductsHome";
import AboutUsHome from "../../components/AboutUsHome";

export default function Home() {
  return (
    <div>
      <Heading
        title={`Kids Planet`}
        description="Kids Planet هو افضل مكان لبيع لبس الاطفال في مصر من حيث الجوده و السعر"
        keywords="kids planet, ملابس اطفال, لبس اطفال, اطفال, لبس , محلات لبس اطفال , كيدز بلانت, كيدز"
      />
      <div>
        <Hero />
        <SecHero />
        <ProductsHomeList />
        <AboutUsHome />
      </div>
    </div>
  );
}
