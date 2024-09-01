"use server";
import db from "@/lib/db";

export const getVerficatonTokenByEmail = async (token: string) => {
  try {
    const verificationToken = await db.emailVerificationToken.findFirst({
      where: {
        token: token,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerficatonTokenByEmail(email);

  if (existingToken) {
    await db.emailVerificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.emailVerificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const verifiyEmailToken = async (token: string) => {
  const existingToken = await getVerficatonTokenByEmail(token);
  
  if (!existingToken) return null;

  const hashExpired = new Date(existingToken.expires) < new Date();
  if (hashExpired) return { error: "Token has expired" };

  const existingUser = await db.user.findFirst({
    where: {
      email: existingToken.email,
    },
  });
  if (!existingUser) return { error: "Email does not exist" };

  await db.user.update({
    where: {
      email: existingUser.email,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.emailVerificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Email verified successfully" };
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        token: token,
      },
    });
    return passwordResetToken;
  } catch (error) {
    return {
      error: "Token not found",
    };
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email: email,
      },
    });

    return passwordResetToken;
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
      await db.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const passwordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
