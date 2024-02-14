const Article = require("../models/article");
const BadRequestError = require("../utils/BadRequestError");
const ForbiddenError = require("../utils/ForbiddenError");
const NotFoundError = require("../utils/NotFoundError");

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((items) => res.send(items))
    .catch(next);
};

module.exports.addArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner = req.user._id,
  } = req.body;

  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const { _id } = req.params;
  Article.findById(_id)
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }

      if (item.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(
          "You do not have permission to delete this item",
        );
      }

      return Article.deleteOne({ _id })
        .then(() => res.send({ message: "Item deleted" }))
        .catch((err) => {
          if (err.name === "CastError") {
            next(new BadRequestError("Invalid data"));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID"));
      } else {
        next(err);
      }
    });
};
