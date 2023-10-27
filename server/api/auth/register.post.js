import {h3} from "nuxt" 
import { sendError } from "h3";
import { createUser } from "../../db/users";
import { userTransformer } from "../../transformers/users";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, email, password, repeatPassword, name } = body;

  if (!username || !email || !password || !repeatPassword || !name) {
 /*    return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Invalid Params",
      }) */
 
    const error = createError({
      statusCode: 400,
      statusMessage: "Invalid Params",
    });

    return sendError(event, error);
  }

  if(password !== repeatPassword){
    const error = createError({
      statusCode:400, 
      statusMessage: 'Password do not match'
    })

    return sendError(event, error)
  }

  const userData = {
    username,
    email,
    password,
    name,
    profileImage : 'https://picsum.photos/200/200'
  }
 
  const user = await createUser(userData)

  return {
    body: userTransformer(user),
  };
});
