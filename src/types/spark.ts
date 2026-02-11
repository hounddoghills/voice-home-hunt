export interface SparkListing {
  Id: string;
  UnparsedAddress: string;
  BedroomsTotal: number;
  BathroomsFull: number;
  BathroomsHalf: number;
  LivingArea: number;
  ListPrice: number;
  MlsStatus: string;
  PropertyType: string;
  PropertySubType: string;
  DaysOnMarket: number;
  Media?: SparkMedia[];
  OpenHouses?: SparkOpenHouse[];
  Coordinates: {
    Latitude: number;
    Longitude: number;
  };
  Agent: {
    MemberKey: string;
    MemberFullName: string;
    MemberEmail: string;
  };
  Office: {
    OfficeKey: string;
    OfficeName: string;
  };
  Remarks?: string;
  StandardStatus: string;
}

export interface SparkMedia {
  MediaKey: string;
  MediaURL: string;
  MediaType: string;
  Description?: string;
}

export interface SparkOpenHouse {
  OpenHouseDate: string;
  StartTime: string;
  EndTime: string;
  OpenHouseStatus: string;
}

export interface SparkSearchParams {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  propertyTypes?: string[];
  locations?: string[];
  limit?: number;
  offset?: number;
}

export interface SparkSearchResponse {
  success: boolean;
  data: {
    Listings: SparkListing[];
    totalCount: number;
    page: number;
    pageSize: number;
  };
  errors?: string[];
}
