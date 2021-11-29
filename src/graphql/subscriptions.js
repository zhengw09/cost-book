/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSymbol = /* GraphQL */ `
  subscription OnCreateSymbol {
    onCreateSymbol {
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
export const onUpdateSymbol = /* GraphQL */ `
  subscription OnUpdateSymbol {
    onUpdateSymbol {
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
export const onDeleteSymbol = /* GraphQL */ `
  subscription OnDeleteSymbol {
    onDeleteSymbol {
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
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction {
    onCreateTransaction {
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction {
    onUpdateTransaction {
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction {
    onDeleteTransaction {
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
