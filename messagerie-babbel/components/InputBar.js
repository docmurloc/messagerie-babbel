
import React from 'react';

export default function InputBar({ value, setValue, placeholder }) {

    return (
        <>
            <input value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder} />
        </>
    );
}