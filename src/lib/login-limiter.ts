// This is a simple in-memory store. In a distributed environment (like serverless functions),
// you would replace this with a more persistent store like Redis or Firestore.
const loginAttempts: { [email: string]: { count: number, timestamp: number } } = {};

const MAX_ATTEMPTS = 5;
const LOCKOUT_PERIOD = 15 * 60 * 1000; // 15 minutes in milliseconds

/**
 * Tracks login attempts and determines if a login should be allowed.
 * @param email The email of the user attempting to log in.
 * @param success Whether the login attempt was successful.
 * @returns `true` if the login attempt is allowed, `false` if it's blocked.
 */
export const handleLoginAttempt = (email: string, success: boolean = false): boolean => {
    const now = Date.now();
    const userAttempts = loginAttempts[email];

    if (success) {
        // On successful login, clear the attempts for that email.
        if (userAttempts) {
            delete loginAttempts[email];
        }
        return true;
    }

    if (userAttempts) {
        const timeSinceFirstAttempt = now - userAttempts.timestamp;

        if (timeSinceFirstAttempt > LOCKOUT_PERIOD) {
            // If the lockout period has passed, reset the attempts.
            loginAttempts[email] = { count: 1, timestamp: now };
            return true;
        }

        if (userAttempts.count >= MAX_ATTEMPTS) {
            // If the user has exceeded the max attempts within the lockout period, block them.
            return false;
        }

        // Increment the attempt count.
        userAttempts.count++;
    } else {
        // This is the first failed attempt for this email.
        loginAttempts[email] = { count: 1, timestamp: now };
    }
    
    return true;
};
