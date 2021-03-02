const handler = (req, res) => {
  const { method, body } = req;
  // Only allow POST requests
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  return res.status(200).json(body);
};

export default handler;
