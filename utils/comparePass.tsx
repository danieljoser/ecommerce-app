import bcrypt from 'bcryptjs';


export default async function comparePassword(userPassword: string, dbPassword: string) {
    
    const match = await bcrypt.compare(userPassword, dbPassword)

    return match

    /* bcrypt.compare(userPassword, dbPassword, (err: Error | null, result: boolean ) => {
        if (err) {
            console.error('Error comparing passwords', err);
            console.log('Error comparing passwords');
            
            return;
        }

        if (result) {
            console.log('Passwords match, user authenticated');
            
            
        } else {
            console.log('The password do not match');
            
            throw new Error('The password does not match the email, make sure you are spelling it correctly');
            
        }
    }); */


};