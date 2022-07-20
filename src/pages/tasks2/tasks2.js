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


    // Old Way of writing: 

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

    // New Way of writing:

    function handleClick(){
        const url = "https://localhost:5001/api/samurais";

        axios.get(url)
            .then(res => 
                {
                    const responseData = res.data;
                    setSamurais(responseData)
                });

        
    }

    const axios = require('axios').default;

    return (

        <div className="content-block dx-card responsive-paddings dx-card-with-toolbar gridContainer">
            <Button
                  width={120}
                  text="Get Data"
                  type="normal"
                  stylingMode="contained"
                  onClick={handleClick}
            />
            <Button
                  text="Delete Data"
                  type="normal"
                  stylingMode="contained"
                  onClick={() => {
                    setSamurais(null)
                  }}
            />

            <DataGrid
                className={'dx-card wide-card'}
                dataSource={samurais}
                showBorders={false}
                width="100%"
                columnAutoWidth
                columnHidingEnabled
                showColumnHeaders={!smallScreen}
                onRowClick={() => alert("clicked")}
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
            </DataGrid>
            

        </div>
    );
}
