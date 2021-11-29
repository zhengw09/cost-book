/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSymbol = /* GraphQL */ `
  mutation CreateSymbol(
    $input: CreateSymbolInput!
    $condition: ModelSymbolConditionInput
  ) {
    createSymbol(input: $input, condition: $condition) {
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
export const updateSymbol = /* GraphQL */ `
  mutation UpdateSymbol(
    $input: UpdateSymbolInput!
    $condition: ModelSymbolConditionInput
  ) {
    updateSymbol(input: $input, condition: $condition) {
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
export const deleteSymbol = /* GraphQL */ `
  mutation DeleteSymbol(
    $input: DeleteSymbolInput!
    $condition: ModelSymbolConditionInput
  ) {
    deleteSymbol(input: $input, condition: $condition) {
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
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
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
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
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
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
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
