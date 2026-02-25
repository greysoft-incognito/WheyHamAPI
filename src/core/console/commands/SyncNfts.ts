import { NftOrderStatus, Prisma } from "@prisma/client";

import Application from "src/core/app";
import { Command } from "@h3ravel/musket";
import { prisma } from "src/core/DB";

export class SyncNfts extends Command<Application> {
    protected signature = `sync:nfts
        {slug=nok-arts : the slug of the collection to synchronize}
        {--d|debug : show detailed output of the synchronization process}
        {--l|limit=100 : the maximum number of NFTs to synchronize}
        {--w|walk : whether to walk through all pages of NFTs}
    `;

    protected description = 'Synchronize NFTs from opensea to the database';

    async handle () {
        const slug = this.argument('slug', 'nok-arts')
        const debug = this.option('debug', false);
        const walk = this.option('walk', false);
        const limit = parseInt(this.option('limit', '100'), 10);

        const nfts = await this.app.services.nft.fetchNfts({ slug, limit, debug, walk });

        this.info(`Fetched ${nfts.length} NFTs for collection ${slug}`);
        this.info(`Storing NFTs in the database...`);

        await prisma.nft.deleteMany()

        const create = await prisma.nft.createMany({
            data: nfts.map(nft => ({
                name: nft.name,
                contract: nft.contract,
                identifier: nft.identifier,
                description: nft.description,
                imageUrl: nft.image_url,
                metadata: JSON.stringify(nft),
            } as Prisma.NftCreateManyInput)),
            skipDuplicates: true,
        });

        this.success(`Synchronized ${create.count} NFTs`);

        const savedNfts = await prisma.nft.findMany();

        await prisma.nftOrder.deleteMany()

        for (const nft of savedNfts) {
            const [order] = await this.app.services.nft.fetchNftOrders({
                address: nft.contract, ids: [nft.identifier], debug, walk, limit: 1
            });

            await prisma.nftOrder.createMany({
                data: order ? [{
                    nftId: nft.id,
                    price: BigInt(order.current_price),
                    orderHash: order.order_hash,
                    status: order.status as NftOrderStatus,
                    listedAt: order.listing_time ? new Date(order.listing_time) : null,
                    expiresAt: order.expiration_time ? new Date(order.expiration_time) : null,
                    remainingQuantity: order.remaining_quantity ? parseInt(order.remaining_quantity, 10) : null,
                } as Prisma.NftOrderCreateManyInput] : [],
                skipDuplicates: true,
            });
        }

        const ordersCount = await prisma.nftOrder.count();

        this.success(`Synchronized ${ordersCount} NFT orders`);
    }
}