import { usePosts } from '../../contexts/PostContext';
import { PostCard } from './PostCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Newspaper } from 'lucide-react';


export const PostsList = () => {
  const { posts, handleUserReaction } = usePosts();

  const handleReaction = (postId, type) => {
    handleUserReaction(postId, type);
  };

  return (
    <div className="min-h-screen pt-20 pb-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Newspaper className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Publicaciones del Colegio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mantente informado sobre las últimas noticias, eventos y actividades de nuestra institución
          </p>
        </div>

        {/* Lista de publicaciones */}
        <div className="space-y-8">
          {posts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No hay publicaciones aún
                </h3>
                <p className="text-gray-500">
                  Las publicaciones aparecerán aquí cuando los administradores las creen.
                </p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onReact={handleReaction}
              />
            ))
          )}
        </div>

        {/* Footer informativo */}
        <div className="mt-16 text-center text-gray-500">
          <p className="text-sm">
            ¿Tienes alguna pregunta o sugerencia? Contacta a los administradores.
          </p>
        </div>
      </div>
    </div>
  );
};
