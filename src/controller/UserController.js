import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body)

      const { id, nome, email } = newUser;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json(null)
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json({ errors: 'User not found' });
    }
  }

  async update(req, res) {
    try {

      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({
          errors: ['User not exist'],
        });
      }

      const updateUser = await user.update(req.body);

      const { id, nome, email } = updateUser;

      return res.json({ id, nome, email });

    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async destroy(req, res) {

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({
        errors: "User not exist"
      })
    }

    await user.destroy();

    return res.json(null);
  }
}

export default new UserController();
