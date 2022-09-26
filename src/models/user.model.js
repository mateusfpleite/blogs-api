const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: DataTypes.INTEGER,
      display_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {timestamps: false,
    tableName: 'users'});
    
    User.associate = (models) => {
      User.hasMany(models.blogPosts,
        { foreignKey: 'user_id', as: 'blog_posts' });
    };
  
    return User;
  };
  
  module.exports = UserModel;
  