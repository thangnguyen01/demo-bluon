import { RouterModule } from "@nestjs/core";
import { UserModule } from "./user.module";

const UserRouterMoudle = RouterModule.register([
  {
    path: 'user',
    module: UserModule,
  },
]);

export default UserRouterMoudle;