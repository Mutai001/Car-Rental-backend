import { Hono } from 'hono';
import {
  getAllLocationsController,
  getLocationByIdController,
  createLocationController,
  updateLocationController,
  deleteLocationController,
} from './Location.controller';
import { adminRoleAuth,userRoleAuth,bothRoleAuth } from '../middlewares/auth.middlewares';

export const locationRouter = new Hono();

locationRouter
  .get("locations", bothRoleAuth, getAllLocationsController)
  .get("locations/:id", bothRoleAuth, getLocationByIdController)
  .post("locations", adminRoleAuth,createLocationController)
  .put("locations/:id",adminRoleAuth, updateLocationController)
  .delete("locations/:id", adminRoleAuth,deleteLocationController);

export default locationRouter;
