import { Request, Response, Router } from "express";
import { createCategory } from "./create-category.service";
import { checkRoles } from "src/shared/middlewares/checkRoles";
import zod from "zod";
import { validateBody } from "src/shared/validate-body";
import { validateFiles } from "src/shared/validate-files";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { getCategories } from "./get-category.service";
import { deleteCategory } from "./delete-category.service";
import { updateOneCategory } from "./update-category.service";
import { getCategoryDoctors } from "./get-category-doctors.service";

const categoryRouter: Router = Router();

const createSchema = zod.object({
  name: zod.string(),
});

const updateSchema = zod.object({
  name: zod.string().optional(),
});

categoryRouter.post(
  "/create-category",
  // checkRoles(["admin"]),
  validateFiles({
    image: {
      required: true,
      mimeTypes: ["image/png", "image/jpg", "image/jpeg"],
    },
  }),
  validateBody(createSchema),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const category = await createCategory({
      name: req.body.name,
      description: req.body.description,
      link: req.body.link,
      image: req.files["image"][0],
    });

    res.status(StatusCodes.CREATED).json({ category, message: "Successful" });
  }),
);


categoryRouter.get(
  "/get-categories",
  expressAsyncHandler(async (_: Request, res: Response) => {
    const categories = await getCategories();
    res.status(StatusCodes.OK).json({ categories, message: "Successful" });
  }),
);

categoryRouter.get(
  "/get-category-doctors/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const doctors = await getCategoryDoctors(req.params.id);
    res.status(StatusCodes.OK).json({ doctors, message: "Successful" });
  }),
);

categoryRouter.delete(
  "/delete-category/:id",
  checkRoles(["admin"]),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const category = await deleteCategory({ id: req.params.id });

    res.status(StatusCodes.OK).json({ category, message: "Successful" });
  }),
);

categoryRouter.patch(
  "/update-category/:id",
  checkRoles(["admin"]),
  validateFiles({
    image: {
      required: false,
      mimeTypes: ["image/png", "image/jpg", "image/jpeg"],
    },
  }),
  validateBody(updateSchema),
  expressAsyncHandler(async (req: Request, res: Response) => {
    const category = await updateOneCategory({
      name: req.body.name,
      image: req.files?.["image"]?.[0],
      id: req.params.id,
    });
    res.status(StatusCodes.OK).json({ category, message: "Successful" });
  }),
);
export default categoryRouter;
