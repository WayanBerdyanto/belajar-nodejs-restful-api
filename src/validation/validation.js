import {ResponseError} from "../error/response-error.js";

const validation = (scema, request) => {
  const result = scema.validate(request, {
    abortEarly: false,
    allowUnknown: false
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
};

export {validation};