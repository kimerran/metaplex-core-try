import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCore, createV1 } from '@metaplex-foundation/mpl-core'

import { createSignerFromKeypair, generateSigner, keypairIdentity } from '@metaplex-foundation/umi'

import privKey from './key.json'
import { publicKey } from '@metaplex-foundation/umi/dist/types/serializers'

// Use the RPC endpoint of your choice.
const rpcUrl = 'https://api.devnet.solana.com'
const umi = createUmi(rpcUrl).use(mplCore())

const myKeypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(privKey));
const myKeypairSigner = createSignerFromKeypair(umi, myKeypair);
umi.use(keypairIdentity(myKeypairSigner));

const asset = generateSigner(umi)

import collectionPrivKey from './key-collection.json'
const collectionPrivKeyKeypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(collectionPrivKey));

async function main() {
    const result = await createV1(umi, {
        collection: collectionPrivKeyKeypair.publicKey,
        asset: asset,
        name: 'My NFT from Collection 1',
        uri: 'https://example.com/my-nft',
    }).sendAndConfirm(umi)

    console.log(result);
}

main()