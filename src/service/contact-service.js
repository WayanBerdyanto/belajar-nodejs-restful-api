import { prismaClient } from "../application/database.js";
import { createConctactValidation } from "../validation/contact-validation.js";
import { validation } from "../validation/validation.js";

const createContact = async (user, request) => {

    const contact = validation(createConctactValidation, request);
    contact.username = user.username;

    return prismaClient.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
        }
    });
};

export default{
    createContact
}