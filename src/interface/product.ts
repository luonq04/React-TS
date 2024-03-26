export interface IProducts {
  _id?: string;
  name: string;
  image: string;
  category?: string;
  price?: number;
  sale?: number;
  gallery?: string;
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
  category?: string;
  price?: number;
  sale?: number;
  gallery?: string;
  description?: string;
  tags?: string[];
  customerReview?: {
    user: string;
    review: string;
  };
}
