import BaseController from '@controllers/BaseController';
import { HttpContext } from 'clear-router/types/h3'
import NftCollection from '../resources/NftCollection';
import NftResource from '../resources/NftResource';
import { prisma } from 'src/core/DB';

/**
 * NftController
 */
export default class extends BaseController {
    /**
     * Get all resources
     * 
     * @param req 
     * @param res 
     */
    index = async ({ res }: HttpContext) => {
        const [nfts, meta] = await prisma.nft
            .paginate({ include: { nftOrder: true } })
            .withPages({ limit: 30, includePageCount: true });

        // @ts-ignore
        return await new NftCollection({ data: nfts, pagination: meta }, res).additional({
            status: 'success',
            message: 'OK',
            code: 200,
        }).response().setStatusCode(200);
    }

    /**
     * Get a specific resource
     * 
     * @param req 
     * @param res 
     */
    show = async ({ res, context }: HttpContext) => {
        const data = await prisma.nft.findUnique({
            where: {
                id: context.params!.id
            }
        }) ?? {};

        // @ts-ignore
        return new NftResource(data, res).additional({
            status: 'success',
            message: 'OK',
            code: 200,
        }).response().setStatusCode(200);
    }

    /**
     * Create a resource
     * 
     * @param req 
     * @param res 
     */
    create = async ({ res }: HttpContext) => {
        // @ts-ignore
        return new NftResource({ data: {} }, res).additional({
            status: 'success',
            message: 'New NFT created successfully',
            code: 201,
        }).response().setStatusCode(201);
    }

    /**
     * Update a specific resource
     * 
     * @param req 
     * @param res 
     */
    update = async ({ res }: HttpContext) => {
        // @ts-ignore
        return new NftResource({ data: {} }, res).json().status(202).additional({
            status: 'success',
            message: 'NFT updated successfully',
            code: 202,
        });
    }

    /**
     * Delete a specific resource
     * 
     * @param req 
     * @param res 
     */
    destroy = async ({ res }: HttpContext) => {
        // @ts-ignore
        return new NftResource({ data: {} }, res).additional({
            status: 'success',
            message: 'NFT deleted successfully',
            code: 202,
        }).response().setStatusCode(202);
    }
}
