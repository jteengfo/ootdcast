const UserProfile = ()=> {
    const user = {
        name: 'NAME',
        imageUrl: 'https://images.unsplash.com/photo-1533460004989-cef01064af7e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3Jhc3N8ZW58MHx8MHx8fDA%3D',
        imageSize: 60,
    }
    
    return (
        <>
            <h1 style={{position: "fixed", top: 55, right: 12, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", padding: "20px", fontSize: "15px", fontFamily: "initial"}}>{user.name}</h1>
            <img 
                className="avatar"
                src={user.imageUrl}
                alt={'Photo of ' + (user.name)}
                style={{width: user.imageSize, height: user.imageSize, borderRadius: '50%', position: "fixed", top: 12, right: 25, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px"}}
            />
        </>
    )
}

export default UserProfile