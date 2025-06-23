import Contact from "../db/Contacts.js";

export const listContacts = () => Contact.findAll();

export const getContactById = (id) => Contact.findByPk(id);

export const addContact = (payload) => Contact.create(payload);

export const updateContact = async (contactId, data) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.update(data);
  return contact;
};

export const removeContact = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.destroy();
  return contact;
};

export const updateStatusContact = async (contactId, data) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;

  await contact.update(data);
  return contact;
};
