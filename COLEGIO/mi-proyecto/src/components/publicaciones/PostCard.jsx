import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  ThumbsUp, 
  ThumbsDown,
  MessageCircle, 
  Share2, 
  FileText,
  Download,
  User,
  Calendar,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePosts } from '../../contexts/PostContext';

// Función para obtener la imagen del post
const getPostImage = (image) => {
  return image;
};

export const PostCard = ({ post, onReact }) => {
  const { getUserReaction } = usePosts();

  const handleReaction = (type, e) => {
    e.stopPropagation(); // Evitar que se active el click del card
    onReact?.(post.id, type);
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

  const hasImage = post.image && post.image.trim() !== '';

  if (!hasImage) {
    // Diseño para posts sin imagen
    return (
      <Link to={`/post/${post.id}`} className="block group">
        <Card className="post-card p-0 border-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
          {/* Header con gradiente */}
          <div className="relative bg-gradient-to-br from-slate-100 via-blue-50 to-sky-50 p-6 pb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-blue-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              {/* Meta información */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <Badge variant="secondary" className="bg-white/70 text-slate-700 border border-slate-200/50 shadow-sm">
                      {post.author}
                    </Badge>
                    <div className="flex items-center text-xs text-slate-500 mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-xs text-slate-400 space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>Ver más</span>
                </div>
              </div>

              {/* Título destacado */}
              <h3 className="text-2xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-sky-600 transition-colors duration-300">
                {post.title}
              </h3>
            </div>
          </div>
          
          {/* Contenido */}
          <div className="px-6 pb-6">
            <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed">
              {post.content}
            </p>

            {/* Documentos adjuntos */}
            {post.documents && post.documents.length > 0 && (
              <div className="mb-4 space-y-2">
                <p className="text-xs font-medium text-slate-500">Documentos adjuntos:</p>
                <div className="flex flex-wrap gap-2">
                  {post.documents.slice(0, 2).map((doc, index) => (
                    <div key={index} className="flex items-center space-x-1 px-2 py-1 bg-slate-100 rounded-md text-xs">
                      <FileText className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-600 truncate max-w-20">{doc.name}</span>
                    </div>
                  ))}
                  {post.documents.length > 2 && (
                    <div className="flex items-center px-2 py-1 bg-slate-100 rounded-md text-xs text-slate-500">
                      +{post.documents.length - 2} más
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleReaction('likes', e)}
                  className={`flex items-center space-x-1 transition-all hover:bg-sky-50 ${
                    getUserReaction(post.id, 'likes') ? 'text-sky-500 bg-sky-50' : 'text-slate-400 hover:text-sky-500'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${getUserReaction(post.id, 'likes') ? 'fill-current' : ''}`} />
                  <span className="text-xs">{post.reactions.likes}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleReaction('dislikes', e)}
                  className={`flex items-center space-x-1 transition-all hover:bg-red-50 ${
                    getUserReaction(post.id, 'dislikes') ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-red-500'
                  }`}
                >
                  <ThumbsDown className={`w-4 h-4 ${getUserReaction(post.id, 'dislikes') ? 'fill-current' : ''}`} />
                  <span className="text-xs">{post.reactions.dislikes}</span>
                </Button>

                <div className="flex items-center space-x-1 text-slate-400">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">{post.comments ? post.comments.length : 0}</span>
                </div>
              </div>
              
              <div className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click para leer más →
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // Diseño original para posts con imagen
  return (
    <Link to={`/post/${post.id}`} className="block group">
      <Card className="post-card p-0 border-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <div className="relative overflow-hidden">
          <img 
            src={getPostImage(post.image)} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-black/50 text-white border-0">
              {post.author}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center text-white text-xs space-x-1">
              <Eye className="w-3 h-3" />
              <span>Ver publicación completa</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors cursor-pointer">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.content}
          </p>

          {post.documents && post.documents.length > 0 && (
            <div className="mb-4 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Documentos adjuntos:</p>
              {post.documents.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm flex-1">{doc.name}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 w-6 p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleReaction('likes', e)}
                className={`flex items-center space-x-1 transition-all ${
                  getUserReaction(post.id, 'likes') ? 'text-green-500' : 'text-muted-foreground hover:text-green-500'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${getUserReaction(post.id, 'likes') ? 'fill-current' : ''}`} />
                <span>{post.reactions.likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleReaction('dislikes', e)}
                className={`flex items-center space-x-1 transition-all ${
                  getUserReaction(post.id, 'dislikes') ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                }`}
              >
                <ThumbsDown className={`w-4 h-4 ${getUserReaction(post.id, 'dislikes') ? 'fill-current' : ''}`} />
                <span>{post.reactions.dislikes}</span>
              </Button>

              <div className="flex items-center space-x-1 text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments ? post.comments.length : 0}</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};