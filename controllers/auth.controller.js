
const registerUser = async (req, res) => {
  const body = req.body;
  //   if (body) {
  //     console.log(body.name);
  //     return res.send(body);
  //   }
  console.log(req);
  res.json({ requestBody: req.body });
};

module.exports = { registerUser };
