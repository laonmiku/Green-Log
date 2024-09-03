import React from 'react';
import { IconButton } from '@mui/material';
import { RiCheckboxCircleLine, RiCheckboxCircleFill } from "react-icons/ri";

const CheckboxWithIcon = ({ checked, onChange }) => {
    return (
        <IconButton onClick={onChange}>
           {checked ? <RiCheckboxCircleFill /> : <RiCheckboxCircleLine />}
        </IconButton>
    );
};

export default CheckboxWithIcon;
