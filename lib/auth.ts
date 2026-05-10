import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(user: {
  _id: string;
  email: string;
}) {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  return verifyToken(token);
}