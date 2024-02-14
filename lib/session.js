import cookie from "cookie";
import jwt from "jsonwebtoken";

const secret = "WD%^)(satardavoodiirannobat$#123";

export function setSession(res, session) {
  const token = jwt.sign(session, secret);

  const cookieValue = cookie.serialize("mngSession", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 7, // 1 week
    sameSite: "strict",
    path: "/",
  });

  res.setHeader("Set-Cookie", cookieValue);
}

export function getSession(req) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.mngSession;

  if (!token) return null;

  try {
    let UserData = jwt.verify(token, secret);

    return {
      UserData,
    };
  } catch (err) {
    return null;
  }
}

export function destroySession(res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("mngSession", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );
}
