import React, { useState } from 'react';
import './profile.scss';
import Form from 'devextreme-react/form';
import 'devextreme/dist/css/dx.light.css';
import { Button } from 'devextreme-react/button';
import { confirm } from 'devextreme/ui/dialog';  
import { Lookup } from 'devextreme-react';

export default function Profile() {
  const [notes, setNotes] = useState(
    'Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you`ve not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.'
  );
  const employee = {
    ID: 7,
    FirstName: 'Sandra',
    LastName: 'Johnson',
    Prefix: 'Mrs.',
    Position: 'Controller',
    Picture: 'images/employees/06.png',
    BirthDate: new Date('1974/11/5'),
    HireDate: new Date('2005/05/11'),
    Notes: notes,
    Address: '4600 N Virginia Rd.'
  };

  const style = {"margin-bottom": "30px"}

  const [visibility, SetVisibility] = React.useState(false)

  function handleClick(){
    // let result = confirm("Are you sure?", "Confirm changes"); 
    // result.done(function (dialogResult) {  
    //   dialogResult ? SetVisibility(!visibility) : alert("Cancelled")
    // });  

    let result = confirm("Are you sure?", "Confirm changes"); 
    result.done(function (dialogResult) {  
      dialogResult ? console.log("Confirmed") : alert("Cancelled")
    }); 
    
  }

  let myData =
  [
  {
    "nurseId": 1,
    "wardNurse": true,
    "chargeNurse": true,
    "personId": 48,
    "person": {
        "personId": 48,
        "fullnameReverse": "CHADWICK-BAILEY, Jacob (Ms)",
        "workPhone": "01522 872000",
        "mainPhone": "01522 872000",
        "mobilePhone": "07833 872000",
        "email": "info@streets-heaver.com",
        "thumbnail": null,
        "personSites": null
    }
  },
  {
    "nurseId": 2,
    "wardNurse": true,
    "chargeNurse": true,
    "personId": 50,
    "person": {
        "personId": 50,
        "fullnameReverse": "WESTON-BLACKBURN, Leon (Ms)",
        "workPhone": "01522 872000",
        "mainPhone": "01522 872000",
        "mobilePhone": "07833 872000",
        "email": "info@streets-heaver.com",
        "thumbnail": null,
        "personSites": null
    }
  },
  {
    "nurseId": 3,
    "wardNurse": true,
    "chargeNurse": true,
    "personId": 56,
    "person": {
        "personId": 56,
        "fullnameReverse": "STEWART-SULLIVAN, Shannon (Ms)",
        "workPhone": "01522 872000",
        "mainPhone": "01522 872000",
        "mobilePhone": "07833 872000",
        "email": "info@streets-heaver.com",
        "thumbnail": null,
        "personSites": null
    }
  }
]

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Profile</h2>

      <div className={'content-block dx-card responsive-paddings'}>
        <div className={'form-avatar'}>
          <img
            alt={''}
            src={`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/${
              employee.Picture
            }`}
          />
        </div>
        <span>{notes}</span>
      </div>

      <div className={'content-block dx-card responsive-paddings'}>

        <Form
          id={'form'}
          defaultFormData={employee}
          onFieldDataChanged={e => e.dataField === 'Notes' && setNotes(e.value)}
          labelLocation={'top'}
          colCountByScreen={colCountByScreen}
          visible={visibility}

        />

        
        <Lookup 
          width={"200px"}
          dataSource={myData}
          value={null}
          onValueChange={handleClick}
          style={style}
          displayExpr="person.fullnameReverse"
          valueExpr="nurseId"
          dropDownCentered={false}
          usePopover={false}
        >
        </Lookup>


        <Button text="Click me!"
                onClick={handleClick}
                icon="comment"
        /> 
      </div>
    </React.Fragment>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4
};
