
import { getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { headers } from 'next/headers';

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
    initializeApp();
}

/**
 * Retrieves the authenticated Firebase user on the server side.
 * It verifies the ID token passed in the Authorization header or as an argument.
 * 
 * @param {string} [idToken] - Optional ID token to verify. If not provided, it will check the Authorization header.
 * @returns {Promise<DecodedIdToken | null>} A promise that resolves to the decoded user token, or null if not authenticated.
 */
export async function getAuthenticatedUser(idToken?: string) {
    let token = idToken;

    if (!token) {
        const authHeader = headers().get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split('Bearer ')[1];
        }
    }
    
    if (!token) {
        console.warn('Authentication token not found.');
        return null;
    }

    try {
        const adminAuth = getAuth(getApp());
        const decodedToken = await adminAuth.verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        return null;
    }
}
