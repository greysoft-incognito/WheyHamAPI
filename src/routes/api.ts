import NftController from "src/app/http/controllers/NftController";
import { Router } from "src/core/Router";

Router.apiResource("/nfts", NftController);
Router.get("/nfts/:contract/:identifier", new NftController().show);
