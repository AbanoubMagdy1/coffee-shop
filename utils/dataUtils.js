export function getPhotoUrl(data){
  if(data){
    return data.prefix + "original"+ data.suffix;
  }
  return "https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
}