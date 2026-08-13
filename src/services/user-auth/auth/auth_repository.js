import { signup } from "./signup";
import { signin } from "./signin";
import { changePassword } from "./change_password";
import { updateUserData } from "./update_user_data";
import { forgetPassword } from "./forget_password";
import { verifyResetCode } from "./verify_reset_code";
import { resetPassword } from "./reset_password";

export const AUTH_REPOSITORY = {
  signup,
  signin,
  changePassword,
  updateUserData,
  forgetPassword,
  verifyResetCode,
  resetPassword,
};
