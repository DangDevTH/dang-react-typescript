import { SnackMessage } from "../interfaces/snack-message.interface";

const ERROR_FAILED_TO_FETCH_MESSAGE = "Failed to fetch";

const ERROR_SERVER_MESSAGE = "An unexpected error occurred. Please try again later.";

const UNKNOWN_ERROR_MESSAGE =
  "An unknown error has occured. Please try again later.";

const UNKNOWN_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: UNKNOWN_ERROR_MESSAGE,
  type: "error",
};

export { UNKNOWN_ERROR_MESSAGE, UNKNOWN_ERROR_SNACK_MESSAGE, ERROR_FAILED_TO_FETCH_MESSAGE, ERROR_SERVER_MESSAGE };