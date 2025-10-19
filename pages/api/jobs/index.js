// This API route is not used - frontend connects to NestJS backend
export default async function handler(req, res) {
  return res.status(501).json({
    error: true,
    message: "This API route is deprecated. Please use the NestJS backend API."
  });
}