import DataTable from "react-data-table-component";

// Componente Tabla de edades inferior
function TablaEdadesInferior() {
    
    
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
            category: "Categoría Mini hasta 7mo año EB",
            nivel: "Escolar",
            edad: "11 a 12 años, nacidos(as) en 2014 - 2013"
        },
        {
            category: "Categoría Pre-Mini",
            nivel: "Escolar",
            edad: "9 a 10 años, nacidos(as) en 2016 - 2015"
        },
        {
            category: "Categoría Micro",
            nivel: "Escolar",
            edad: "7 a 8 años, nacidos(as) en 2018 - 2017"
        },
        {
            category: "Categoría Baby",
            nivel: "Escolar",
            edad: "5 y 6 años, nacidos(as) en 2020 - 2019"
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

export default TablaEdadesInferior;