import MintNFT from "../components/mintPolyaliensNFT";
import MintFoxNFT from "@/components/mintFoxesNFT";
import ClickMintsNFT from "@/components/mintClickMintsNFT";

export default function Mintpad() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <MintNFT />
      <MintFoxNFT/>
      <ClickMintsNFT/>
    </div>
  );
}
