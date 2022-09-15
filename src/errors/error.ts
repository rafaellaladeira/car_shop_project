export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}
  
  type ErrorResponseObject = { 
    message: string;
    httpStatus: number
  };
    
export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
    
};
export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'You have to complete ALL the fields correctly',
    httpStatus: 400,
  },
};