// api/submitChoice.js
import { createClient } from '@supabase/supabase-js';

// Set up Supabase client with your project URL and API key
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { choice } = req.body;

    try {
      // Insert the choice into the Supabase database
      const { data, error } = await supabase
        .from('choices')
        .insert([{ choice }]);

      if (error) {
        throw error;
      }

      // Respond with success message
      res.status(200).json({ message: `Choice received: ${choice}`, data });
    } catch (error) {
      res.status(500).json({ message: 'Failed to save choice', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
