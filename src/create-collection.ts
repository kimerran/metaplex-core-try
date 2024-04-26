import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCore, createV1 } from '@metaplex-foundation/mpl-core'

import { base58, createSignerFromKeypair, generateSigner, keypairIdentity } from '@metaplex-foundation/umi'

import privKey from './key.json'
import { createCollectionV1 } from '@metaplex-foundation/mpl-core'

// Use the RPC endpoint of your choice.
const rpcUrl = 'https://api.devnet.solana.com'
const umi = createUmi(rpcUrl).use(mplCore())

const myKeypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(privKey));
const myKeypairSigner = createSignerFromKeypair(umi, myKeypair);
umi.use(keypairIdentity(myKeypairSigner));

const collection = generateSigner(umi)

console.log("collection pubkey", collection.publicKey);
console.log("collection secret", collection.secretKey);

async function main() {
   const result = await createCollectionV1(umi, {
        collection: collection,
        name: 'My Collection',
        uri: 'https://example.com/my-nft.json',
      }).sendAndConfirm(umi)
      console.log('signature', result.signature);
}

// collection output: 4qHNh8rrkBPYwWnbV35pU9mjMbT7ricYyXRdz5ZBJceM
main()

// const result = createV1(umi, {
//     asset: asset,
//     name: 'My Nft',
//     uri: 'https://example.com/my-nft',
// }).sendAndConfirm(umi)

// console.log(result);

