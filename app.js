require('dotenv').config({ path: './env/.env' }); 

const fetch = require("node-fetch");

const cloudflareVideos = async () => {
  console.log("Start");

  try {
    const accountId = process.env.CF_STREAM_ACCOUNTID;
    const token = process.env.CF_STREAM_TOKEN;

    if (!accountId || !token) {
      throw new Error("CF_STREAM_ACCOUNTID or CF_STREAM_TOKEN is not defined");
    }

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Tus-Resumable": "1.0.0",
    };

    const res = await fetch(endpoint, {
      method: "GET",
      headers,
    });

    const data = await res.json();

    if (data.result && Array.isArray(data.result)) {
      for (const video of data.result) {
        const contentId = video.uid;
        const deleteEndpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/${contentId}`;
        const deleteRes = await fetch(deleteEndpoint, {
          method: "DELETE",
          headers,
        });

        if (deleteRes.ok) {
          console.log(`Video deleted successfully. ContentID: ${contentId}`);
        } else {
          console.error(`Error deleting video. ContentID: ${contentId}`);
        }
      }
    }

  } catch (error) {
    console.error("Error retrieving videos:", error);
    throw error;
  }
};

(async () => {
  try {
    await cloudflareVideos();
  } catch (error) {
    console.error("Error during script execution:", error);
  }
})();
