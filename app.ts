import fetch from "node-fetch";

const cloudflareVideosDelete = async () => {
  try {
    const accountId: string | undefined = process.env.CF_STREAM_ACCOUNTID;
    const token: string | undefined = process.env.CF_STREAM_TOKEN;

    if (!accountId || !token) {
      throw new Error("Cloudflare account ID or token is not provided.");
    }

    const endpoint: string = `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream`;

    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Tus-Resumable": "1.0.0",
    };

    const res = await fetch(endpoint, {
      method: "GET",
      headers,
    });

    let data: { result?: any[] } = {};
    if (res.ok) {
      const rawData = await res.json();
      if (typeof rawData === 'object' && rawData !== null) {
        data = rawData;
      } else {
        throw new Error("Invalid response data format.");
      }
    } else {
      throw new Error("Failed to fetch data.");
    }

    if (data.result && Array.isArray(data.result)) {
      for (const video of data.result) {
        const contentId: string = video.uid;
        const deleteEndpoint: string = `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/${contentId}`;
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
    console.error("Error retrieving or deleting videos:", error);
    throw error;
  }
};

cloudflareVideosDelete();
