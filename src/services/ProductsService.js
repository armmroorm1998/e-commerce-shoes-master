import { BaseService } from "./BaseService";
import { mainAPIHeaderOptions } from "../constant/config";

export class ProductsService extends BaseService {
  fetchAddProducts = ({ name, price, description, tags, images }) => {
    return this.requester.post(
      "/api/product/create",
      { name, price, description, tags, images },
      mainAPIHeaderOptions()
    );
  };
}
