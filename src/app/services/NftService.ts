import { OpenSeaNFT, OpenSeaOrder } from "src/types/opensea";

import { env } from "@core/utils/helpers";

export default class NftService {

    static options (append: Record<string, any> = {}) {
        return {
            headers: { accept: '*/*', 'x-api-key': env('OPENSEA_API_KEY') },
            ...append
        };
    }

    static async fetchNfts ({
        slug,
        next,
        limit = 100,
        debug,
        walk
    }: { slug: string, limit?: number, debug?: boolean, walk?: boolean, next?: string }) {
        const options = this.options({ method: 'GET' });
        let nfts: OpenSeaNFT[] = []
        let page = 1;

        try {
            do {
                if (debug) {
                    console.log(`Fetching NFTs for collection ${slug} - page ${page}`);
                }
                const query = next ? `?next=${next}&limit=${limit}` : `?limit=${limit}`;
                const address = process.env.OPENSEA_CONTRACT_ADDRESS;

                const url = address
                    ? `https://api.opensea.io/api/v2/chain/ethereum/contract/${address}/nfts${query}`
                    : `https://api.opensea.io/api/v2/collection/${slug}/nfts${query}`;

                const response = await fetch(url, options);
                const data = await response.json();
                nfts = nfts.concat(data.nfts || []);

                if (data.next == null) {
                    break; // No more pages to fetch
                }

                page++;
                next = data.next;
            } while (walk);

            return nfts.reverse(); // Reverse to maintain original order
        } catch (error) {
            if (debug) {
                console.error(`Failed to fetch NFTs for collection ${slug} on page ${page}`, error);
            }
            return nfts; // Return whatever has been fetched so far
        }
    }

    static async fetchNftOrders ({
        address,
        next,
        limit = 100,
        debug,
        walk,
        ids,
    }: { address?: string, limit?: number, debug?: boolean, walk?: boolean, next?: string, ids?: (number | string)[] }) {
        const options = this.options({ method: 'GET' });
        let orders: OpenSeaOrder[] = []
        let page = 1;
        if (!address) address = process.env.OPENSEA_CONTRACT_ADDRESS;

        try {
            do {
                if (debug) {
                    console.log(`Fetching NFT orders for address ${address} - page ${page}`);
                }
                const query = next ? `&next=${next}&limit=${limit}` : `&limit=${limit}`;
                const idsParam = ids ? ids.map(id => `&token_ids=${id}`).join('') : '';

                const url = `https://api.opensea.io/api/v2/orders/ethereum/seaport/listings?asset_contract_address=${address}${idsParam}${query}`;

                const response = await fetch(url, options);
                const data = await response.json();
                orders = orders.concat(data.orders || []);

                if (data.next == null) {
                    break; // No more pages to fetch
                }

                page++;
                next = data.next;
            } while (walk);

            return orders.reverse(); // Reverse to maintain original order
        } catch (error) {
            if (debug) {
                console.error(`Failed to fetch NFT orders for address ${address} on page ${page}`, error);
            }
            return orders; // Return whatever has been fetched so far
        }
    }
}