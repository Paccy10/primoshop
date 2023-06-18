import { PRODUCTS_URL, UPLOAD_URL } from "../../constants";
import {
  Product,
  ProductInput,
  ReviewInput,
} from "../../interfaces/product.interface";
import { apiSlice } from "./apiSlice";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: Product[]; page: number; pages: number },
      { page: number; pageSize: number; keyword: string }
    >({
      query: ({ page, pageSize, keyword }) => ({
        url: PRODUCTS_URL,
        params: { page, pageSize, keyword },
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getSingleProduct: builder.query<Product, string>({
      query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}` }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation<Product, void>({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      Product,
      { data: ProductInput; productId: string }
    >({
      query: ({ data, productId }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation<
      { message: string; image: string },
      any
    >({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
    }),
    createProductReview: builder.mutation<
      { message: string },
      { data: ReviewInput; productId: string }
    >({
      query: ({ data, productId }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopProducts: builder.query<Product[], void>({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice;
