import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message?: string;
  error?: string;
  details?: string; // Add this for debugging
};

// Email validation regex - comprehensive validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // console.log('1. Checking environment variables...');
    // Check if environment variables are set
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_JSON');
    }
    if (!process.env.SPREADSHEET_ID) {
      throw new Error('Missing SPREADSHEET_ID');
    }

    // console.log('2. Parsing service account JSON...');
    // Parse service account credentials
    const SERVICE_ACCOUNT_JSON = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

    // console.log('3. Getting email from request...');
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check email format using regex
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    // console.log('4. Initializing Google Auth...');
    // Initialize Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: SERVICE_ACCOUNT_JSON,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    //console.log('5. Creating sheets client...');
    const sheets = google.sheets({ version: 'v4', auth });

    //console.log('6. Attempting to append to spreadsheet...');

    // Format timestamp
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium',
      timeZone: 'UTC'
    });
    
    // Append to spreadsheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A:B',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          timestamp,
          email.toLowerCase()
        ]]
      },
    });

    // console.log('7. Success! Data appended to spreadsheet');
    res.status(200).json({ message: 'Successfully signed up' });

  } catch (error) {
    // Detailed error logging
    console.error('Signup Error Details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error: error
    });

    return res.status(500).json({ 
      error: 'Unable to process signup. Please try again later.',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}