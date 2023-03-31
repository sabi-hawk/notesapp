const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Session = require("../models/session");
const User = require("../models/user");

async function signup(req, res) {
  try {
    // Get the email and password off req body
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create a user with the daTa
    await User.create({ email, password: hashedPassword });

    // respond
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

async function login(req, res) {
  try {
    // Get the email and password off rq body
    const { email, password } = req.body;

    // Find the user with requested email
    const user = await User.findOne({ email });
    if (!user) return res.sendStatus(401);

    // Compare sent in password with found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

    const session = await createSession(user);

    res.status(200).json({
      meta: {
        token: session.accessToken,
        expires: session.expiresAt,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

function logout(req, res) {
  try {
    res.cookie("Authorization", "", { expires: new Date() });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

function checkAuth(req, res) {
  try {
    res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400);
  }
}

async function authenticateRequest(req, res) {
  try {
    const token = req.header("auth-token");

    if (!token) {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: 401,
        error: "Unauthorized Access",
      };
    }
    const decode = jwt.verify(token, process.env.SECRET);
    const session = await Session.findOne({ _id: decode.sessionId });

    if (!session) {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: 401,
        error: "Session not found",
      };
    }

    if (session.expiresAt) {
      const now = new Date().getTime();
      const expiresAt = new Date(session.expiresAt).getTime();
      if (now > expiresAt) {
        // eslint-disable-next-line no-throw-literal
        throw {
          status: 401,
          error: "Session expired",
        };
      }
    }

    return decode;
  } catch (error) {
    console.log("Error | utils | mongo | authenticate");
    throw error;
  }
}

const createSession = async (user) => {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;

  const newSession = await new Session({
    userId: user._id,
    expiresAt: exp,
  }).save();

  const token = jwt.sign(
    { userId: user._id, sessionId: newSession._id },
    process.env.SECRET
  );

  newSession.accessToken = token;
  return newSession.save();
};
module.exports = {
  signup,
  login,
  logout,
  checkAuth,
  authenticateRequest,
};
