exports.paginationQuery = (model) => {
  return async (req, res, next) => {
    try {
      const totalItems = await model.find().countDocuments();
      const perPage = req.query.perPage || 10;
      const currentPage = req.query.page || 1;

      const result = await model
        .find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      res.result = result;
      res.pagination = {
        currentPage: currentPage,
        perPage: perPage,
        totalPages: totalItems,
      };

      next();
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next();
    }
  };
};
