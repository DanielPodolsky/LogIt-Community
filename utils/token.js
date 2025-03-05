import jwt from "jsonwebtoken";

// Generate a token for the user
export const generateToken = ({ id, email, isAdmin, username }) => {
  return jwt.sign({ id, email, isAdmin, username }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

export const verifyToken = (req, res, next) => {
  if (req.headers.cookie) {
    // If the human has a cookie (Human can be either logged in or logged out, hence the check)
    const token = req.headers.cookie.split("=")[1]; // Extract the token from the cookie (It will give us an array with 2 elements, we want the second one that is inside [1]). (access_token=tokenitself)
    if (!token) return res.status(401).json("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // After verifcation is complete we can get the users information
    req.user = decoded; // Add / Modify the user field in the request object so the next() function will have acccess to the user's details.
    return next(); // After verification is complete we can move to the third CRUD parameter because of next(). (Next is "confirming")
  }
  return res.status(401).json("Unauthorized"); // If the human doesn't have a cookie, then they are unauthorized.
};

// Another middleware
export const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) return next();
  res.status(403).json("Access Denied");
};
