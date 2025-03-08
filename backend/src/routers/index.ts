import { Router } from "express";
import { UserRouters } from "../models/user/user.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/api/auth",
    route: UserRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
