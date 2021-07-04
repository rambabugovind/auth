import { signUp, login } from './controllers/authentication.js';

export default function router(app) {
  // app.get('/', (req, res) => {
  //   res.status(200).send(['Hello', 'Hi', 'Hola']);
  // });
  app.post('/signup', signUp);
  app.post('/login', login);
}
