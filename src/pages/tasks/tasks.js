import React from "react";
import DataGrid, {Column, FilterRow, HeaderFilter, Paging} from "devextreme-react/data-grid";
import { dataSource3 } from "../tasks/testData";
import { useScreenSizeClass } from "./media-query";

export default function RemindersGrid({
    selectPatient,
    observations,
    showObservationForm,
    setBlankNewsObject
}) {
    let screenSize = useScreenSizeClass();
    const largeScreen =
    screenSize === "screen-large" || screenSize === "screen-medium";
    const smallScreen =
    screenSize === "screen-small" || screenSize === "screen-x-small";


    return (
        <div className="content-block dx-card responsive-paddings dx-card-with-toolbar gridContainer">
            <DataGrid
                className={'dx-card wide-card'}
                dataSource={dataSource3}
                showBorders={false}
                width="100%"
                // columnWidth={"10%"}
                columnAutoWidth
                // columnResizingMode={"widget"}
                columnHidingEnabled
                showColumnHeaders={!smallScreen}
                onRowClick={() => alert("clicked")}
            >
                <Paging visible pageSize={10} />
                {!smallScreen && <FilterRow visible />}
                <HeaderFilter visible />

                <Column
                    dataField={"patient.patientId"}
                    caption={"ID"}
                />
                <Column
                    dataField={"patient.fullnameReverse"}
                    caption={"Name"}
                    width={400}
                />
                <Column 
                    dataField={"patient.dateOfBirth"}
                    caption={"DOB"}
                />

                <Column
                    dataField={"currentBed.location.name"}
                    caption={"ward"}
                />
                <Column
                    dataField={"observationFrequencyInMinutes"}
                    caption={"Frequency"}
                    visible={largeScreen}
                />
            </DataGrid>
        </div>
    );
}
