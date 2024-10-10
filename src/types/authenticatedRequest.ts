import { Request } from "express";
import TokenPaloadDTO from "./DTO/paloadTokenDTO";

export default interface AuthenticatedRequest<ReqBodyType = any>
  extends Request {
  user: TokenPaloadDTO;
  body: ReqBodyType;
}
