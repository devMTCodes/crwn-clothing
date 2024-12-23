import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import { AuthenticationContainner } from "./authentication.styles";

const Authentication = () => {
  return (
    <AuthenticationContainner>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainner>
  );
};

export default Authentication;
