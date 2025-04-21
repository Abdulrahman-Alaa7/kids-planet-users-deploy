import { gql, DocumentNode } from "@apollo/client";

export const GET_PRODUCTS: DocumentNode = gql`
  query {
    getProductsForClients {
      id
      name
      mainImage
      images
      price
      estimatedPrice
      soldOut
      sku
      category {
        id
        name
      }
      sizes {
        value
        soldout
      }
      colors {
        value
        soldout
      }
      createdAt
    }
  }
`;
