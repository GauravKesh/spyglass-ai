const API_URL =
  "https://api.anakin.io/v1";

export async function crawlWebsite(
  url: string
) {
  const submitResponse = await fetch(
    `${API_URL}/crawl`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        "X-API-Key":
          process.env.ANAKIN_API_KEY!,
      },

      body: JSON.stringify({
        url,
        maxPages: 5,
      }),
    }
  );

  const submitData =
    await submitResponse.json();

  const jobId = submitData.jobId;

  await new Promise((resolve) =>
    setTimeout(resolve, 5000)
  );

  const resultResponse = await fetch(
    `${API_URL}/crawl/${jobId}`,
    {
      headers: {
        "X-API-Key":
          process.env.ANAKIN_API_KEY!,
      },
    }
  );

  const resultData =
    await resultResponse.json();

  return resultData;
}