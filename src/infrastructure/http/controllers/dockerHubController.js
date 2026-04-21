const DOCKERHUB_API = 'https://hub.docker.com/v2/repositories/library';

const dockerHubController = {
  async getImageInfo(req, res, next) {
    try {
      const { imagen } = req.params;
      const response = await fetch(`${DOCKERHUB_API}/${imagen}/`);
      if (!response.ok) {
        return res.status(404).json({ success: false, message: `Imagen '${imagen}' no encontrada` });
      }
      const data = await response.json();
      res.json({
        success: true,
        source: 'Docker Hub API',
        data: {
          nombre: data.name,
          descripcion: data.description,
          pulls: data.pull_count,
          stars: data.star_count,
          ultima_actualizacion: data.last_updated,
          es_oficial: data.is_official,
          url: `https://hub.docker.com/_/${imagen}`,
        },
      });
    } catch (err) { next(err); }
  },

  async getImagenesPopulares(req, res, next) {
    try {
      const imagenes = ['nginx', 'ubuntu', 'node', 'postgres', 'python'];
      const resultados = await Promise.all(
        imagenes.map(async (img) => {
          try {
            const response = await fetch(`${DOCKERHUB_API}/${img}/`);
            const data = await response.json();
            return { nombre: data.name, pulls: data.pull_count, stars: data.star_count, es_oficial: data.is_official, url: `https://hub.docker.com/_/${img}` };
          } catch { return null; }
        })
      );
      res.json({ success: true, source: 'Docker Hub API', data: resultados.filter(Boolean) });
    } catch (err) { next(err); }
  },
};

module.exports = dockerHubController;
