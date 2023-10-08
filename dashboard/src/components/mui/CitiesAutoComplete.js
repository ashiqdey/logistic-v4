import PropTypes from 'prop-types';
import * as React from 'react';
// @mui
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
// data
import { cities } from "../../configs/cities";

const filter = createFilterOptions();





function CitiesAutoComplete({ value, setValue }) {
    return (<>
        <Autocomplete
            disablePortal

            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        t: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        t: newValue.inputValue,
                    });
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                let { inputValue } = params;
                if (inputValue) {
                    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
                }

                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.t);


                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        t: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={cities}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.t;
            }}
            renderOption={(props, option) => <li {...props}>{option.t}</li>}
            freeSolo
            size='small'
            renderInput={(params) => (
                <TextField
                    fullWidth
                    size='small'
                    {...params}
                    label="Location"
                />
            )}
        />
    </>)
}
CitiesAutoComplete.propTypes = {
    value: PropTypes.object,
    setValue: PropTypes.func,
};

export default CitiesAutoComplete;
