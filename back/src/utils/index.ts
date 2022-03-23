import { ValidationError } from "class-validator";

export const validationErrorsToMessages = (errors: ValidationError[]) =>
  errors.reduce(
    (messages: string[], error) =>
      messages.concat(Object.values(error.constraints)),
    []
  );
