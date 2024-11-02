import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validation } from "../validation/validation.js";
import { createAddressValidation } from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";

const createAddress = async (user, contactId, request) => {

    contactId = validation(getContactValidation, contactId);

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId,
        },
    });

    if(totalContactInDatabase !== 1) {
        throw new ResponseError(404, "Contact is not found");
    }
    
    const address = validation(createAddressValidation, request);
    
    address.contact_id = contactId; 

    return prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    });
}


export default {
    createAddress,
}