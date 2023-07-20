import * as React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Progress,
} from "@material-tailwind/react";



export default function ClickMintsNFT() {
  
  return (
    <div className="flex items-center justify-center">
      <Card className="w-96">
        <CardHeader shadow={false} floated={false} className="h-60">
          <Image
            src="/bubble.png"
            fill={true}
            alt="Click Mints picture"
            className="w-full h-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between mb-2">
            <Typography color="blue-gray" className="font-bold">
              ClickMints NFT
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              FREE{" "}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            This NFT is for community members with OG role. Only one NFT can be
            minted per wallet. Minting is free and comes with 1000 CMT tokens.
          </Typography>
          <div className="mt-3 flex flex-col items-end justify-between">
            <Typography color="blue-gray" className="font-medium">
              0/0 Minted
            </Typography>
            <Progress value={0} />
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
          <Button fullWidth color="gray">
            Coming Soon
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
