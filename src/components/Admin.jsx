import React from 'react'

const Admin = () => {
    return (
        <div>
            {
                localStorage.getItem('user') ?
                Admin : "You are not admin"
            }
        </div>
    )
}

export default Admin
