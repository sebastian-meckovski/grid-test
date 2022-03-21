import React from 'react';
import 'devextreme/data/odata/store';
// import {useScreenSizeClass} from "../../../utils/media-query";

import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup
} from 'devextreme-react/data-grid';

export default function Task() {
  console.log("hello");
  // let screenSize = useScreenSizeClass();

    // const largeScreen =
    //     screenSize === "screen-large" || screenSize === "screen-medium";
    // const smallScreen =
    //     screenSize === "screen-small" || screenSize === "screen-x-small";
  return (
    <React.Fragment>
      <h2 className={'content-block'}>Tasks</h2>

      <DataGrid
        className={'dx-card wide-card'}
        dataSource={dataSource}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={3}
        columnAutoWidth={true}
        columnHidingEnabled={true}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />

        <Column dataField={'Task_ID'} width={90} hidingPriority={2} />
        <Column
          dataField={'Task_Subject'}
          width={190}
          caption={'Subject11'}
          hidingPriority={8}
        />
        <Column
          dataField={'Task_Status'}
          caption={'Status'}
          hidingPriority={6}
        />
        <Column
          // dataField={'Task_Priority'}
          cellRender={() => (
            <div style={{"height": "30px", "width": "30px","border": "1px black solid", "textAlign": "center"}}> T </div>
          )}
          caption={'Priority1'}
          hidingPriority={5}
          // visible={largeScreen}
        >
          <Lookup
            dataSource={priorities}
            valueExpr={'value'}
            displayExpr={'name'}
          />
        </Column>
        <Column
          dataField={'ResponsibleEmployee.Employee_Full_Name'}
          caption={'Assigned To'}
          allowSorting={false}
          hidingPriority={7}
        />
        <Column
          dataField={'Task_Start_Date'}
          caption={'Start Date'}
          dataType={'date'}
          hidingPriority={3}
        />
        <Column
          dataField={'Task_Due_Date'}
          caption={'Due Date'}
          dataType={'date'}
          hidingPriority={4}
        />
        <Column
          dataField={'Task_Priority'}
          caption={'Priority1'}
          name={'Priority'}
          hidingPriority={1}
        />
        <Column
          dataField={'Task_Completion'}
          caption={'Completion'}
          hidingPriority={0}
        />
      </DataGrid>
    </React.Fragment>
)}

const dataSource = {
  store: {
    type: 'odata',
    key: 'Task_ID',
    url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
  },
  expand: 'ResponsibleEmployee',
  select: [
    'Task_ID',
    'Task_Subject',
    'Task_Start_Date',
    'Task_Due_Date',
    'Task_Status',
    'Task_Priority',
    'Task_Completion',
    'ResponsibleEmployee/Employee_Full_Name'
  ]
};

const priorities = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 }
];
