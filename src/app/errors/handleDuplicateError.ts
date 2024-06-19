import { TErrorSources, TGenericErrorResponse } from './interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // extracted value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);
  //extracted value will be in the first capturing group
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: `${extractedMessage} is already exist!`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicated Id',
    errorSources,
  };
};

export default handleDuplicateError;
