import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function Example() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="flex-row w-full max-w-[48rem]">
        <CardHeader
          shadow={false}
          floated={false}
          className="w-2/5 shrink-0 m-0 rounded-r-none"
        >
          <img
            src="/images/polyalien3.png"
            alt="wallpaper"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="blue" className="uppercase mb-4">
            startups
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Lyft launching cross-platform service this week
          </Typography>
          <Typography color="gray" className="font-normal mb-8">
            Like so many organizations these days, Autodesk is a company in
            transition. It was until recently a traditional boxed software
            company selling licenses. Yet its own business model disruption is
            only part of the story
          </Typography>
          <a href="#" className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </a>
        </CardBody>
      </Card>
    </div>
  );
}

import * as React from "react";
import styles from "../styles/NftMinter.module.css";
import { useState } from "react";
import { Contract } from "alchemy-sdk";
import { useAccount, useSigner } from "wagmi";

import { Button, Progress} from "@material-tailwind/react";
import contractAbi from "../contracts_abi/contractAbi.json";

// NFT Minter component function
export default function MintNFT({
  contractAddress = "0xb144F34890BbcCE87E6423fa1e089f99D56E588e",
  tokenUri,
  abi = contractAbi,
}) {
  // Get the user's wallet address and status of their connection to it
  const { address, isDisconnected } = useAccount();

  // Get the signer instance for the connected wallet
  const { data: signer } = useSigner();

  // State hooks to track the transaction hash and whether or not the NFT is being minted
  const [txHash, setTxHash] = useState();
  const [isMinting, setIsMinting] = useState(false);

  // set number of tokens to mint
  const [maxMintAmount, setMaxMintAmount] = useState(1);
  const [mintAmount, setMintAmount] = useState(1);

  // set mint cost from smart contract
  const [cost, setCost] = useState(0);

  // get number of NFTs owned by the wallet
  const [totalSupply, setTotalSupply] = useState(0);

  // get total number of NFTs in colllection
  const [maxSupply, setMaxSupply] = useState(0);

  // set display price on user interface
  const [displayPrice, setDisplayPrice] = useState(0.05);

  const nftContract = new Contract(contractAddress, abi, signer);

  // interact with the deployed smart contract
  const getMint = async () => {
    const price = await nftContract.cost();
    console.log(price.toString());
    setCost(price.toString());

    const nftLeft = await nftContract.totalSupply();
    console.log(nftLeft.toString());
    setTotalSupply(Number(nftLeft));

    const totalNftsInCollection = await nftContract.maxSupply();
    console.log(Number(totalNftsInCollection));
    setMaxSupply(Number(totalNftsInCollection));

    const amount = await nftContract.maxMintAmount();
    console.log(Number(amount));
    setMaxMintAmount(Number(amount));
  };

  React.useEffect(() => {
    if (nftContract?.signer) {
      getMint();
    }
  }, [nftContract]);

  function decrement() {
    if (mintAmount > 1) {
      setMintAmount((a) => a - 1);
      setDisplayPrice((a) => a / 2);
    }
  }

  function increment() {
    if (mintAmount < maxMintAmount) {
      increment;
      setMintAmount((a) => a + 1);
      setDisplayPrice((a) => a * 2);
    }
  }

  console.log(cost);

  // display percentage of NFT left using progress bar
  const percentageNftLeft = ((totalSupply / maxSupply)*100);
  console.log(percentageNftLeft);

  // Function to mint a new NFT
  const mintNFT = async () => {
    console.log(tokenUri, contractAddress, address);

    // Create a new instance of the NFT contract using the contract address and ABI
    // const nftContract = new Contract(contractAddress, abi, signer);

    try {
      // Set isMinting to true to show that the transaction is being processed
      setIsMinting(true);
      // Call the smart contract function to mint a new NFT with the provided token URI and the user's address
      const mintTx = await nftContract.mint(mintAmount, {
        value: (cost * mintAmount).toString(),
      });
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
    <div className="cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
      <div className="relative flex items-end overflow-hidden rounded-xl">
        <img src="/images/polyalien3.png" alt="wallpaper" />
      </div>

      <div className="mt-1 p-2">
        <h1 className="text-lg font-bold">PolyAliens NFT</h1>
        <div>
          <p>
            The PolyAliens are a group of Aliens from outer space. The
            collection is made up of 50 NFTs on MATIC Mumbai. A maximum of 2
            NFTs can be minted per wallet.{" "}
          </p>
        </div>
        <div className="mt-3 flex flex-col items-end justify-between">
          <div>
            {totalSupply}/{maxSupply} Minted
          </div>
          <Progress value={percentageNftLeft} label=" " />
        </div>
        <div className="mt-3 flex items-end justify-between">
          <p>
            <span className="text-lg ">
              {displayPrice} {""}MATIC{" "}
            </span>
          </p>

          <div className="group inline-flex rounded-xl">
            <button
              onClick={() => {
                decrement();
              }}
              className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
            >
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
              {mintAmount}
            </div>
            <button
              onClick={() => {
                increment();
              }}
              className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
            >
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
      </div>
      <div>
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
      </div>
    </div>
  );
}
