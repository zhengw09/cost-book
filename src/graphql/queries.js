/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSymbol = /* GraphQL */ `
  query GetSymbol($id: ID!) {
    getSymbol(id: $id) {
      id
      symbol
      assetType
      costBasis
      quantity
      totalCost
      transactionCount
      createdAt
      updatedAt
    }
  }
`;
export const listSymbols = /* GraphQL */ `
  query ListSymbols(
    $filter: ModelSymbolFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSymbols(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        symbol
        assetType
        costBasis
        quantity
        totalCost
        transactionCount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      symbol
      transactionId
      date
      price
      quantity
      currentCostBasis
      currentTotalQuantity
      currentTotalCost
      id
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
        symbol
        transactionId
        date
        price
        quantity
        currentCostBasis
        currentTotalQuantity
        currentTotalCost
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
