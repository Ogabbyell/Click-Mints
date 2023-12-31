import MintNFT from "../components/mintPolyaliensNFT";
import MintTicketNFT from "@/components/mintTicketNFT";
import BunnyNFT from "@/components/BunnyNFT";

export default function Mintpad() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <MintNFT />
      <MintTicketNFT/>
      <BunnyNFT /> 
    </div>
  );
}
