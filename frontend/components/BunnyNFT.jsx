import * as React from "react";
import Image from "next/image";
import styles from "../styles/NftMinter.module.css";
import { useState } from "react";
import { Contract } from "alchemy-sdk";
import { useAccount, useSigner } from "wagmi";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Progress,
} from "@material-tailwind/react";
import bunnyAbi from "../contracts_abi/bunnyAbi.json";


export default function BunnyNFT({
  contractAddress = "0xFA12Cd1d1110f3e1C90c0065E12aE41438AC2878",
  tokenUri,
  abi = bunnyAbi,
}) {
  const { address, isDisconnected } = useAccount();

  // Get the signer instance for the connected wallet
  const { data: signer } = useSigner();

  // State hooks to track the transaction hash and whether or not the NFT is being minted
  const [txHash, setTxHash] = useState();
  const [isMinting, setIsMinting] = useState(false);

  // set display price on user interface
  const [displayPrice, setDisplayPrice] = useState(0.001);

  // get number of NFTs minted
  const [totalSupply, setTotalSupply] = useState(0);

  // get total number of NFTs in colllection
  const [maxSupply, setMaxSupply] = useState(0);

  const [nftMintPrice, setNftMintPrice] = useState(0);

  // Create a new instance of the NFT contract using the contract address and ABI
  const bnyContract = new Contract(contractAddress, abi, signer);

  // interact with the deployed smart contract
  const getMint = async () => {
    const totalNftsInCollection = await bnyContract.maxSupply();
    setMaxSupply(Number(totalNftsInCollection));

    const mintPrice = await bnyContract.cost();
    setNftMintPrice(mintPrice.toString());

    const nftMinted = await bnyContract.totalSupply();
    setTotalSupply(Number(nftMinted));

    const nftsOwned = await bnyContract.balanceOf(address);
  };

  // display percentage of NFT minted using progress bar
  const percentageNftMinted = ((totalSupply / maxSupply) * 100).toFixed(0);

  React.useEffect(() => {
    if (bnyContract?.signer) {
      getMint();
    }
  }, [getMint]);

  // Function to mint a new NFT
  const mintNFT = async () => {
    try {
      // Set isMinting to true to show that the transaction is being processed
      setIsMinting(true);
      // Call the smart contract function to mint a new NFT with the provided token URI and the user's address
      const mintTx = await bnyContract.safeMint({ value: nftMintPrice });
      // Set the transaction hash in state to display in the UI
      setTxHash(mintTx?.hash);
      // Wait for the transaction to be processed
      await mintTx.wait();
      // Reset isMinting and txHash in state
      setIsMinting(false);
      setTxHash(null);
    } catch (e) {
      // If an error occurs, log it to the console and reset isMinting to false
      console.log(e);
      setIsMinting(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-96">
        <CardHeader shadow={false} floated={false} className="h-60">
          <Image
            src={"/static/images/bunny2.jpeg"}
            fill={true}
            alt="Click Mints picture"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between mb-2">
            <Typography color="blue-gray" className="font-bold">
              Bunny Crew
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              {displayPrice} MATIC{" "}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            The Bunny Crew Collection is made up of 30 Bunny NFTs on the Polygon
            Mumbai Testnet. <b>Only one NFT can be minted per wallet</b>.
          </Typography>
          <div className="mt-3 flex flex-col items-end justify-between">
            <Typography color="blue-gray" className="font-medium">
              {totalSupply}/{maxSupply} Minted
            </Typography>
            <Progress value={percentageNftMinted} label=" " />
            <div className="mt-3 group inline-flex rounded-xl">
              <button className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                1
              </div>
              <button className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          {isDisconnected ? (
            <p>Connect your wallet to get started</p>
          ) : !txHash ? (
            <Button
              fullWidth
              disabled={isMinting}
              onClick={async () => await mintNFT()}
            >
              {isMinting ? "Minting..." : "Mint"}
            </Button>
          ) : (
            <div>
              Successfully minted your NFT!
              <div>
                <h3 className={styles.attribute_input_label}>TX ADDRESS</h3>
                <a
                  href={`https://mumbai.polygonscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={styles.address_container}>
                    <div>
                      {txHash.slice(0, 6)}...{txHash.slice(6, 10)}
                    </div>
                    <img
                      src={
                        "https://static.alchemyapi.io/images/cw3d/Icon%20Large/etherscan-l.svg"
                      }
                      width="20px"
                      height="20px"
                    />
                  </div>
                </a>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
