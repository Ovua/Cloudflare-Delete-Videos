# Cloudflare Stream Video Deletion Script

This simple Node.js script is designed to delete all the videos from a Cloudflare video stream. 
It removes videos associated with the specified Cloudflare account using the Cloudflare API.

## Features
- Retrieves the list of videos from the Cloudflare video stream associated with the account.
- Deletes each individual video from the Cloudflare platform.

## How to Install

1. Ensure you have Node.js installed on your system. You can download it from [here](https://nodejs.org/).

2. Download or clone the repository containing the script.

3. Navigate to the project directory through the terminal.

4. Run the command `npm install` to install the necessary dependencies.

5. Configure environment variables:
    - `CF_STREAM_ACCOUNTID`: The Cloudflare account ID.
    - `CF_STREAM_TOKEN`: The authorization token for Cloudflare API access.

    Set these environment variables in your system or use a tool like `dotenv` to manage them within a `.env` file.

6. Run the script with the command `node filename.js` to initiate the video deletion process.

Ensure you understand the consequences of deleting videos, as this action is irreversible. Use the script with caution and only when necessary.
