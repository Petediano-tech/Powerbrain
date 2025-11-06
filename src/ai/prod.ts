
import { ai } from '.';
import './flows/fetch-messages-flow';

export const { handleRequest } = ai.getProductionHandler();
