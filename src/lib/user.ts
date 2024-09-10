import { auth } from "./auth";
import db from "./db";

export const currentUser = async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  const user = await db.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};
