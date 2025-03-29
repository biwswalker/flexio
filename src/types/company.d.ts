interface Company {
  id: string;
  name: string;
  shortName: string;
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  postcode: string;
  phone: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateCompanyRequest {
  name: string;
  shortName: string;
  address?: string;
  subDistrict?: string;
  district?: string;
  province?: string;
  postcode?: string;
  phone?: string;
  email?: string;
  imageUrl?: File | string | null;
}
