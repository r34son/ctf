import { ValidationError } from "class-validator";

export const validationErrorsToMessages = (errors: ValidationError[]) =>
  errors.reduce(
    (messages: string[], error) =>
      messages.concat(Object.values(error.constraints)),
    []
  );

export const getSSEBody = <T extends unknown>(event?: string, data?: T) =>
  `${event ? `event: ${event}\n` : ""}data: ${JSON.stringify(data)}\n\n`;
