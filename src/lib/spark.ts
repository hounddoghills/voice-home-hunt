export interface SparkListing {
  Id: string;
  UnparsedAddress: string;
  BedroomsTotal: number;
  BathroomsFull: number;
  ListPrice: number;
  LivingArea: number;
  MlsStatus: string;
  PropertyType: string;
  Coordinates: {
    Latitude: number;
    Longitude: number;
  };
}

export interface SparkSearchParams {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  propertyTypes?: string[];
  limit?: number;
}

export interface SparkSearchResponse {
  success: boolean;
  data: {
    Listings: SparkListing[];
    totalCount: number;
  };
}

async function sparkRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = process.env.SPARK_API_KEY;
  
  if (!apiKey) {
    throw new Error("SPARK_API_KEY is not configured");
  }

  const response = await fetch(`${process.env.SPARK_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Spark-API-Key": process.env.SPARK_REPLICATION_KEY || "",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Spark API error: ${response.status}`);
  }

  return response.json();
}

export async function searchListings(
  params: SparkSearchParams
): Promise<SparkSearchResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.query) searchParams.set("q", params.query);
  if (params.minPrice) searchParams.set("MinPrice", params.minPrice.toString());
  if (params.maxPrice) searchParams.set("MaxPrice", params.maxPrice.toString());
  if (params.minBeds) searchParams.set("MinBeds", params.minBeds.toString());
  if (params.limit) searchParams.set("_pageSize", params.limit.toString());

  return sparkRequest<SparkSearchResponse>(`/Properties?${searchParams.toString()}`);
}

export async function getListingDetails(listingId: string): Promise<SparkListing> {
  return sparkRequest<SparkListing>(`/Properties/${listingId}`);
}
