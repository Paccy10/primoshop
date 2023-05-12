import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@primoshop.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@primoshop.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@primoshop.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
