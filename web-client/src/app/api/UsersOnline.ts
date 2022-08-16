import React from "react"

export default function UsersOnline() {
    const [onlineUsers, setOnlineUsers] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (onlineUsers.length > 0) {
            for (let i = 0; i <= onlineUsers.length; i++) {
                if (onlineUsers[i] !== undefined) {
                    if(onlineUsers[i] === onlineUsers[i+1]){
                        delete onlineUsers[i];
                    }
                }
                if(onlineUsers[i] === undefined){
                    delete onlineUsers[i];
                }
            }
        }
    }, [onlineUsers])

    return {
        online: [onlineUsers, setOnlineUsers]
    }
}