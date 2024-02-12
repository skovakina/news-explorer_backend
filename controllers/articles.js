const Article = require("../models/article");
const BadRequestError = require("../utils/BadRequestError");
const ForbiddenError = require("../utils/ForbiddenError");
const NotFoundError = require("../utils/NotFoundError");

module.exports.getArticles = (req, res, next) => {
  console.log("here!");
  Article.find({})
    .then((items) => res.send(items))
    .catch(next);
};

//   getArticles,
// addArticle,
// deleteArticle,

//   keyword: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   text: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   source: {
//     type: String,
//     required: true,
//   },
//   link: {
//     type: String,
//     required: true,
//     validate: {
//       validator(value) {
//         return validator.isURL(value);
//       },
//     },
//   },
//   image: {
//     type: String,
//     required: true,
//     validate: {
//       validator(value) {
//         return validator.isURL(value);
//       },
//     },
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user",
//     required: true,
//   },
// });

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
        console.log(err);
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteArticle = (req, res, next) => {
  const { _id } = req.params;
  console.log(req.params);
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
