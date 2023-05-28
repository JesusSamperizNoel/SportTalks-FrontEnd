import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated()

export default function SelectSport({setSportsArray}) {

    const sports = [
        { value: 'Athletics', label: 'Athletics' },
        { value: 'Cycling', label: 'Cycling' },
        { value: 'Swimming', label: 'Swimming' },
        { value: 'Football', label: 'Football' },
        { value: 'Rugby', label: 'Rugby' },
        { value: 'American-soccer', label: 'American-soccer' },
        { value: 'Tennis', label: 'Tennis' },
        { value: 'Martial-arts', label: 'Martial arts' },
        { value: 'Boxing', label: 'Boxing' },
        { value: 'Basketball', label: 'Basketball' },
        { value: 'Hockey', label: 'Hockey' },
        { value: 'Golf', label: 'Golf' },
        { value: 'Hunting', label: 'Hunting' }
    ]

    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[sports[0]]}
            isMulti
            options={sports}
            onChange={(e)=> setSportsArray(e)}
        />
    )
}