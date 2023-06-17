import { PRODUCTS_URL, UPLOAD_URL } from "../../constants";
import { Product, ProductInput } from "../../interfaces/product.interface";
import { apiSlice } from "./apiSlice";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({ url: PRODUCTS_URL }),
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
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} = productsApiSlice;
