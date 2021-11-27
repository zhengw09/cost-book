/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      symbol
      date
      price
      quantity
      costBasis
      totalQuantity
      totalCost
      createdAt
      updatedAt
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        symbol
        date
        price
        quantity
        costBasis
        totalQuantity
        totalCost
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
