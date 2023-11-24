import { z } from "zod";

const optionalStringToNumber = z
  .string()
  .transform(val => Number(val))
  .optional();

const optionalStringToDate = z
  .string()
  .transform(val => new Date(val))
  .optional();

const optionalStringToBoolean = z
  .enum(["true", "false"])
  .transform(value => (value === "true" ? true : false))
  .optional();

const optionalPageAndLimit = z.object({
  page: optionalStringToNumber,
  limit: optionalStringToNumber
});

const optionalSortByAndOrderBy = z.object({
  sortBy: z.string().optional(),
  orderBy: z.string().optional()
});

export {
  optionalStringToNumber,
  optionalStringToDate,
  optionalStringToBoolean,
  optionalPageAndLimit,
  optionalSortByAndOrderBy
};
