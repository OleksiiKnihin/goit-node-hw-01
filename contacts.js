const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  const contactsString = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsString);
  return contacts;
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === id);
  return contactById ? contactById : "No such contact";
};

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);

  const deleteContact = allContacts[index];
  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  }
  console.log(deleteContact ? deleteContact : "No such contact");
  return deleteContact ? deleteContact : null;
};

const addContact = async (name, email, phone) => {
  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  console.log(newContact);
};

module.exports = { listContacts, getContactById, removeContact, addContact };
