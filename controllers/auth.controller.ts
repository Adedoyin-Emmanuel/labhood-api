import { Request, Response } from "express";
import { response } from "../utils";
import Joi from "joi";

class AuthController {
  static async login(req: Request, res: Response) {
    const gitlabAuthUrl = "https://gitlab.com/oauth/authorize";
    const clientId = process.env.GITLAB_CLIENT_ID as string;
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
  }
}

export default AuthController;
