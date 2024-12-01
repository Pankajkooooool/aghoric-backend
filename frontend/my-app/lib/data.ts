export interface Bounty {
  id: string;
  _id?: string;
  title: string;
  description: string;
  price: number;
  cryptoType: string;
  image: string;
  skills: string[];
  time: string;
}

export const bounties: Bounty[] = [
  {
    id: "1",
    title: "Develop a Smart Contract for DeFi Platform",
    description: "We need an experienced Solidity developer to create a smart contract for our upcoming DeFi platform. The contract should handle token swaps, liquidity provision, and yield farming.",
    price: 2500,
    cryptoType: "ETH",
    image: "/placeholder.svg?height=400&width=600",
    skills: ["Solidity", "Ethereum", "Smart Contracts", "DeFi"],
    time: "2024-03-15"
  },
  {
    id: "2",
    title: "Design NFT Collection for Gaming Project",
    description: "We're looking for a talented digital artist to design a collection of 10,000 unique NFTs for our blockchain-based gaming project. The NFTs should be visually appealing and fit our game's fantasy theme.",
    price: 5000,
    cryptoType: "USDC",
    image: "/placeholder.svg?height=400&width=600",
    skills: ["Digital Art", "NFT", "Character Design", "Blockchain"],
    time: "2024-04-01"
  },
  {
    id: "3",
    title: "Develop Cross-chain Bridge",
    description: "We need a blockchain developer to create a cross-chain bridge between Ethereum and Binance Smart Chain. The bridge should allow users to transfer tokens seamlessly between the two networks.",
    price: 8000,
    cryptoType: "BNB",
    image: "/placeholder.svg?height=400&width=600",
    skills: ["Solidity", "Ethereum", "Binance Smart Chain", "Cross-chain"],
    time: "2024-05-10"
  }
];

