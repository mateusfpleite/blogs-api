const postCategoriesModel = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', {
    post_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
  },
    {
      timestamps: false,
      tableName: 'posts_categories'
    });

  PostCategories.associate = (models) => {
    models.BlogPosts.hasMany(models.Category,
      {
        as: 'categories',
        through: PostCategories,
        foreignKey: 'post_id',
        otherKey: 'category_id'
      });
    models.Category.belongsToMany(models.BlogPosts,
      {
        as: 'blog_posts',
        through: PostCategories,
        foreignKey: 'category_id',
        otherKey: 'post_id'
      });
  };

  return PostCategories;
};

module.exports = postCategoriesModel;