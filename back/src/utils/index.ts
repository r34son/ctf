import { ValidationError } from "class-validator";

export const validationErrorsToMessages = (errors: ValidationError[]) =>
  errors.reduce(
    (error: Record<string, string>, validationError) => ({
      ...error,
      [validationError.property]: Object.values(validationError.constraints)[0],
    }),
    {}
  );

export const getSSEBody = <T extends unknown>(event?: string, data?: T) =>
  `${event ? `event: ${event}\n` : ""}data: ${JSON.stringify(data)}\n\n`;
