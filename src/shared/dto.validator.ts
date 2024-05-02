import { HttpErrorHandler } from '@shared';
import { BadRequestException, HttpStatus } from '@nestjs/common';

export const ExceptionFactory = (errors) => {
  const resErrors = {};
  let message = '';

  errors.forEach((error) => {
    resErrors[error.property] =
      error.constraints[Object.keys(error.constraints)[0]];
    message =
      message + ' ' + error.constraints[Object.keys(error.constraints)[0]];
  });

  return new BadRequestException(
    new HttpErrorHandler({
      statusCode: HttpStatus.BAD_REQUEST,
      error: resErrors,
      message,
    }),
  );
};
