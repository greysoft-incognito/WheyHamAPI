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

        const create = await prisma.nft.createMany({
            data: nfts.map(nft => ({
                name: nft.name,
                contract: nft.contract,
                identifier: nft.identifier,
                description: nft.description,
                imageUrl: nft.image_url,
                metadata: JSON.stringify(nft),
            })),
            skipDuplicates: true,
        });

        this.success(`Synchronized ${create.count} NFTs`);
    }
}