import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePosts } from '../../contexts/PostContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { 
  ThumbsUp, 
  ThumbsDown,
  MessageCircle, 
  FileText,
  Download,
  ArrowLeft,
  Send,
  Reply,
  User,
  Calendar,
  Clock
} from 'lucide-react';

export const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { 
    getPostById, 
    addComment, 
    addReply, 
    handleUserReaction, 
    getUserReaction,
    handleCommentReaction,
    getUserCommentReaction
  } = usePosts();
  const post = getPostById(postId);

  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  if (!post) {
    return (
      <div className="min-h-screen pt-20 pb-8 flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Publicación no encontrada</h2>
            <Link to="/publicaciones">
              <Button>Volver a publicaciones</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(postId, {
        author: "Usuario",
        content: newComment.trim()
      });
      setNewComment('');
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (newReply.trim() && replyingTo) {
      addReply(postId, replyingTo.id, {
        author: "Usuario",
        content: newReply.trim()
      });
      setNewReply('');
      setReplyingTo(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReaction = (type) => {
    handleUserReaction(postId, type);
  };

  const hasImage = post.image && post.image.trim() !== '';

  return (
    <div className="min-h-screen pt-20 pb-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Botón de regreso */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate('/user-dashboard', { state: { section: 'publicaciones' } })}
            className="flex items-center space-x-2 bg-transparent hover:bg-gray-100 text-blue-600 font-medium px-4 py-2 rounded transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a publicaciones</span>
          </button>
        </div>

        {/* Post principal */}
        <Card className="post-card border-0 shadow-lg mb-8">
          {hasImage ? (
            // Diseño con imagen
            <>
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-80 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/50 text-white border-0">
                    {post.author}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold text-card-foreground mb-4">
                  {post.title}
                </h1>
                
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {post.content}
                </p>
              </CardContent>
            </>
          ) : (
            // Diseño sin imagen - más editorial
            <CardContent className="p-0">
              {/* Header con información del autor */}
              <div className="bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 px-8 py-6 border-b border-slate-100">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800 mb-1">
                        {post.author}
                      </h2>
                      <div className="flex items-center text-sm text-slate-500 space-x-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Lectura de {Math.ceil(post.content.length / 200)} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Título principal */}
                <h1 className="text-4xl font-bold text-slate-800 leading-tight mb-4">
                  {post.title}
                </h1>

                {/* Subtítulo/resumen */}
                <p className="text-xl text-slate-600 leading-relaxed font-light">
                  {post.content.length > 150 ? post.content.substring(0, 150) + "..." : post.content}
                </p>
              </div>

              {/* Contenido completo */}
              <div className="px-8 py-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                </div>
              </div>
            </CardContent>
          )}

          {/* Documentos adjuntos (común para ambos diseños) */}
          {post.documents && post.documents.length > 0 && (
            <div className="px-6 pb-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-muted-foreground">Documentos adjuntos:</h3>
                {post.documents.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-muted rounded-md">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm flex-1">{doc.name}</span>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reacciones (común para ambos diseños) */}
          <div className="px-6 pb-6">
            <div className="flex items-center space-x-6 pt-6 border-t border-slate-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReaction('likes')}
                className={`flex items-center space-x-2 transition-all hover:bg-sky-50 ${
                  getUserReaction(postId, 'likes') ? 'text-sky-500 bg-sky-50' : 'text-muted-foreground hover:text-sky-500'
                }`}
              >
                <ThumbsUp className={`w-5 h-5 ${getUserReaction(postId, 'likes') ? 'fill-current' : ''}`} />
                <span>{post.reactions.likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReaction('dislikes')}
                className={`flex items-center space-x-2 transition-all ${
                  getUserReaction(postId, 'dislikes') ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                }`}
              >
                <ThumbsDown className={`w-5 h-5 ${getUserReaction(postId, 'dislikes') ? 'fill-current' : ''}`} />
                <span>{post.reactions.dislikes}</span>
              </Button>

              <div className="flex items-center space-x-2 text-muted-foreground">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments.length} comentarios</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Sección de comentarios */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Comentarios ({post.comments.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Formulario para nuevo comentario */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-gray-600" />
                Deja tu comentario
              </h3>
              <form onSubmit={handleCommentSubmit}>
                <div className="flex space-x-3">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Comparte tus pensamientos sobre esta publicación..."
                    className="flex-1 border-gray-200 focus:border-sky-500 focus:ring-sky-500 resize-none"
                    rows={3}
                  />
                  <Button 
                    type="submit" 
                    disabled={!newComment.trim()}
                    className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors duration-200 self-end"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Comentar
                  </Button>
                </div>
              </form>
            </div>

            {/* Lista de comentarios */}
            <div className="space-y-6">
              {post.comments.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">
                    No hay comentarios aún
                  </h3>
                  <p className="text-gray-400">
                    ¡Sé el primero en comentar!
                  </p>
                </div>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    {/* Comentario principal */}
                    <div className="p-5">
                      {/* Header del comentario */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {comment.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {comment.author}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatDate(comment.createdAt)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyingTo(replyingTo?.id === comment.id ? null : comment)}
                          className="h-8 px-3 text-xs text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all duration-200"
                        >
                          <Reply className="w-3 h-3 mr-1" />
                          Responder
                        </Button>
                      </div>
                      
                      {/* Contenido del comentario */}
                      <div className="ml-13">
                        <p className="text-gray-800 text-sm leading-relaxed mb-3">
                          {comment.content}
                        </p>
                        
                        {/* Reacciones del comentario */}
                        <div className="flex items-center space-x-4 mb-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCommentReaction(postId, comment.id, 'likes')}
                            className={`flex items-center space-x-2 transition-all hover:bg-sky-50 ${
                              getUserCommentReaction(postId, comment.id, 'likes') ? 'text-sky-500' : 'text-muted-foreground hover:text-sky-500'
                            }`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${getUserCommentReaction(postId, comment.id, 'likes') ? 'fill-current' : ''}`} />
                            <span className="text-xs">{comment.reactions?.likes || 0}</span>
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCommentReaction(postId, comment.id, 'dislikes')}
                            className={`flex items-center space-x-2 transition-all ${
                              getUserCommentReaction(postId, comment.id, 'dislikes') ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                            }`}
                          >
                            <ThumbsDown className={`w-4 h-4 ${getUserCommentReaction(postId, comment.id, 'dislikes') ? 'fill-current' : ''}`} />
                            <span className="text-xs">{comment.reactions?.dislikes || 0}</span>
                          </Button>
                        </div>
                      </div>

                      {/* Formulario de respuesta */}
                      {replyingTo?.id === comment.id && (
                        <div className="mt-4 ml-13">
                          <form onSubmit={handleReplySubmit} className="flex space-x-2">
                            <Input
                              value={newReply}
                              onChange={(e) => setNewReply(e.target.value)}
                              placeholder={`Responder a ${comment.author}...`}
                              className="flex-1 text-sm border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                            />
                            <Button 
                              type="submit" 
                              size="sm" 
                              disabled={!newReply.trim()}
                              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors duration-200"
                            >
                              <Send className="w-3 h-3" />
                            </Button>
                          </form>
                        </div>
                      )}

                      {/* Respuestas */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 ml-13 space-y-3">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-sky-200">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                                  {reply.author.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900 text-sm">
                                    {reply.author}
                                  </h5>
                                  <p className="text-xs text-gray-500">
                                    {formatDate(reply.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 ml-11 leading-relaxed">
                                {reply.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};