import * as contactsServices from "../services/contactsServices.js";
import HttpError from "./../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContactsController = async (req, res) => {
  const result = await contactsServices.listContacts();
  res.json(result);
};

const getOneContactController = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.getContactById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.removeContact(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const createContactController = async (req, res) => {
  const result = await contactsServices.addContact(req.body);

  res.status(201).json(result);
};

const updateContactController = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.updateContact(id, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

export default {
  getAllContactsController: ctrlWrapper(getAllContactsController),
  getOneContactController: ctrlWrapper(getOneContactController),
  deleteContactController: ctrlWrapper(deleteContactController),
  createContactController: ctrlWrapper(createContactController),
  updateContactController: ctrlWrapper(updateContactController),
};
