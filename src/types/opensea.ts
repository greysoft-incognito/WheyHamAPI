export interface OpenSeaNFT {
    identifier: string;
    collection: string;
    contract: string;
    token_standard: 'erc1155' | 'erc721';
    name: string;
    description: string;
    image_url: string;
    display_image_url: string;
    display_animation_url: string;
    metadata_url: string;
    opensea_url: string;
    updated_at: string;
    is_disabled: boolean;
    is_nsfw: boolean;
    original_image_url: string;
    original_animation_url: string | null;
}

export interface OpenSeaOrder {
    protocol_address: string;
    current_price: string;
    order_hash: string;
    listing_time: number;
    expiration_time: number | null;
    created_date: string;
    closing_date: string | null;
    side: string;
    order_type: string;
    remaining_quantity: string;
    maker: {
        address: string;
        profile_img_url: string | null;
        config: string | null;
    }
    status: 'ACTIVE' | 'INACTIVE' | 'FULFILLED' | 'EXPIRED' | 'CANCELLED';
    maker_asset_bundle: { assets: OpenSeaAsset[] }
    taker_asset_bundle: { assets: OpenSeaAsset[] }
}

export interface OpenSeaAsset {
    id: string;
    token_id: string;
    num_sales: number | null;
    background_color: string | null;
    image_url: string | null;
    image_preview_url: string | null;
    image_thumbnail_url: string | null;
    image_original_url: string | null;
    animation_url: string | null;
    animation_original_url: string | null;
    name: string;
    description: string | null;
    external_link: string | null;
    asset_contract: {
        address: string;
        chain_identifier: string;
        schema_name: string;
        asset_contract_type: string;
    },
    permalink: string | null,
    collection: string | null,
    decimals: number,
    token_metadata: string | null,
    is_nsfw: boolean | null,
    owner: string | null
}