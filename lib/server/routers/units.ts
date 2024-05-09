import { getUnitById, getUnits } from "@/lib/api/units/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  unitIdSchema,
  insertUnitParams,
  updateUnitParams,
} from "@/lib/db/schema/units";
import { createUnit, deleteUnit, updateUnit } from "@/lib/api/units/mutations";

export const unitsRouter = router({
  getUnits: publicProcedure.query(async () => {
    return getUnits();
  }),
  getUnitById: publicProcedure.input(unitIdSchema).query(async ({ input }) => {
    return getUnitById(input.id);
  }),
  createUnit: publicProcedure
    .input(insertUnitParams)
    .mutation(async ({ input }) => {
      return createUnit(input);
    }),
  updateUnit: publicProcedure
    .input(updateUnitParams)
    .mutation(async ({ input }) => {
      return updateUnit(input.id, input);
    }),
  deleteUnit: publicProcedure
    .input(unitIdSchema)
    .mutation(async ({ input }) => {
      return deleteUnit(input.id);
    }),
});
