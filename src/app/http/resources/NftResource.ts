import { JsonResource } from '@core/JsonApiResource';

/**
 * NftResource
 */
export default class extends JsonResource {
    /**
     * Build the response object
     * @returns this
     */
    data () {
        return {
            id: this.id,
            name: this.name,
            identifier: this.identifier,
            contract: this.contract,
            imageUrl: this.imageUrl,
            description: this.description,
            openseaUrl: JSON.parse(this.metadata).opensea_url || null,
        };
    }
}
