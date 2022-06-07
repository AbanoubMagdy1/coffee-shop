export async function asyncHandler(func, params){
  try{
    const res = await func(params);
    return [res, null];
  } catch(err){
    return [null, err];
  }
}