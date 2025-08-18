const Card = ({logo, name, registrado}) => {
    // const handleClick = () => {
    //     console.log('clic');
    // }
    return(
        <div className="flex flex-col bg-white rounded-lg p-2 w-70 h-80  max-w-sm hover:cursor-pointer">
            <div className="p-4 bg-white-200">
                <h1 className="text-xl font-bold text-gray-800">{name} </h1>
                <p className="text-green-500 font-bold ">{registrado ? 'Registrado' : ''}</p>
            </div>
            <div className="h-48 from-orange-400 via-yellow-400 to-blue-400 flex items-center justify-center">
                <img src={logo} alt="logo" className="w-32 h-32 object-contain" /> 
            </div>

            </div>
    )
}

export default Card

