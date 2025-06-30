import * as contactsServices from "../services/contactsServices.js";
import HttpError from "./../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContactsController = async (req, res) => {
  const { id: owner } = req.user;
  const result = await contactsServices.listContacts({ owner });
  res.json(result);
};

const getOneContactController = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsServices.getContactById({ id, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const deleteContactController = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsServices.removeContact({ id, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const createContactController = async (req, res) => {
  const { id: owner } = req.user;
  const result = await contactsServices.addContact({ ...req.body, owner });

  res.status(201).json(result);
};

const updateContactController = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsServices.updateContact({ id, owner }, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateStatusContactController = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean") {
    throw HttpError(400, "Missing or invalid 'favorite' field");
  }

  const result = await contactsServices.updateStatusContact(
    { id, owner },
    { favorite }
  );

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
  updateStatusContactController: ctrlWrapper(updateStatusContactController),
};
