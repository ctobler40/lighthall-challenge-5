import React, { useState } from 'react'

function Playlist({items}) {
  return (
    <div>
        {/* <button onClick={addItem}>Add a Number</button> */}
        <ul>
            {items.map(item => (
                <li key={item.id}>{item.value}</li>
            ))}
        </ul>
    </div>
  )
}

export default Playlist