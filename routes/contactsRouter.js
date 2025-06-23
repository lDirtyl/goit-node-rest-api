import express from "express";
import contactsController from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import { updateFavoriteSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAllContactsController);

contactsRouter.get("/:id", contactsController.getOneContactController);

contactsRouter.delete("/:id", contactsController.deleteContactController);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsController.createContactController
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  contactsController.updateContactController
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavoriteSchema),
  contactsController.updateStatusContactController
);

export default contactsRouter;
