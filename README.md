# bookingtour
This is a back end project to provide api for booking tours web.(data base postgres heroku)

Using in your web with api:
- Get tours with the limit equa params with limit = 2:
  https://bookingtour.herokuapp.com/api/get-tours-by-limit?limit=2
- Create new tour:
  https://bookingtour.herokuapp.com/api/create-new-tour
  
  Note: Need a req.body = {
  
  name,//string
  
  video,//string
  
  price,//string
  
  country,//string
  
  descriptionMarkdown,//string
  
  data.descriptionHTML,//string
  
  image //not required, type= base64
  }
