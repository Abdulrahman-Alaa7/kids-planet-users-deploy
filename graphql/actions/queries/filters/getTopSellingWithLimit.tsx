import { gql, DocumentNode } from "@apollo/client";

export const GET_TOP_SELLING_WITH_LIMIT: DocumentNode = gql`
  query {
    getTopSellingWithLimit {
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
