//pop up delete auction

export default function deleteAuctionPU(condition) {
    return {type: 'POP_UP_DELETE_AUCTION', payload: condition};
}