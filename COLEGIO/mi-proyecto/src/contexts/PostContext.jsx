import { createContext, useContext, useState, useEffect } from 'react';

const PostContext = createContext();

// Datos de ejemplo
const initialPosts = [
  {
    "id": "1",
    "title": "Entrenamiento inclusivo para todos",
    "content": "Desde principiantes hasta atletas, nuestros entrenamientos amigables dan la bienvenida a todos los cuerpos, niveles y aspiraciones. Únete a nuestra comunidad diversa y descubre tu potencial.",
    "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    "author": "Admin Team",
    "createdAt": "2025-01-15T10:30:00Z",
    "reactions": {
      "likes": 24,
      "dislikes": 3
    },
    "comments": [
      {
        "id": "c1",
        "author": "Maria Rodriguez",
        "content": "¡Excelente iniciativa! Me encanta que incluyan a todos los niveles.",
        "createdAt": "2025-01-15T11:00:00Z",
        "reactions": {
          "likes": 5,
          "dislikes": 0
        },
        "replies": [
          {
            "id": "r1",
            "author": "Admin Team",
            "content": "¡Gracias Maria! Nos alegra saber que te gusta nuestro enfoque inclusivo.",
            "createdAt": "2025-01-15T11:30:00Z",
            "reactions": {
              "likes": 2,
              "hearts": 1,
              "fire": 0
            }
          }
        ]
      },
      {
        "id": "c2", 
        "author": "Carlos Lopez",
        "content": "¿Cuándo empiezan las clases para principiantes?",
        "createdAt": "2024-01-15T12:15:00Z",
        "reactions": {
          "likes": 3,
          "hearts": 0,
          "fire": 0
        },
        "replies": []
      }
    ],
    "documents": []
  },
  {
    "id": "2", 
    "title": "Disciplina mente y cuerpo",
    "content": "La esgrima desarrolla enfoque, paciencia y resistencia, es un entrenamiento tanto para tu cuerpo como para tu mente. Descubre el arte de la concentración total.",
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    "author": "Admin Team",
    "createdAt": "2024-01-14T14:20:00Z", 
    "reactions": {
      "likes": 31,
      "dislikes": 4
    },
    "comments": [
      {
        "id": "c3",
        "author": "Ana Martinez",
        "content": "Siempre quise probar esgrima, se ve fascinante",
        "createdAt": "2024-01-14T15:30:00Z",
        "reactions": {
          "likes": 7,
          "dislikes": 1
        },
        "replies": []
      }
    ],
    "documents": [
      {
        "name": "Guía_Esgrima_Principiantes.pdf",
        "url": "#"
      }
    ]
  },
  {
    "id": "3",
    "title": "Comunidad de apoyo", 
    "content": "Únete a un ambiente de equipo donde el amor, trabajo en equipo y el respeto son parte de la clase. Construimos vínculos que van más allá del entrenamiento.",
    "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
    "author": "Admin Team", 
    "createdAt": "2024-01-13T16:45:00Z",
    "reactions": {
      "likes": 19,
      "dislikes": 2
    },
    "comments": [],
    "documents": []
  }
];

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [userReactions, setUserReactions] = useState({});

  // Agregar nueva publicación
  const addPost = (newPost) => {
    const post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      reactions: { likes: 0, dislikes: 0 },
      comments: [],
      author: "Admin Team"
    };
    setPosts(prev => [post, ...prev]);
  };

  // Agregar comentario a un post
  const addComment = (postId, comment) => {
    const newComment = {
      id: Date.now().toString(),
      ...comment,
      createdAt: new Date().toISOString(),
      reactions: { likes: 0, dislikes: 0 },
      replies: []
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
  };

  // Agregar respuesta a un comentario
  const addReply = (postId, commentId, reply) => {
    const newReply = {
      id: Date.now().toString(),
      ...reply,
      createdAt: new Date().toISOString(),
      reactions: { likes: 0, dislikes: 0 }
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, replies: [...comment.replies, newReply] }
                : comment
            )
          }
        : post
    ));
  };

  // Manejar reacciones del usuario
  const handleUserReaction = (postId, type) => {
    setUserReactions(prev => {
      const currentReaction = prev[`${postId}-${type}`] || false;
      const newReaction = !currentReaction;
      
      // Actualizar el contador del post de manera síncrona
      setPosts(prevPosts => {
        const postIndex = prevPosts.findIndex(post => post.id === postId);
        if (postIndex !== -1) {
          const updatedPosts = [...prevPosts];
          const currentCount = updatedPosts[postIndex].reactions[type] || 0;
          
          if (newReaction) {
            // Si está activando la reacción, incrementar de 1 en 1
            updatedPosts[postIndex] = {
              ...updatedPosts[postIndex],
              reactions: {
                ...updatedPosts[postIndex].reactions,
                [type]: currentCount + 1
              }
            };
          } else {
            // Si está desactivando la reacción, decrementar de 1 en 1
            updatedPosts[postIndex] = {
              ...updatedPosts[postIndex],
              reactions: {
                ...updatedPosts[postIndex].reactions,
                [type]: Math.max(0, currentCount - 1)
              }
            };
          }
          
          return updatedPosts;
        }
        return prevPosts;
      });
      
      return {
        ...prev,
        [`${postId}-${type}`]: newReaction
      };
    });
  };

  // Obtener reacción del usuario
  const getUserReaction = (postId, type) => {
    return userReactions[`${postId}-${type}`] || false;
  };

  // Manejar reacciones en comentarios
  const handleCommentReaction = (postId, commentId, type) => {
    setUserReactions(prev => {
      const currentReaction = prev[`${postId}-${commentId}-${type}`] || false;
      const newReaction = !currentReaction;
      
      setPosts(prevPosts => {
        const postIndex = prevPosts.findIndex(post => post.id === postId);
        if (postIndex !== -1) {
          const updatedPosts = [...prevPosts];
          const commentIndex = updatedPosts[postIndex].comments.findIndex(comment => comment.id === commentId);
          
          if (commentIndex !== -1) {
            const currentCount = updatedPosts[postIndex].comments[commentIndex].reactions[type] || 0;
            
            if (newReaction) {
              // Si está activando la reacción, incrementar de 1 en 1
              updatedPosts[postIndex].comments[commentIndex] = {
                ...updatedPosts[postIndex].comments[commentIndex],
                reactions: {
                  ...updatedPosts[postIndex].comments[commentIndex].reactions,
                  [type]: currentCount + 1
                }
              };
            } else {
              // Si está desactivando la reacción, decrementar de 1 en 1
              updatedPosts[postIndex].comments[commentIndex] = {
                ...updatedPosts[postIndex].comments[commentIndex],
                reactions: {
                  ...updatedPosts[postIndex].comments[commentIndex].reactions,
                  [type]: Math.max(0, currentCount - 1)
                }
              };
            }
          }
          
          return updatedPosts;
        }
        return prevPosts;
      });
      
      return {
        ...prev,
        [`${postId}-${commentId}-${type}`]: newReaction
      };
    });
  };

  // Manejar reacciones en respuestas
  const handleReplyReaction = (postId, commentId, replyId, type) => {
    setUserReactions(prev => {
      const currentReaction = prev[`${postId}-${commentId}-${replyId}-${type}`] || false;
      const newReaction = !currentReaction;
      
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: comment.replies.map(reply => {
                    if (reply.id === replyId) {
                      const currentCount = reply.reactions[type] || 0;
                      const newCount = newReaction ? currentCount + 1 : Math.max(0, currentCount - 1);
                      
                      return {
                        ...reply,
                        reactions: {
                          ...reply.reactions,
                          [type]: newCount
                        }
                      };
                    }
                    return reply;
                  })
                };
              }
              return comment;
            })
          };
        }
        return post;
      }));
      
      return {
        ...prev,
        [`${postId}-${commentId}-${replyId}-${type}`]: newReaction
      };
    });
  };

  // Obtener reacción del usuario en comentarios
  const getUserCommentReaction = (postId, commentId, type) => {
    return userReactions[`${postId}-${commentId}-${type}`] || false;
  };

  // Obtener reacción del usuario en respuestas
  const getUserReplyReaction = (postId, commentId, replyId, type) => {
    return userReactions[`${postId}-${commentId}-${replyId}-${type}`] || false;
  };

  // Obtener post por ID
  const getPostById = (id) => {
    return posts.find(post => post.id === id);
  };

  const value = {
    posts,
    addPost,
    addComment,
    addReply,
    handleUserReaction,
    getUserReaction,
    handleCommentReaction,
    handleReplyReaction,
    getUserCommentReaction,
    getUserReplyReaction,
    getPostById
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts debe ser usado dentro de un PostProvider');
  }
  return context;
};
