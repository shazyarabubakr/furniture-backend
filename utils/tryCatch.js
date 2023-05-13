export const tryCatch = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};
  
//(controller) => {
//     return  async (req, res, next) => {
//         try {
//              await controller(req,res);
    
//         } catch (err) {
//            return  next(err);
//         }
//     }
    
// }