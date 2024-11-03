import { logger } from "../application/logging.js";
import addressService from "../service/address-service.js";


const createAddress = async (req, res, next) => {
    try {
        const user = req.user;

        const request = req.body;
        
        const contactId = req.params.contactId;

        const result = await addressService.createAddress(user, contactId, request);

        res.status(201).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

const getAddress = async (req, res, next) => {
    try {
        const user = req.user;

        const contactId = req.params.contactId;
        const addressId = req.params.addressId;

        const result = await addressService.getAddress(user, contactId, addressId);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
}



const updateAddress = async (req, res, next) => {
    try {
        const user = req.user;
        
        const contactId = req.params.contactId;
        
        const addressId = req.params.addressId
        
        const request = req.body;

        request.id = addressId;

        const result = await addressService.updateAddress(user, contactId, request);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        logger.info(`Error updating address: ${e.message}`);
        next(e);
    }
}
export default {
    createAddress,
    getAddress,
    updateAddress
}