/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSymbol = /* GraphQL */ `
  query GetSymbol($symbol: String!) {
    getSymbol(symbol: $symbol) {
      symbol
      assetType
      costBasis
      quantity
      totalCost
      transactionCount
    }
  }
`;
export const listSymbols = /* GraphQL */ `
  query ListSymbols(
    $symbol: String
    $filter: ModelSymbolFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSymbols(
      symbol: $symbol
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        symbol
        assetType
        costBasis
        quantity
        totalCost
        transactionCount
      }
      nextToken
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($symbol: String!, $transactionId: Int!) {
    getTransaction(symbol: $symbol, transactionId: $transactionId) {
      symbol
      transactionId
      date
      price
      quantity
      currentCostBasis
      currentTotalQuantity
      currentTotalCost
      createdAt
      updatedAt
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $symbol: String
    $transactionId: ModelIntKeyConditionInput
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTransactions(
      symbol: $symbol
      transactionId: $transactionId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        symbol
        transactionId
        date
        price
        quantity
        currentCostBasis
        currentTotalQuantity
        currentTotalCost
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
