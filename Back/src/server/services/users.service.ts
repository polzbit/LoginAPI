import { UserCollection } from '../../data/collections';
import errors from '../../utils/constants/errors';
import { compare, hashPassword } from '../../utils/crypto';
// import { NotFound } from '../../utils/errors';
import { generateJWT, parseJWT, verifyJWT } from '../../utils/jwt-helpers';
import { sendConfirmationMail, sendResetMail } from '../../utils/mailer';

export default class UserService {
  static async validateEmail(body: { token: string }) {
    try {
      const { token } = body;
      const decoded = verifyJWT(token);
      if (!decoded) {
        return { error: errors.invalid_token };
      }
      const { email } = parseJWT(token);
      if (!email) {
        return { error: errors.user_not_exists };
      }
      const user = UserCollection.update({ email }, { verified: true });
      if (!user) {
        // throw new NotFound(`Unable to find user with email: ${email}`);
        return { error: errors.user_not_exists };
      }
      return decoded;
    } catch (error) {
      console.log(error);
    }
  }

  static async forgotPassword(body: { email: string }) {
    try {
      const { email } = body;
      const user = UserCollection.get({ email });
      if (!user) {
        // throw new NotFound(`Unable to find user with email: ${email}`);
        return { error: errors.user_not_exists };
      }
      const token = generateJWT({ email });
      const link = `${process.env.ORIGIN}:${process.env.CLIENT_PORT}/reset-password/${token}`;
      console.log(`[*] Reset password link: ${link}`);
      sendResetMail(email, link);
    } catch (error) {
      console.log(error);
    }
  }

  static async resetPassword(body: {
    password: string;
    passwordRepeat: string;
    token: string;
  }) {
    const { token, password, passwordRepeat } = body;
    const decoded = verifyJWT(token);
    if (!decoded) {
      return { error: errors.invalid_token };
    }
    const { email } = parseJWT(token);
    const user = await UserCollection.get({ email });

    if (!user) {
      // throw new NotFound(`Unable to find user with email: ${email}`);
      return { error: errors.user_not_exists };
    }
    if (password !== passwordRepeat) {
      // throw new Unauthorized(`passwords not the same`);
      return { error: errors.passwords_mismatch };
    }

    const { salt, hashedPassword } = hashPassword(password);
    await UserCollection.update({ id: user.id }, { hashedPassword, salt });

    return {};
  }

  static async register(body: {
    email: string;
    password: string;
    passwordRepeat: string;
  }) {
    const { email, password, passwordRepeat } = body;
    const user = await UserCollection.get({ email });
    if (user) {
      // throw new Unauthorized(`User with email: ${email} already exists`);
      console.log(`[!] Error: ${errors.user_exists}`);
      return { error: errors.user_exists };
    }

    if (password !== passwordRepeat) {
      // throw new Unauthorized(`passwords not the same`);
      console.log(`[!] Error: ${errors.passwords_mismatch}`);
      return { error: errors.passwords_mismatch };
    }
    const { salt, hashedPassword } = hashPassword(password);
    await UserCollection.create({ email, hashedPassword, salt });
    const token = generateJWT({ email });
    const link = `${process.env.ORIGIN}:${process.env.CLIENT_PORT}/verified/${token}`;
    console.log(`[*] email confirmation link: ${link}`);
    sendConfirmationMail(email, link);
    return {};
  }

  static async login(body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await UserCollection.get({ email });
    if (!user) {
      // throw new Unauthorized(`User with email: ${email} not exists`);
      return { error: errors.failed_login };
    }
    const { salt, hashedPassword, verified } = user;
    if (!verified) {
      // throw new Unauthorized(`User not verified`);
      return { error: errors.user_not_verified };
    }
    if (!compare(password, { hashedValue: hashedPassword, salt })) {
      // throw new Unauthorized(`password incorrect`);
      return { error: errors.failed_login };
    }
    // set Cookie
    const token = generateJWT({ email });
    return { token };
  }
}
