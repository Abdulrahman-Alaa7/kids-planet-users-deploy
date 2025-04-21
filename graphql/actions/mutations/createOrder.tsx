import { gql, DocumentNode } from "@apollo/client";

export const CREATE_ORDER: DocumentNode = gql`
  mutation createOrder(
    $lang: String!
    $fullName: String!
    $email: String!
    $order: [Order!]!
    $phone_number: String!
    $secPhone_number: String
    $governorate: String!
    $secGovernorate: String
    $city: String!
    $secCity: String
    $address: String!
    $secAddress: String
    $note: String
  ) {
    createOrder(
      orderDto: {
        lang: $lang
        email: $email
        order: $order
        phone_number: $phone_number
        secPhone_number: $secPhone_number
        fullName: $fullName
        governorate: $governorate
        secGovernorate: $secGovernorate
        city: $city
        secCity: $secCity
        address: $address
        secAddress: $secAddress
        note: $note
      }
    ) {
      message
    }
  }
`;
