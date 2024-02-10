import { Request, Response } from "express";
import { response } from "../utils";
import Joi from "joi";
import { clientId, clientSecret } from "../constants";
import axios from "axios";

class AuthController {
  static async login(req: Request, res: Response) {
    const gitlabAuthUrl = "https://gitlab.com/oauth/authorize";
    const redirectUrl = "http://localhost:8080/api/auth/callback";

    const authUrl = `${gitlabAuthUrl}??client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code`;

    res.redirect(authUrl);
  }

  static async loginCallback(req: Request, res: Response) {
    const requestSchema = Joi.object({
      code: Joi.string().required(),
    });

    const { error, value } = requestSchema.validate(req.query);
    if (error) return response(res, 400, error.details[0].message);

    const { code } = value;

    const tokenUrl = "https://gitlab.com/oauth/token";
    const redirectUrl = "http://localhost:3000/";
    const requestUrl = `${tokenUrl}?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUrl}`;

    try {
      const gitlabAuthResponse = await axios.post(requestUrl);

      console.log(gitlabAuthResponse);

      return response(res, 200, "Login successful", gitlabAuthResponse.data);
    } catch (error: any) {
      console.log(error);
      return response(res, 400, "A fatal error occured. Please try again");
    }
  }
}

export default AuthController;
