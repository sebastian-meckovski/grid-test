import React, { useEffect, useState } from "react";
import DataGrid, {Column, FilterRow, HeaderFilter, Paging} from "devextreme-react/data-grid";
import { Button } from 'devextreme-react/button';
import { dataSource4 } from "../tasks2/testData2";
import { useScreenSizeClass } from "./media-query";
import axios from "axios";

export default function RemindersGrid({
    selectPatient,
    observations,
    showObservationForm,
    setBlankNewsObject
}) {
    const [samurais, setSamurais] = useState();
    let screenSize = useScreenSizeClass();
    const largeScreen =
    screenSize === "screen-large" || screenSize === "screen-medium";
    const smallScreen =
    screenSize === "screen-small" || screenSize === "screen-x-small";

    useEffect(() => 
        {getData()}
    , []);

    function getData(){
        const url = "https://localhost:5001/api/samurais";

        axios.get(url)
            .then(res => 
                {
                    const responseData = res.data;
                    setSamurais(responseData)
                });

        
    }

    function handleDeleteButton(e){
        if (e.columnIndex === 2){
            const url = `https://localhost:5001/api/Samurais/${e.key.id}`
            axios.delete(url)
                .then(getData);
        }
    }

    function renderDeleteButton(){
        return (
            <i className="fa fa-trash-o" aria-hidden="true" ></i>
        )
    }


    return (

        <div className="content-block dx-card responsive-paddings dx-card-with-toolbar gridContainer">
            <DataGrid
                className={'dx-card wide-card'}
                dataSource={samurais}
                showBorders={false}
                width="100%"
                columnAutoWidth
                columnHidingEnabled
                showColumnHeaders={!smallScreen}
                onCellClick={handleDeleteButton}
            >
                <Paging visible pageSize={10} />
                {!smallScreen && <FilterRow visible />}
                <HeaderFilter visible />

                <Column
                    dataField={"id"}
                    caption={"ID"}
                    width={"100px"}
                />
                <Column
                    dataField={"name"}
                    caption={"Name"}
                />
                <Column
                    width={"90px"}
                    cellRender={renderDeleteButton}
                    
                />
            </DataGrid>
            

        </div>
    );
}


// Old Way of writing API requests: 

// function handleClick(){
//     const req = new XMLHttpRequest();
//     const url = "https://localhost:5001/api/samurais";

//     req.open('GET', url);
//     req.send();
//     req.onreadystatechange = () => 
//     {
//         let responseText = req.responseText;
//         var data = JSON.parse(responseText);
//         setSamurais(data)
//     }
// }