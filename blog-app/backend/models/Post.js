const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    minlength: [10, 'Content must be at least 10 characters long']
  },
  excerpt: {
    type: String,
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Специфичные поля для мужской моды drip стиля
  category: {
    type: String,
    enum: ['streetwear', 'luxury', 'sneakers', 'watches', 'accessories', 'grooming', 'fits', 'collabs', 'hypebeast'],
    required: true
  },
  style: {
    type: String,
    enum: ['casual', 'smart-casual', 'business', 'athleisure', 'techwear', 'vintage', 'designer', 'hype'],
    default: 'casual'
  },
  priceLevel: {
    type: String,
    enum: ['budget', 'mid-tier', 'luxury', 'grail'],
    default: 'mid-tier'
  },
  brands: [{
    type: String,
    trim: true
  }],
  items: [{
    name: String,
    brand: String,
    price: Number,
    link: String
  }],
  dripRating: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter', 'all-year'],
    default: 'all-year'
  },
  location: {
    type: String, // Для street style постов
    trim: true
  },
  featuredImage: {
    type: String,
    default: null
  },
  gallery: [{
    type: String
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      minlength: [1, 'Comment cannot be empty'],
      maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Создаем краткое описание из контента
postSchema.pre('save', function(next) {
  if (this.content && !this.excerpt) {
    this.excerpt = this.content.substring(0, 300) + '...';
  }
  next();
});

// Виртуальные поля
postSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Включаем виртуальные поля в JSON
postSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', postSchema);