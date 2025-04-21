import { gql, DocumentNode } from "@apollo/client";

export const GET_PRODUCT_BY_ID: DocumentNode = gql`
  query getProductByIdForClients($id: String!) {
    getProductByIdForClients(id: $id) {
      product {
        id
        name
        mainImage
        images
        price
        estimatedPrice
        descriptionEn
        descriptionAr
        category {
          id
          name
        }
        sku
        keywordsEn
        keywordsAr
        sizes {
          value
          soldout
        }
        colors {
          value
          soldout
        }
        soldOut
      }
      randomProducts {
        id
        name
        mainImage
        images
        price
        estimatedPrice
        sku
        sizes {
          value
          soldout
        }
        colors {
          value
          soldout
        }
        soldOut
      }
    }
  }
`;
