import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/UseToast';
import { usePosts } from '../../contexts/PostContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { 
  Shield, 
  Upload, 
  FileText, 
  Image, 
  Send,
  Plus,
  X,
  Check
} from 'lucide-react';
import { Navigate } from 'react-router-dom';
// import Header from '../Header';
// import Footer from '../Footer';

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const { addPost } = usePosts();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentFiles, setSelectedDocumentFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Quitar la verificación de usuario/admin
  // if (!user || !isAdmin) {
  //   return <Navigate to="/login" replace />;
  // }

  // Manejar selección de imagen
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo muy grande",
          description: "La imagen debe ser menor a 5MB",
          variant: "destructive"
        });
        return;
      }
      setSelectedImageFile(file);
      setImage(''); // Limpiar URL si hay archivo seleccionado
    }
  };

  // Manejar error de imagen no compartible
  const handleImageError = () => {
    toast({
      title: 'Imagen no compartible',
      description: 'No se puede mostrar la imagen seleccionada. Verifica que la URL o el archivo sean públicos y compatibles.',
      variant: 'destructive',
    });
    setSelectedImageFile(null);
    setImage('');
  };

  // Manejar selección de documentos
  const handleDocumentFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      // Validar tipo de archivo
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Tipo de archivo no válido",
          description: "Solo se permiten PDF, DOC, DOCX y TXT",
          variant: "destructive"
        });
        return false;
      }
      // Validar tamaño (10MB máximo por archivo)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Archivo muy grande",
          description: `${file.name} debe ser menor a 10MB`,
          variant: "destructive"
        });
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setSelectedDocumentFiles(prev => [...prev, ...validFiles]);
    }
  };

  // Limpiar imagen
  const clearImage = () => {
    setSelectedImageFile(null);
    setImage('');
  };

  // Remover documento
  const handleRemoveDocument = (index) => {
    setSelectedDocumentFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Crear nueva publicación usando el contexto
    const newPost = {
      title: title.trim(),
      content: content.trim(),
      image: selectedImageFile ? URL.createObjectURL(selectedImageFile) : (image.trim() || undefined),
      documents: selectedDocumentFiles.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        size: file.size,
        type: file.type
      }))
    };

    addPost(newPost);

    // Mostrar mensaje de confirmación
    setShowSuccessMessage(true);
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);

    toast({
      title: "¡Publicación creada!",
      description: "Tu publicación ha sido publicada exitosamente.",
    });
    
    // Reset form
    setTitle('');
    setContent('');
    setImage('');
    setSelectedImageFile(null);
    setSelectedDocumentFiles([]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex flex-col items-start mb-8">
          <div className="w-16 h-16 admin-gradient rounded-xl flex items-center justify-center mb-2 transition-transform duration-300 hover:scale-105">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-left text-gray-900 mb-2 drop-shadow-lg transition-transform duration-300 hover:scale-105">
            Panel de Administración
          </h1>
          <p className="text-2xl font-semibold text-left text-black mt-1 transition-transform duration-300 hover:scale-105">
            Crear nueva publicación
          </p>
        </div>

        <Card className="post-card border-0">
          <CardHeader>
            <CardTitle>Nueva Publicación</CardTitle>
            <CardDescription>
              Completa todos los campos para crear una nueva publicación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título de la publicación"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="content">Contenido *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escribe el contenido de tu publicación..."
                  required
                  className="mt-1 min-h-32"
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="image">Imagen de la Publicación</Label>
                <div className="space-y-3 mt-1">
                  {/* Opción 1: Subir imagen local */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id="imageFile"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    <label htmlFor="imageFile" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-blue-600 font-medium">Haz clic para subir</span> o arrastra una imagen aquí
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, WebP hasta 5MB
                      </p>
                    </label>
                  </div>
                  
                  {/* Opción 2: URL de imagen */}
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Input
                        id="imageUrl"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="O ingresa una URL de imagen (https://ejemplo.com/imagen.jpg)"
                        className="text-sm"
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setImage('')}
                      className="px-3"
                    >
                      Limpiar
                    </Button>
                  </div>
                  
                  {/* Preview de la imagen */}
                  {(image || selectedImageFile) && (
                    <div className="mt-3">
                      <div className="relative">
                        <img 
                          src={selectedImageFile ? URL.createObjectURL(selectedImageFile) : image} 
                          alt="Preview" 
                          className="w-full h-40 object-cover rounded-lg"
                          onError={handleImageError}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={clearImage}
                          className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full transition-transform duration-300 hover:scale-110"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      {selectedImageFile && (
                        <p className="text-xs text-gray-500 mt-1">
                          Archivo: {selectedImageFile.name} ({(selectedImageFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Documentos Adjuntos</Label>
                <div className="mt-2 space-y-3">
                  {/* Área de subida de documentos */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id="documentFiles"
                      accept=".pdf,.doc,.docx,.txt"
                      multiple
                      onChange={handleDocumentFileChange}
                      className="hidden"
                    />
                    <label htmlFor="documentFiles" className="cursor-pointer">
                      <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="text-blue-600 font-medium">Haz clic para subir</span> o arrastra documentos aquí
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, TXT hasta 10MB por archivo
                      </p>
                    </label>
                  </div>

                  {/* Lista de documentos seleccionados */}
                  {selectedDocumentFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Documentos seleccionados:</h4>
                      {selectedDocumentFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type.split('/')[1]?.toUpperCase() || 'ARCHIVO'}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveDocument(index)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 transition-transform duration-300 hover:scale-110"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  disabled={loading || !title.trim() || !content.trim()}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Publicando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Publicar</span>
                    </>
                  )}
                </Button>
                
                {/* Mensaje de confirmación moderno */}
                {showSuccessMessage && (
                  <div className="mt-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-2xl"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm border border-emerald-200/50 rounded-2xl p-8 shadow-2xl">
                      <div className="text-center">
                        {/* Icono animado */}
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-6 shadow-lg">
                          <Check className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Título */}
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
                          ¡Publicación Exitosa!
                        </h3>
                        
                        {/* Descripción */}
                        <p className="text-gray-600 text-lg mb-4 max-w-md mx-auto leading-relaxed">
                          Tu contenido ha sido publicado y ahora está disponible para toda la comunidad
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6 post-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Image className="w-5 h-5" />
              <span>Consejos para archivos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Imágenes:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Usa imágenes de alta calidad (mínimo 800x600px)</li>
                  <li>• Formatos recomendados: JPG, PNG, WebP</li>
                  <li>• Tamaño máximo: 5MB</li>
                  <li>• Si no tienes imagen, se usará una por defecto</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Documentos:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Formatos permitidos: PDF, DOC, DOCX, TXT</li>
                  <li>• Tamaño máximo: 10MB por archivo</li>
                  <li>• Puedes subir múltiples documentos</li>
                  <li>• Los archivos se mostrarán en la publicación</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}