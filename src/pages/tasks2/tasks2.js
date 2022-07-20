import React, { useEffect, useState } from "react";
import DataGrid, {Column, FilterRow, HeaderFilter, Paging} from "devextreme-react/data-grid";
import { Button } from 'devextreme-react/button';
import { dataSource4 } from "../tasks2/testData2";
import { useScreenSizeClass } from "./media-query";
import NewSamuraiPopover from "./newSamuraiPopover";
import axios from "axios";

export default function RemindersGrid({
    selectPatient,
    observations,
    showObservationForm,
    setBlankNewsObject
}) {
    const [isNewSamurai, setIsNewSamurai] = useState(false);
    const [newSamuraiName, setNewSamuraiName] = useState();
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

    function postNewSamurai(){
        const url = `https://localhost:5001/api/Samurais`

        const body = {
            "Name": newSamuraiName
        }

        axios.post(url, body)
            .then(getData)
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

            <Button
                text="Add New Samurai"
                onClick={() => {setIsNewSamurai(true)}}
            />
            
            
            <iframe title="sebTest" id="sdv-iframe" width="100%" height="480" src="https://www.shapediver.com/app/iframe?modelViewUrl=https%3A%2F%2Fsdeuc1.eu-central-1.shapediver.com&ticket=7105324c9b90bc6b8b9dd4565608979305bfad3ba73408af9d7051c0b8d594fe5772924434383b379e0053c325ded5537f3ca161fb9187b232b202e5c9761b56e45e13515cb0cb783995cbc2103c6299f04df9592d3b6323998b4a340591be2c90939f6fc25468-9b5076398fb25399c13439cb65c4aa42&primaryColor=%23317DD4&secondaryColor=%23393A45&surfaceColor=%23FFFFFF&backgroundColor=%23F8F8F8&showControls=1&showZoomButton=1&showFullscreenButton=1&logo=" referrerPolicy="origin" allowFullScreen>
                <p>Your browser does not support iframes.</p>
            </iframe>

            <NewSamuraiPopover
                isNewSamurai={isNewSamurai}
                setIsNewSamurai={setIsNewSamurai}
                newSamuraiName={newSamuraiName}
                setNewSamuraiName={setNewSamuraiName}
                postNewSamurai={postNewSamurai}
            />

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