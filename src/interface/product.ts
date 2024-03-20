export interface IProducts {
  _id?: string;
  name: string;
  image: string;
  type?: string;
  price?: number;
  sale?: number;
  listImages?: string;
  description?: string;
  tags?: string[];
  customerReview?: {
    user: string;
    review: string;
  }[];
}

export interface IProduct {
  _id?: string;
  name: string;
  image: string;
  type?: string;
  price?: number;
  sale?: number;
  listImages?: string;
  description?: string;
  tags?: string[];
  customerReview?: {
    user: string;
    review: string;
  };
}
