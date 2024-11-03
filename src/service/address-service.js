import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validation } from "../validation/validation.js";
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { logger } from "../application/logging.js";

const checkContactMustExist = async (user, contactId) => {
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

    return contactId;
}

const createAddress = async (user, contactId, request) => {

    contactId = await checkContactMustExist(user, contactId);
    
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

const getAddress = async (user, contactId, addressId) => {

    contactId = await checkContactMustExist(user, contactId);

    addressId = validation(getAddressValidation, addressId);

    const address = await prismaClient.address.findFirst({
        where: {
            contact_id: contactId,
            id: addressId,
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    });

    if(!address) {
        throw new ResponseError(404, "Address is not found");
    }

    return address;

}

const updateAddress = async (user, contactId, request) => {
    contactId = await checkContactMustExist(user, contactId);

    const address = validation(updateAddressValidation, request);

    const totalAddressInDatabase = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: address.id,
        },
    });


    if(totalAddressInDatabase !== 1) {
        throw new ResponseError(404, "Address is not found");
    }

    logger.info("Data Address Update Request Received", address);
    return prismaClient.address.update({
        where: {
            id: address.id
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code,
        },
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
    getAddress,
    updateAddress
}