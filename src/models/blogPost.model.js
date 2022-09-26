const blogPostModel = (sequelize, DataTypes) => {
    const BlogPosts = sequelize.define('BlogPosts', {
      id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {timestamps: false,
    tableName: 'blog_posts'});

    BlogPosts.associate = (models) => {
      BlogPosts.belongsTo(models.User,
        { foreignKey: 'user_id', as: 'users' });
    };
  
    return BlogPost;
  };
  
  module.exports = blogPostModel;
  