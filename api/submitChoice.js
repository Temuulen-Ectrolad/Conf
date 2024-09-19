// api/submitChoice.js

export default function handler(req, res) {
    if (req.method === 'POST') {
      const { choice } = req.body;
  
      // Here you could save the choice to a database
      // For example, use a JSON file, or connect to a database like Firebase, MongoDB, etc.
  
      res.status(200).json({ message: `Choice received: ${choice}` });
    } else {
      res.status(405).json({ message: 'Only POST requests are allowed' });
    }
  }
  