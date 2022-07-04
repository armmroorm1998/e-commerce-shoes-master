import { BaseService } from "./BaseService";
import { mainAPIOptions } from "../constant/config";

export class AuthService extends BaseService {
  fetchSignIn = ({ email, password }) => {
    return this.requester.post(
      "api/auth/signin",
      { email, password },
      mainAPIOptions()
    );
  };

  fetchSignUp = ({ date, firstname, lastname, email, password, roles }) => {
    return this.requester.post(
      "api/auth/signup",
      { date, firstname, lastname, email, password, roles },
      mainAPIOptions()
    );
  };
}
