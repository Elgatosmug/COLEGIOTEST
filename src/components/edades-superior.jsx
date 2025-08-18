import DataTable from "react-data-table-component";

// Componente Tabla de edades superior
function TablaEdades() {
    
    
    const columns = [
        {
            name: "Categoría",
            selector: row => row.category
        },
        {
            name: "Nivel",
            selector: row => row.nivel
        },
        {
            name: "Edad",
            selector: row => row.edad
        }
    ];

    const data = [
        {
            category: "Categoría Superior",
            nivel: "Intercolegial",
            edad: "15 a 18 años, nacidos(as) en los año 2010 - 2007"
        },
        {
            category: "Categoría Intermedia",
            nivel: "Intercolegial",
            edad: "15 y 16 años, nacidos(as) en los años 2010 - 2009"
        },
        {
            category: "Categoría Inferior",
            nivel: "Intercolegial",
            edad: "13 y 14 años, nacidos(as) en los años 2012 - 2011"
        },
        {
            category: "Categoría Infantil",
            nivel: "Interolegial",
            edad: "11 y 12 años, nacidos(as) en los años 2014 - 2013"
        }
    ]

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%" }}>
                <DataTable
                    // title={
                    //     <div style={{ textAlign: "center", width: "100%"}}>
                    //         <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                    //             FEDERACIÓN DEPORTIVA PROVINCIAL ESTUDIANTIL DEL GUAYAS
                    //         </div>
                    //         <div style={{ fontWeight: "bold", fontSize: "16px"}}>
                    //             CALENDARIO DE CAMPEONATOS INTERCOLEGIALES AÑO 2025
                    //         </div>
                    //     </div>
                    // }
                    columns={columns}
                    data={data}
                    fixedHeader
                    fixedHeaderScrollHeight="none" 
                    responsive
                    customStyles={{
                        headCells: {
                            style: {
                                justifyContent: "center",
                                textAlign: "center",
                                borderRight: "1px solid #ddd",
                                fontSize: "18px"
                            },
                        },
                        cells: {
                            style: {
                                justifyContent: "center",
                                textAlign: "center",
                                borderRight: "1px solid #ddd"
                            },
                        },
                        table: {
                            style: {
                                width: "100%",
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default TablaEdades;
