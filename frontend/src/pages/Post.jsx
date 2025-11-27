import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, votePost } from '../api/posts';
import { getPostComments, addComment } from '../api/comments';
import MainLayout from '../layout/MainLayout';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Loader from '../components/common/Loader';
import { FaArrowUp, FaComment, FaUser } from 'react-icons/fa';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          getPost(postId),
          getPostComments(postId)
        ]);
        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Failed to load post data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const { data } = await addComment({ postId, content: newComment });
      setComments([...comments, data]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpvote = async () => {
    try {
      setPost(prev => ({ ...prev, upvotes: (prev.upvotes || 0) + 1 }));
      await votePost(postId, 1);
    } catch (err) {
      console.error('Failed to upvote', err);
      setPost(prev => ({ ...prev, upvotes: (prev.upvotes || 0) - 1 }));
    }
  };

  if (loading) return <Loader />;
  if (!post) return (
    <MainLayout>
      <div className="text-center py-10 text-neutral-600 dark:text-neutral-400">Post not found</div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        {/* Post Content */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 font-bold">
                {post.author?.username?.[0]?.toUpperCase() || <FaUser />}
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white">{post.author?.username || 'Unknown'}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">{post.title}</h1>
            <div className="text-neutral-800 dark:text-neutral-200 mb-6 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>

            {post.image && (
              <img
                src={post.image}
                alt="Post attachment"
                className="w-full rounded-lg max-h-[500px] object-cover mb-6"
              />
            )}

            <div className="flex items-center gap-6 pt-4 border-t border-neutral-100 dark:border-neutral-700">
              <button
                onClick={handleUpvote}
                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                <FaArrowUp /> <span>{post.upvotes || 0}</span>
              </button>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <FaComment /> <span>{comments.length} Comments</span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Comments</h3>

          {/* Comment Form */}
          <Card>
            <CardBody>
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  className="block w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm transition-colors min-h-[100px] mb-3 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                  placeholder="What are your thoughts?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                ></textarea>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    isLoading={submitting}
                  >
                    Post Comment
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map(comment => (
              <Card key={comment._id} className="bg-neutral-50 dark:bg-neutral-800/50 border-transparent">
                <CardBody className="py-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-neutral-900 dark:text-white">{comment.author?.username || 'User'}</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300">{comment.content}</p>
                </CardBody>
              </Card>
            ))}

            {comments.length === 0 && (
              <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Post;
