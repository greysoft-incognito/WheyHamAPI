import { JsonResource, Resource } from '@core/JsonApiResource';

import NftResource from './NftResource';

/**
 * NftCollection
 */
export default class extends JsonResource {
    /**
     * Build the response object
     * @returns this
     */
    data () {
        const data = Array.isArray(this.resource) ? this.resource : this.resource.data

        return {
            data: data.map(
                (e: Resource) => new NftResource(this.event, e).data()
            )
        }
    }
}
