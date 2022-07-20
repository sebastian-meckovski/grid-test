import { Form, SimpleItem } from 'devextreme-react/form';
import TextBox from 'devextreme-react/text-box';
import { Button } from 'devextreme-react/button';
import { Popup } from 'devextreme-react/popup';
import React from "react";

export default function NewSamuraiPopover(
    props
){
    return(
        <Popup
            title='Add New Samurai'
            width={400}
            visible={props.isNewSamurai}
            closeOnOutsideClick
            onHiding={() => 
                {
                    props.setNewSamuraiName(null)
                    props.setIsNewSamurai(false)
                }
            }
            onHidden={() => {
                props.setIsNewSamurai(null)
            }}
        >

            <TextBox
                placeholder='Name'
                onValueChange={(e) => {
                    props.setNewSamuraiName(e);
                }}
                showClearButton={true}
                value={props.newSamuraiName}
            />
            
            <Button
                text='Save'
                onClick={() => {
                    if(props.newSamuraiName){
                        props.postNewSamurai();
                        props.setNewSamuraiName(null)
                        props.setIsNewSamurai(false)
                    }
                }}
            />
        </Popup>
    )
}