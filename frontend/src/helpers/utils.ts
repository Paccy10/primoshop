import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit/dist";

export const getError = (
  error: FetchBaseQueryError | SerializedError
): string | undefined => {
  if (error) {
    if ("status" in error) {
      let errMsg;
      if ("error" in error) {
        errMsg = error.error;
      } else {
        const obj = error.data;
        if (
          typeof obj === "object" &&
          obj !== null &&
          "message" in obj &&
          typeof obj.message === "string"
        ) {
          errMsg = obj.message;
        }
      }

      return errMsg;
    }
    return error.message;
  }
  return undefined;
};

export const addDecimals = (num: number): string => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
