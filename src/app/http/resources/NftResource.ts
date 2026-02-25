import { Resource } from "resora";
import { ethers } from "ethers"
/**
 * NftResource
 */
export default class extends Resource {
    /**
     * Build the response object
     * @returns this
     */
    data () {
        const metadata = JSON.parse(this.metadata);

        return {
            id: this.id,
            name: this.name,
            price: this.nftOrder ? ethers.formatEther(BigInt(this.nftOrder.price)) : 0,
            status: this.nftOrder ? this.nftOrder.status : 'UNKNOWN',
            contract: this.contract,
            imageUrl: this.imageUrl,
            orderHash: this.nftOrder ? this.nftOrder.orderHash : null,
            identifier: this.identifier,
            openseaUrl: metadata.opensea_url || null,
            description: this.description,
            remainingQuantity: this.nftOrder ? this.nftOrder.remainingQuantity : 0,
            metadata
        };
    }
}
