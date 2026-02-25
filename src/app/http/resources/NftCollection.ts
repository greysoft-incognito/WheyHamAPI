import { Nft } from '@prisma/client';
import NftResource from './NftResource';
import { ResourceCollection } from 'resora';

/**
 * NftCollection
 */
export default class extends ResourceCollection<{ data: Nft[], pagination: any }> {
    collects = NftResource

    /**
     * Build the response object
     * @returns this
     */
    data () {
        return this.toArray()
    }
}
