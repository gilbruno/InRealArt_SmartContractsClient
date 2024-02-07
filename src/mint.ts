import { ethers } from "ethers"
import * as dotenv from "dotenv"

dotenv.config()

// Define TypeScript interfaces for the NFT and Royalty structure
interface NFT {
    name: string
    description: string
    certificateAuthenticity: string
    tags: string[]
    permissions: string[]
    height: number
    width: number
    withIntellectualProperty: boolean
    termIntellectualProperty: number
}

// Define the function signature in the contract ABI
// Define the function signature in the contract ABI
const contractABI: ethers.ContractInterface = [
    "function mintNFT(string memory _tokenURI, tuple(string name, string description, string certificateAuthenticity, string[] tags, string[] permissions, uint16 height, uint16 width, bool withIntellectualProperty, uint8 termIntellectualProperty) _nft, address[] _recipients, uint8[] _percent, uint8 _totalPercent) external returns (uint256)"
]

// Replace YOUR_CONTRACT_ADDRESS_HERE with your actual contract address
const contractAddress: string = process.env.ARTIST_NFT_ADDRESS
const rpcProviderUrl : string = process.env.RPC_PROVIDER_URL
const addressRecipient1: string = '0x7EFFFeCe8Bfd39CD1B1244CE12619c721D72F7d3'
const addressRecipient2: string = '0x1aC45Ef40e5A9c02b0D834C3ba343237B6D9eFC1'

async function mintNFT() {

    // Use a JSON RPC provider
    const provider = new ethers.providers.JsonRpcProvider(rpcProviderUrl)

    // Create a wallet from a private key
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    // Create the contract instance with the wallet as the signer
    const artistContract = new ethers.Contract(contractAddress, contractABI, wallet)


    // Define your NFT data
    const tokenURI: string = "IRA_NFT_URI"
    const nft: NFT = {
        name: "Leloluce NFT",
        description: "Leloluce NFT Description",
        certificateAuthenticity: "Leloluce Cert Auth URL",
        tags: ["Tag1LELO", "Tag2Tag1LELO"],
        permissions: ["Permission1Tag1LELO", "Permission2Tag1LELO"],
        height: 100,
        width: 100,
        withIntellectualProperty: true,
        termIntellectualProperty: 12,
    }
    const recipients: string[] = [addressRecipient1, addressRecipient2]
    const percent: number[] = [50, 50]
    const totalPercent: number = 80

    try {
        const tx = await artistContract.mintNFT(tokenURI, nft, recipients, percent, totalPercent, {
            gasLimit: ethers.utils.hexlify(1000000), // Example gas limit; adjust based on your needs
        })
        
        console.log("Transaction Hash:", tx.hash)

        const receipt = await tx.wait()
        console.log("Transaction was mined in block:", receipt.blockNumber)
        console.log("New Item ID:", receipt.events?.[0]?.args?.newItemId_.toString())
    } catch (error) {
        console.error("Error minting NFT:", error)
    }
}

mintNFT()
