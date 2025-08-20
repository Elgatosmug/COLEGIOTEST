import DataTable from "react-data-table-component";


// Componente Tabla que recibe datos filtrados
function Tabla({ datos }) {
    const formatTextWithBold = (textData, boldWords = ["Escolar", "Colegial"]) => {
        if (!textData) return <div>Sin datos</div>;

        const textArray = Array.isArray(textData) ? textData : [textData.toString()];

        return (
            <div style={{whiteSpace: "pre-line", lineHeight: "1.4", textAlign: "center", padding: "8px"}}>
                {textArray.map((text, index) => {
                    const textString = text ? text.toString() : "";
                    const lines = textString.split("\n");

                    return (
                        <div key={index} style={{ marginBottom: index < textArray.length - 1 ? "8px" : "0" }}>
                            {lines.map((line, lineIndex) => (
                                <div key={lineIndex}>
                                    {boldWords.some((boldWord) => line.trim().includes(boldWord))
                                        ? line.split(" ").map((word, wordIndex) =>
                                            boldWords.includes(word.trim()) ? (
                                                <strong key={wordIndex}>{word} </strong>
                                            ) : (
                                                <span key={wordIndex}>{word} </span>
                                            )
                                        )
                                        : line}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderFlexibleCell = (data, type = 'default') => {
        if (typeof data === 'string') {
            return (
                <div style={{ 
                    whiteSpace: 'pre-line', 
                    lineHeight: '1.4', 
                    textAlign: 'center', 
                    padding: '8px',
                    fontSize: '12px'
                }}>
                    {data}
                </div>
            );
        }

        const isComplexStructure = Array.isArray(data) && 
                                   data.length > 0 && 
                                   typeof data[0] === 'object';

        if (isComplexStructure) {
            if (type === 'cierre') {
                return (
                    <div style={{ width: '100%' }}>
                        {data.map((item, index) => (
                            <div key={index} style={{
                                borderTop: index > 0 ? '1px solid #ccc' : 'none',
                                minHeight: '50px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                textAlign: 'center',
                                padding: '8px',
                            }}>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                    {item.categoria}
                                </div>
                                <div style={{ fontSize: '12px', whiteSpace: 'pre-line' }}>
                                    {item.fecha}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }

            if (type === 'categoria') {
                return (
                    <div style={{ width: '100%' }}>
                        {data.map((item, index) => (
                            <div key={index} style={{ 
                                borderTop: index > 0 ? '1px solid #ccc' : 'none',
                                minHeight: '50px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                textAlign: 'center',
                                padding: '8px',
                                fontSize: '11px'
                            }}>
                                <div style={{ whiteSpace: 'pre-line' }}>
                                    {Array.isArray(item.categorias) ? item.categorias.join('\n') : item.categorias}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }

            if (type === 'reunion' || type === 'fecha') {
                return (
                    <div style={{ width: '100%' }}>
                        {data.map((item, index) => (
                            <div key={index} style={{ 
                                borderTop: index > 0 ? '1px solid #ccc' : 'none',
                                minHeight: '50px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                textAlign: 'center',
                                padding: '8px',
                            }}>
                                {item[type]}
                            </div>
                        ))}
                    </div>
                );
            }
        }

        return (
            <div style={{ 
                whiteSpace: 'pre-line', 
                lineHeight: '1.4', 
                textAlign: 'center', 
                padding: '8px',
                fontSize: '12px'
            }}>
                {Array.isArray(data) ? data.join('\n') : data}
            </div>
        );
    };

    const columns = [
        {
            name: "Deporte",
            cell: (row) => formatTextWithBold(row.deporte),
            grow: 1
        },
        {
            name: "Congresillo Técnico",
            cell: (row) => renderFlexibleCell(row.congresillo),
            grow: 1
        },
        {
            name: "Cierre de inscripciones",
            cell: (row) => renderFlexibleCell(row.cierre, 'cierre'),
            grow: 1
        },
        {
            name: "Categoría",
            cell: (row) => renderFlexibleCell(row.categoria, 'categoria'),
            grow: 1
        },
        {
            name: "Reunión de Delegados",
            cell: (row) => renderFlexibleCell(row.reunion, 'reunion'),
            grow: 1
        },
        {
            name: "Fecha Campeonato",
            cell: (row) => renderFlexibleCell(row.fecha, 'fecha'),
            grow: 1
        },
    ];

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%" }}>
                <DataTable
                    title={
                        <div style={{ textAlign: "center", width: "100%"}}>
                            <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                                FEDERACIÓN DEPORTIVA PROVINCIAL ESTUDIANTIL DEL GUAYAS
                            </div>
                            <div style={{ fontWeight: "bold", fontSize: "16px"}}>
                                CALENDARIO DE CAMPEONATOS INTERCOLEGIALES AÑO 2025
                            </div>
                        </div>
                    }
                    columns={columns}
                    data={datos}
                    fixedHeader
                    fixedHeaderScrollHeight="none" 
                    responsive
                    customStyles={{
                        headCells: {
                            style: {
                                justifyContent: "center",
                                textAlign: "center",
                            },
                        },
                        cells: {
                            style: {
                                justifyContent: "center",
                                textAlign: "center",
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

export default Tabla;
