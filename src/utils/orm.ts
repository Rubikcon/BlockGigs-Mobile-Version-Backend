import { ValueTransformer } from "typeorm";

export const StringListTransformer: ValueTransformer = {
  to: (value: string[]): string => value.join(","),
  from: (value: string): string[] => value.split(","),
};
