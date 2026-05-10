const BASE_URL =
  "https://anakin.io/v1/holocron/task";

export async function getPHProduct(
  slug: string
) {
  const response = await fetch(
    BASE_URL,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        "X-API-Key":
          process.env.ANAKIN_API_KEY!,
      },

      body: JSON.stringify({
        action_id:
          "ph_product_details",

        params: {
          slug,
        },
      }),
    }
  );

  return response.json();
}