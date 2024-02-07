# Description

This TypeScript program aims at calling some functions of NFT Smart contracts of InRealArt

# Prerequisite

## Deps

Install dependencies

```
npm install
```

# Env variables 

3 env variables are required : 

 - PRIVATE_KEY : the private of the account that deploy the smart contract 
 - ARTIST_NFT_ADDRESS : the address of the Artist Smart Contract
 - RPC_PROVIDER_URL : The RPC provider of your choice (Ex : Alchemy or Infura)


# Run

To mint a NFT, run the following command

```
npm run mint
```

This will mint a NFT according to parameters in the _mint.js_ function.<br>
If you want to mint another NFT with different parameters, modify the parameters










