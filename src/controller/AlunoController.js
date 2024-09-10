import Aluno from '../models/Aluno';
import Photo from '../models/Photo';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'idade', 'peso', 'altura', 'url'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['id', 'filename'],
      }
    });
    return res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);
      return res.status(201).json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Id não enviado'],
        })
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['id', 'url', 'filename'],
        }
      });

      if (!aluno) {
        return res.status(404).json({
          errors: ['Aluno não existe.']
        });
      }

      return res.status(200).json(aluno);

    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID']
        })
      }

      const aluno = await Aluno.findByPk(id);

      await aluno.destroy();

      return res.json(aluno);

    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }


  async update(req, res) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({
          errors: ['Aluno not exist'],
        });
      }

      const updateUser = await aluno.update(req.body);

      return res.json(updateUser);

    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }
}

export default new AlunoController();
