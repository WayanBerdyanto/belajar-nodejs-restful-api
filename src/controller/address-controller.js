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


export default {
    createAddress,
}