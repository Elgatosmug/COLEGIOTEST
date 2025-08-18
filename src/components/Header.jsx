import React from 'react'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo y Título */}
          <div className="flex items-center space-x-4 md:space-x-12">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="Logo Unidad Educativa" 
                className="w-28 h-24 object-contain rounded-xl "
              />
            </div>
            
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Unidad Educativa Fiscal
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-blue-100">
                Ismael Perez Pazmiño
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-lg font-medium text-blue-200">
                  Plataforma de Deportes
                </p>
              </div>
            </div>
          </div>
          
          {/* Elementos decorativos deportivos */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-3">
              {/* Balón de Fútbol */}
              <div className="w-8 h-8 animate-bounce" style={{animationDelay: '0ms'}}>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/53/53283.png" 
                  alt="Balón de Fútbol" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Balón de Baloncesto */}
              <div className="w-8 h-8 animate-bounce" style={{animationDelay: '200ms'}}>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/53/53283.png" 
                  alt="Balón de Baloncesto" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Pelota de Tenis */}
              <div className="w-8 h-8 animate-bounce" style={{animationDelay: '400ms'}}>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/53/53283.png" 
                  alt="Pelota de Tenis" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-blue-200 font-medium">Sistema Educativo</p>
              <p className="text-xs text-blue-300">Gestión Deportiva</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Línea decorativa */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
    </header>
  )
}

export default Header 