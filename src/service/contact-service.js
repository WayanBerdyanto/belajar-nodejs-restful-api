import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createConctactValidation, getContactValidation, updateConctactValidation } from "../validation/contact-validation.js";
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
    },
  });
};

const getContact = async (user, contactId) => {
  contactId = validation(getContactValidation, contactId);
  const contact = await prismaClient.contact.findUnique({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact not found");
  }

  return contact;
};

const updateContact = async (user, request) => {
  const contact = validation(updateConctactValidation, request);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contact.id,
    },
  });

  if(totalContactInDatabase !== 1) {
    throw new ResponseError(404, "Contact is not found");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: contact,
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
}

const removeContact = async (user, contactId) => {
  contactId = validation(getContactValidation, contactId);

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if(totalContactInDatabase !== 1){
    throw new ResponseError(404, "Contact is not found");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
}

export default {
  createContact,
  getContact,
  updateContact,
  removeContact
};
