export const handleDemo = (req, res) => {
  const response = {
    message: "Hello from the demo endpoint!",
  };
  res.json(response);
};
