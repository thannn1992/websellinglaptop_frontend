import UserModel from "../models/UserModel";


export async function takeUserFromUserName(username: string): Promise<UserModel | null> {
    
    const endpoint: string = `http://localhost:8080/user/search/findByUserName?userName=${username}`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Error in calling API taking laptop');

        }
        const userData = await response.json();

        if (userData) {
            const user = new UserModel(
                userData.userID,
                userData.firstName,
                userData.lastName,
                userData.usersName,
                userData.password,
                userData.gender,
                userData.email,
                userData.phoneNumber,
                userData.birthDay,
                userData.address,
                userData.deliveryAddress,
                userData.purchaseAddress
            );
            console.log(user.getFirstName());
            console.log(user.getEmail());
            
            return user;
        } else {
            throw new Error(`Don't exit this user!`);
        }

    } catch (error) {
        console.error("Error: ", error);
        return null;
    }

}
