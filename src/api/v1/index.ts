import UserComponent from "./users";
import { V1 } from "./v1";

const v1 = new V1();

v1.register(UserComponent);

export default v1;