export async function asyncHandler(func, params){
  try{
    const res = await func(params);
    return [res, null];
  } catch(err){
    return [null, err];
  }
}

export function extractErrorMessage(err){
  return err.message ||
        err.response.data.message ||
        "Something wrong happened, try again later";
}