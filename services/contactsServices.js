import Contact from "../db/Contacts.js";

export async function listContacts({ owner }) {
  return await Contact.findAll({
    where: {
      owner,
    },
  });
}

export async function getContactById({ id, owner }) {
  const contact = await Contact.findOne({
    where: {
      id,
      owner,
    },
  });
  return contact || null;
}

export async function addContact(data) {
  return Contact.create({ ...data });
}

export async function updateContact({ id, owner }, data) {
  const contact = await getContactById({ id, owner });

  if (!contact) return null;

  return await contact.update(data, {
    returning: true,
  });
}

export async function removeContact({ id, owner }) {
  const contact = await getContactById({ id, owner });

  if (!contact) return null;

  await Contact.destroy({
    where: {
      id,
    },
  });
  return contact;
}

export const updateStatusContact = async ({ id, owner }, data) => {
  const contact = await getContactById({ id, owner });

  if (!contact) return null;

  return await contact.update(data, {
    returning: true,
  });
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
