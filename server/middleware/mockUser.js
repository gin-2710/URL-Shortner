export default function mockUser(req, res, next) {
  req.user = {
    id: "devUser123",
    name: "Dev User",
    email: "devuser@example.com",
  };
  next();
}
