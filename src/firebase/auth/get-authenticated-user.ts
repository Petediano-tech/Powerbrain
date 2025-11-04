import { getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { headers } from 'next/headers';

/**
 * Retrieves the authenticated Firebase user on the server side.
 * It verifies the ID token passed in the Authorization header.
 * 
 * @returns {Promise<DecodedIdToken | null>} A promise that resolves to the decoded user token, or null if not authenticated.
 */
export async function getAuthenticatedUser() {
    const authHeader = headers().get('Authorization');
    if (!authHeader) {
        console.warn('Authorization header missing.');
        return null;
    }
    
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
        console.warn('Bearer token missing from Authorization header.');
        return null;
    }

    try {
        const adminApp = getApp();
        const adminAuth = getAuth(adminApp);
        const decodedToken = await adminAuth.verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        return null;
    }
}
