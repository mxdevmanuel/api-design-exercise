import { TicketComponent } from './components';
import { UserComponent } from './components';
import { V1 } from './v1';
import { json } from 'body-parser';
import { payloadValidationError } from "./middleware";

const v1 = new V1();

v1.router.use(json());

v1.register(UserComponent);
v1.register(TicketComponent);

v1.router.use(payloadValidationError);

export default v1;
