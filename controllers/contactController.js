const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create new contacts
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log('The request body is', req.body);
  const { name, email, phone } = req.body;
  // Validate request body
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  const contact = await Contact.create({ name, email, phone, user_id: req.user.id });
  res.status(201).json(contact);
});

//@desc Get contacts
//@route POST /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contact);
});

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  // Validate request body
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Unauthorized to update this contact');
  }

  const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateContact);
});

//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  // Validate request body
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Unauthorized to update this contact');
  }
  await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json(contact);
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
