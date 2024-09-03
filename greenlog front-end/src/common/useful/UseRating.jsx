
import React, { useState } from 'react';
import { Rating as MuiRating } from '@mui/material';
import EggIcon from '@mui/icons-material/Egg';
import EggAltIcon from '@mui/icons-material/EggAlt';
import { RiSeedlingFill } from "react-icons/ri";
import { RiSeedlingLine } from "react-icons/ri";

const UseRating = ({ value: initialValue = 0, onChange }) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <MuiRating
            name="customized-color"
            size='large'
            value={value}
            onChange={handleChange}
            getLabelText={(value) => `${value} Seed${value !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<RiSeedlingFill  style={{color:"green"}} fontSize="inherit" />}
            emptyIcon={<RiSeedlingLine fontSize="inherit" />}
        />
    )
}

export default UseRating