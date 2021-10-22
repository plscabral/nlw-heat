import { Router } from 'express';

// Importing controllers
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { GetLab3MessageController  } from './controllers/GetLab3MessageController';
import { ProfileUserController  } from './controllers/ProfileUserController';

// Importing middleware
import { ensureAuthenticated } from './middleware/ensureAuthenticated';

// Declaring 'Router' from 'Express'
const router = Router();

// Routes
router.post("/authenticate", new AuthenticateUserController().handle);
router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);
router.get('/messages/last3', new GetLab3MessageController().handle);
router.get('/profile', ensureAuthenticated, new ProfileUserController().handle);

export { router };