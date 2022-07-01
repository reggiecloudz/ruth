import mongoose, { Document, Schema } from 'mongoose';

export interface IArticle {
  title: string;
  author: string;
}

export interface IArticleModel extends IArticle, Document {}

const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IArticleModel>('Article', ArticleSchema);
