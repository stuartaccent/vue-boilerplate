// @ts-nocheck

import axios from "axios";

export interface IError {
  errors: string[];
  fieldErrors: any;
}

export const prepareErrors = (error) => {
  const resp: IError = {
    errors: ["Something went wrong."],
    fieldErrors: {},
  };
  if (axios.isAxiosError(error)) {
    if (
      error.response &&
      error.response.status === 422 &&
      error.response.data &&
      error.response.data.detail
    ) {
      // basic 422 validation errors
      error.response.data.detail.forEach((item: any) => {
        const lbl = item.loc[item.loc.length - 1];
        resp.fieldErrors[lbl] = item.msg;
      });
    } else if (
      error.response &&
      error.response.status === 400 &&
      error.response.data &&
      error.response.data.detail === "LOGIN_BAD_CREDENTIALS"
    ) {
      // invalid login
      resp.errors = ["Invalid email address or password."];
    } else if (
      error.response &&
      error.response.status === 400 &&
      error.response.data &&
      error.response.data.detail === "RESET_PASSWORD_BAD_TOKEN"
    ) {
      // bad password reset token
      resp.errors = [
        "The password reset link is no longer valid. Please request another forgotten password email.",
      ];
    }
  }
  return resp;
};
