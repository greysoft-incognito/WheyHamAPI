import BaseController from '@controllers/BaseController';
import { HttpContext } from 'clear-router/types/h3'
import NftCollection from '../resources/NftCollection';
import NftResource from '../resources/NftResource';
import Resource from '@core/JsonApiResource';
import { prisma } from 'src/core/DB';

/**
 * UserController
 */
export default class extends BaseController {
    /**
     * Get all resources
     * 
     * @param req 
     * @param res 
     */
    index = async (evt: HttpContext) => {
        const [nfts, meta] = await prisma.nft.paginate().withPages({ limit: 30, includePageCount: true });

        return await new NftCollection(evt, { data: nfts, pagination: meta }).json().status(200).additional({
            status: 'success',
            message: 'OK',
            code: 200,
        });
    }

    /**
     * Get a specific resource
     * 
     * @param req 
     * @param res 
     */
    show = async (evt: HttpContext) => {
        const data = await prisma.nft.findUnique({
            where: {
                id: evt.context.params!.id
            }
        });

        return new NftResource(evt, data).json().status(200).additional({
            status: 'success',
            message: 'OK',
            code: 200,
        });
    }

    /**
     * Create a resource
     * 
     * @param req 
     * @param res 
     */
    create = async (evt: HttpContext) => {
        return Resource(evt, { data: {} }).json().status(201).additional({
            status: 'success',
            message: 'New User created successfully',
            code: 201,
        });
    }

    /**
     * Update a specific resource
     * 
     * @param req 
     * @param res 
     */
    update = async (evt: HttpContext) => {
        return Resource(evt, { data: {} }).json().status(202).additional({
            status: 'success',
            message: 'User updated successfully',
            code: 202,
        });
    }

    /**
     * Delete a specific resource
     * 
     * @param req 
     * @param res 
     */
    destroy = async (evt: HttpContext) => {
        return Resource(evt, { data: {} }).json().status(202).additional({
            status: 'success',
            message: 'User deleted successfully',
            code: 202,
        });
    }
}
