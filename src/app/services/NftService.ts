import { OpenSeaNFT } from "src/types/opensea";
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
        limit = 100,
        debug,
        walk
    }: { slug: string, limit?: number, debug?: boolean, walk?: boolean }) {
        return await this.sendFetchNfts({ slug, limit, debug, walk });
    }

    private static async sendFetchNfts ({
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

                const response = await fetch(`https://api.opensea.io/api/v2/collection/${slug}/nfts${query}`, options);
                const data = await response.json();
                const fetchedNfts = data.nfts || [];
                nfts = nfts.concat(fetchedNfts);

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
}